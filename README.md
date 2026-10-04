# portfolio

Trang portfolio tĩnh của Duang Mai, chạy ở https://duangmai.io.vn —
Next.js 16 (App Router) + Tailwind CSS 4, xuất HTML tĩnh (`output: "export"`).
Không backend, không database, không script theo dõi. Form liên hệ gửi thẳng từ
trình duyệt tới API của amber-v4 (`POST /api/public/contact`).

## Lệnh

```bash
npm install
npm run dev      # http://localhost:3001 (cổng 3000 để cho amber-v4)
npm run build    # xuất trang tĩnh ra out/
npm run lint
npm run check    # chỗ giữ chỗ trong site.json + NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_API_URL (thoát mã 1 nếu có vấn đề)
```

## Biến môi trường (đặt trên Vercel)

| Biến | Giá trị production | Dùng cho |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://duangmai.io.vn` (không `/` cuối) | metadataBase, sitemap, robots, mã QR trên name card |
| `NEXT_PUBLIC_API_URL` | `https://api.duangmai.io.vn` (không `/` cuối) | form liên hệ gửi tới `<URL>/api/public/contact` — thiếu thì bản production khoá form và mời gửi email |

Cả hai được nhúng vào HTML/JS **lúc build** — đổi giá trị phải build lại.
Mẫu tên biến: `.env.example`. Dev local có thể đặt trong `.env.local` (không commit);
khi dev, thiếu `NEXT_PUBLIC_API_URL` thì form gửi tới amber-v4 local `http://localhost:3000`.

### CORS với backend

amber-v4 chỉ trả header CORS cho **một** origin, đặt bằng biến `PORTFOLIO_ORIGIN`
bên amber-v4: production là `https://duangmai.io.vn`, nên form chỉ gửi được từ
domain đó. Khi dev, chạy amber-v4 với `PORTFOLIO_ORIGIN=http://localhost:3001`
(amber-v4 đọc biến này lúc build — đổi phải build lại).

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
