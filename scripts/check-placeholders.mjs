// Kiểm tra trước khi deploy (KHÔNG gắn vào build): `npm run check`.
// 1) Mọi giá trị trong src/content/site.json còn chứa đoạn "[...]" (chỗ giữ chỗ) — trừ
//    mục có "hidden": true (bản nháp không hiện trên trang, chỉ liệt kê) và khoá "todo"
//    (ghi chú nhắc việc, không hiện trên trang, chỉ liệt kê).
// 2) NEXT_PUBLIC_SITE_URL phải được đặt và không còn là localhost.
// 3) NEXT_PUBLIC_API_URL (backend form liên hệ) phải được đặt, là https và không phải localhost.
// Thoát mã 1 nếu còn vấn đề nào. Biến môi trường lấy từ shell, và từ
// .env.local nếu có (chỉ đọc — xem script "check" trong package.json).
import { readFileSync } from "node:fs";

const site = JSON.parse(readFileSync(new URL("../src/content/site.json", import.meta.url), "utf8"));
const placeholders = [];
const hiddenDrafts = [];
const todos = [];

(function walk(node, path, hidden) {
  if (typeof node === "string") {
    if (/\[[^\]]*\]/.test(node)) (hidden ? hiddenDrafts : placeholders).push([path, node]);
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, `${path}[${i}]`, hidden));
  } else if (node && typeof node === "object") {
    const isHidden = hidden || node.hidden === true;
    for (const [k, v] of Object.entries(node)) {
      const childPath = path ? `${path}.${k}` : k;
      if (k === "todo") todos.push([childPath, v]);
      else walk(v, childPath, isHidden);
    }
  }
})(site, "", false);

let failed = false;

if (placeholders.length) {
  failed = true;
  console.log(`Còn ${placeholders.length} chỗ giữ chỗ chưa điền:`);
  for (const [path, value] of placeholders) console.log(`  ${path}: ${value}`);
} else {
  console.log("Không còn chỗ giữ chỗ nào trong phần đang hiển thị của site.json.");
}

if (hiddenDrafts.length) {
  console.log("\nHidden drafts (not shown on the site):");
  for (const [path, value] of hiddenDrafts) console.log(`  ${path}: ${value}`);
}

if (todos.length) {
  console.log("\nTODO notes:");
  for (const [path, value] of todos) console.log(`  ${path}: ${typeof value === "string" ? value : JSON.stringify(value)}`);
}

console.log("");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (!siteUrl) {
  failed = true;
  console.log("Lỗi: NEXT_PUBLIC_SITE_URL chưa đặt (giá trị thật: https://duangmai.io.vn).");
} else if (/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/i.test(siteUrl)) {
  failed = true;
  console.log(`Lỗi: NEXT_PUBLIC_SITE_URL vẫn là localhost (${siteUrl}).`);
} else {
  console.log(`NEXT_PUBLIC_SITE_URL = ${siteUrl}`);
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
if (!apiUrl) {
  failed = true;
  console.log("Lỗi: NEXT_PUBLIC_API_URL chưa đặt (giá trị thật: https://api.duangmai.io.vn).");
} else if (/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/i.test(apiUrl)) {
  failed = true;
  console.log(`Lỗi: NEXT_PUBLIC_API_URL vẫn là localhost (${apiUrl}).`);
} else if (!/^https:\/\//i.test(apiUrl)) {
  failed = true;
  console.log(`Lỗi: NEXT_PUBLIC_API_URL phải dùng https (${apiUrl}).`);
} else {
  console.log(`NEXT_PUBLIC_API_URL = ${apiUrl}`);
}

process.exit(failed ? 1 : 0);
