import QRCode from "qrcode";

/**
 * Mã QR dựng lúc build (server component) thành SVG nhúng thẳng vào HTML —
 * không ảnh tải thêm, không JS phía trình duyệt. Mỗi ô tối là 1 đoạn path.
 */
export function QrCode({ value, size }: { value: string; size: number }) {
  const { modules } = QRCode.create(value, { errorCorrectionLevel: "M" });
  const n = modules.size;
  let d = "";
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (modules.get(y, x)) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return (
    <svg
      viewBox={`0 0 ${n} ${n}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      data-qr-value={value}
    >
      <path d={d} fill="#05070F" />
    </svg>
  );
}
