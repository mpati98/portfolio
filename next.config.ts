import type { NextConfig } from "next";

// Trang tĩnh thuần: `next build` xuất HTML/CSS/JS ra out/, không server, không API.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
