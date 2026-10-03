# portfolio

Trang portfolio tĩnh của Duang Mai — Next.js 16 (App Router) + Tailwind CSS 4,
xuất HTML tĩnh (`output: "export"`). Không API, không database, không biến môi
trường, không script theo dõi.

## Lệnh

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # xuất trang tĩnh ra out/
npm run lint
npm run check    # liệt kê chỗ giữ chỗ còn trong site.json (thoát mã 1 nếu còn)
```

## Sửa nội dung

Toàn bộ chữ nằm trong `src/content/site.json`. Giá trị bắt đầu bằng `[` (hoặc
chứa đoạn `[...]`) là chỗ giữ chỗ chưa điền — chạy `npm run check` trước khi
deploy. Email / LinkedIn / GitHub chỉ thành link khi đã điền (email dùng
`mailto:`, hai mục còn lại tự thêm `https://` nếu thiếu).

## Thiết kế

Token màu, bo góc và font khai báo trong `src/app/globals.css` (khối `@theme`).
Màu nhấn của cả trang là biến CSS `--accent` — đổi một chỗ là đổi toàn trang.
Chỉ có giao diện tối.
