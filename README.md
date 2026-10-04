# portfolio

Trang portfolio tĩnh của Duang Mai, chạy ở https://duangmai.io.vn —
Next.js 16 (App Router) + Tailwind CSS 4, xuất HTML tĩnh (`output: "export"`).
Không backend, không database, không script theo dõi. Form liên hệ gửi thẳng từ
trình duyệt tới Web3Forms.

## Lệnh

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # xuất trang tĩnh ra out/
npm run lint
npm run check    # chỗ giữ chỗ còn trong site.json + NEXT_PUBLIC_SITE_URL (thoát mã 1 nếu có vấn đề)
```

## Biến môi trường (đặt trên Vercel)

| Biến | Giá trị production | Dùng cho |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://duangmai.io.vn` (không `/` cuối) | metadataBase, sitemap, robots, mã QR trên name card |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | access key Web3Forms | form liên hệ — thiếu thì form tự khoá và mời gửi email |

Cả hai được nhúng vào HTML/JS **lúc build** — đổi giá trị phải build lại.
Mẫu tên biến: `.env.example`. Dev local có thể đặt trong `.env.local` (không commit).

## Sửa nội dung

Toàn bộ chữ nằm trong `src/content/site.json`. Giá trị chứa đoạn `[...]` là chỗ
giữ chỗ chưa điền — chạy `npm run check` trước khi deploy. Email / LinkedIn /
GitHub chỉ thành link khi đã điền (email dùng `mailto:`, hai mục còn lại tự thêm
`https://` nếu thiếu và mở tab mới).

## Thiết kế

Token màu, bo góc và font khai báo trong `src/app/globals.css` (khối `@theme`).
Màu nhấn của cả trang là biến CSS `--accent` — đổi một chỗ là đổi toàn trang.
Chỉ có giao diện tối. Logo: `public/logo-128.png`, `src/app/icon.png`,
`src/app/apple-icon.png`.
