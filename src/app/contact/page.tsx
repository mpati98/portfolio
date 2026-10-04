import type { Metadata } from "next";
import Link from "next/link";
import site from "@/content/site.json";
import { ContactForm } from "@/components/ContactForm";
import { contactHref } from "@/lib/placeholder";
import { contactPageUrl } from "@/lib/site-url";

// Trang chỉ có form — đích của mã QR trên name card, người quét dùng điện thoại.
// Không lập chỉ mục và không có trong sitemap (nội dung đã nằm ở trang chủ).

const title = `Leave a message — ${site.name}`;

export const metadata: Metadata = {
  title,
  description: site.contact.intro,
  robots: { index: false, follow: false },
  alternates: { canonical: contactPageUrl },
  // Ghi đè openGraph của layout (metadata gộp nông — nếu không sẽ giữ url "/").
  openGraph: { title, description: site.contact.intro, url: "/contact", type: "website" },
};

export default function ContactPage() {
  const { contact } = site;
  const mailto = contactHref("email", contact.email);

  return (
    <main className="mx-auto w-full max-w-[560px] px-6 pt-8 pb-12">
      <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 font-serif-display text-xl font-bold">
        {/* Ảnh tĩnh nhỏ trong out/ — next/image cần loader riêng khi output: "export". alt rỗng vì tên đứng ngay cạnh. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-128.png" width={36} height={36} alt="" className="h-9 w-9" />
        {site.name}
      </Link>

      <h1 className="mt-6 font-serif-display text-[clamp(28px,3.6vw,40px)] font-bold leading-[1.15]">
        Leave a message
      </h1>
      <p className="mt-3 text-muted">{contact.intro}</p>

      <div className="mt-6">
        <ContactForm email={contact.email} mailto={mailto} showTitle={false} />
      </div>

      <div className="mt-4 flex flex-col">
        <Link href="/" className="flex min-h-11 items-center self-start text-[15px] text-muted hover:text-fg">
          ← Back to portfolio
        </Link>
        <p className="flex min-h-11 flex-wrap items-center gap-x-1.5 text-sm text-muted">
          Prefer email?{" "}
          {mailto ? (
            <a
              href={mailto}
              className="inline-flex min-h-11 items-center font-medium break-all text-accent underline underline-offset-2"
            >
              {contact.email}
            </a>
          ) : (
            <span className="font-medium">{contact.email}</span>
          )}
        </p>
      </div>
    </main>
  );
}
