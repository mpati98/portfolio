/**
 * URL gốc của trang, đọc lúc build từ NEXT_PUBLIC_SITE_URL (không "/" cuối).
 * Dev mặc định localhost; giá trị thật (https://duangmai.io.vn) đặt trên Vercel.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001").replace(/\/+$/, "");

/** Trang /contact (chỉ có form) — đích của mã QR trên name card, và canonical của trang đó. */
export const contactPageUrl = `${siteUrl}/contact`;
