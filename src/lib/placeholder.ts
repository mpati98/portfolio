/** Giá trị trong site.json bắt đầu bằng "[" là chỗ giữ chỗ, chưa điền. */
export const isPlaceholder = (value: string) => value.trimStart().startsWith("[");

type ContactKind = "email" | "linkedin" | "github";

/** URL cho 1 hàng liên hệ, hoặc null nếu còn là chỗ giữ chỗ (khi đó hiện chữ thường, không tạo link hỏng). */
export function contactHref(kind: ContactKind, value: string): string | null {
  if (isPlaceholder(value)) return null;
  if (kind === "email") return `mailto:${value.trim()}`;
  return /^https?:\/\//i.test(value) ? value.trim() : `https://${value.trim()}`;
}
