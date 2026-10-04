import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import site from "@/content/site.json";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

// Cả hai là variable font trên Google Fonts: một file mỗi kiểu chữ đã gồm
// mọi độ đậm dùng ở đây (serif 400 nghiêng / 500 / 700, sans 400 / 500 / 600).
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = `${site.name} — Portfolio`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: site.headline,
  openGraph: {
    title,
    description: site.headline,
    url: "/",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070F",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
