// Liệt kê mọi giá trị trong src/content/site.json còn chỗ giữ chỗ: bắt đầu bằng
// "[", hoặc chứa đoạn "[...]" giữa câu (vd "... [What it can do today.]").
// Thoát mã 1 nếu còn. Chạy tay trước khi deploy: `npm run check`.
import { readFileSync } from "node:fs";

const site = JSON.parse(readFileSync(new URL("../src/content/site.json", import.meta.url), "utf8"));
const found = [];

(function walk(node, path) {
  if (typeof node === "string") {
    if (node.trimStart().startsWith("[") || /\[[^\]]+\]/.test(node)) found.push([path, node]);
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, `${path}[${i}]`));
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k);
  }
})(site, "");

if (found.length === 0) {
  console.log("Không còn chỗ giữ chỗ nào trong site.json.");
  process.exit(0);
}
console.log(`Còn ${found.length} chỗ giữ chỗ chưa điền:`);
for (const [path, value] of found) console.log(`  ${path}: ${value}`);
process.exit(1);
