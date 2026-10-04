import site from "@/content/site.json";
import { ContactForm } from "@/components/ContactForm";
import { QrCode } from "@/components/QrCode";
import { contactHref } from "@/lib/placeholder";
import { contactPageUrl } from "@/lib/site-url";

const container = "mx-auto w-full max-w-[1040px] px-6";
const sectionLabel = "text-xs font-medium uppercase tracking-[0.14em] text-accent";
const h2 = "mt-3 font-serif-display text-[clamp(28px,3.6vw,40px)] font-bold leading-[1.15]";

// Màu nhãn + viền thẻ dự án theo nhãn.
const tagStyles: Record<string, { text: string; border: string }> = {
  "Full-stack": { text: "text-kincha-400", border: "border-kincha-400/45" },
  "Data & Marketing": { text: "text-[#A99FF4]", border: "border-yugen-500/50" },
  Hardware: { text: "text-shuiro-500", border: "border-shuiro-500/50" },
};
const defaultTag = { text: "text-accent", border: "border-line-row" };

export default function Home() {
  const { contact } = site;
  // Mục "hidden": true là bản nháp chưa có nội dung — không hiện. Hết dự án thì ẩn cả section + link.
  const projects = site.projects.filter((p) => !("hidden" in p && p.hidden === true));
  const hasProjects = projects.length > 0;
  const mailto = contactHref("email", contact.email);
  const socials = [
    { label: "LinkedIn", href: contactHref("linkedin", contact.linkedin) },
    { label: "GitHub", href: contactHref("github", contact.github) },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-ui bg-accent px-4 py-3 font-medium text-ink-950 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>

      <header id="top" className="border-b border-line-section">
        <div className={`${container} flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3`}>
          <a href="#top" className="flex min-h-11 items-center gap-2.5 font-serif-display text-xl font-bold">
            {/* Ảnh tĩnh nhỏ trong out/ — next/image cần loader riêng khi output: "export". alt rỗng vì tên đứng ngay cạnh. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-128.png" width={36} height={36} alt="" className="h-9 w-9" />
            {site.name}
          </a>
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {[...(hasProjects ? ["Projects"] : []), "About", "Skills"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="flex min-h-11 items-center text-[15px] text-muted transition-colors hover:text-fg"
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              className="flex min-h-11 items-center rounded-ui border border-accent px-4 text-[15px] font-medium text-accent transition-colors hover:bg-accent hover:text-ink-950"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section aria-labelledby="hero-heading" className="border-b border-line-section pt-20 pb-24">
          <div className={container}>
            <p className="font-serif-display text-[15px] italic tracking-[0.3em] text-accent">{site.kicker}</p>
            <h1
              id="hero-heading"
              className="mt-4 font-serif-display text-[clamp(34px,5.6vw,68px)] font-bold leading-[1.12]"
            >
              {site.headline}
            </h1>
            <p className="mt-6 max-w-[540px] text-lg text-muted">{site.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              {hasProjects && (
                <a
                  href="#projects"
                  className="inline-flex min-h-12 items-center rounded-ui bg-accent px-6 font-medium text-ink-950 transition-opacity hover:opacity-90"
                >
                  See projects
                </a>
              )}
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center rounded-ui border border-white/24 px-6 font-medium transition-colors hover:border-white/50"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>

        {hasProjects && (
          <section id="projects" aria-labelledby="projects-heading" className="border-b border-line-section py-18">
            <div className={container}>
              <p className={sectionLabel}>Projects</p>
              <h2 id="projects-heading" className={h2}>
                Selected work
              </h2>
              <div className="mt-10 flex flex-wrap gap-5">
                {projects.map((p) => {
                  const tag = tagStyles[p.tag] ?? defaultTag;
                  return (
                    <article
                      key={p.title}
                      className={`flex min-w-[280px] flex-1 basis-[280px] flex-col rounded-ui border bg-[rgb(12_17_40/0.6)] p-6 ${tag.border}`}
                    >
                      <span
                        className={`self-start rounded-ui border px-2 py-0.5 text-[11px] font-medium tracking-wide ${tag.text} ${tag.border}`}
                      >
                        {p.tag}
                      </span>
                      <h3 className="mt-4 font-serif-display text-2xl font-bold leading-tight">{p.title}</h3>
                      <p className="mt-3 text-[15.5px] text-muted">{p.summary}</p>
                      <p className="mt-auto pt-6 text-[13px] text-fg/80">{p.stack}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section id="about" aria-labelledby="about-heading" className="border-b border-line-section py-18">
          <div className={`${container} grid gap-10 md:grid-cols-2 md:gap-14`}>
            <div>
              <p className={sectionLabel}>{site.about.label}</p>
              <h2 id="about-heading" className={h2}>
                {site.about.heading}
              </h2>
              <p className="mt-6">{site.about.paragraphs[0]}</p>
              <p className="mt-4 text-muted">{site.about.paragraphs[1]}</p>
            </div>
            <dl className="self-start md:mt-10">
              {site.about.facts.map((f, i) => (
                <div
                  key={f.term}
                  className={`grid gap-1 border-t border-line-row py-4 sm:grid-cols-[160px_1fr] sm:gap-4 ${
                    i === site.about.facts.length - 1 ? "border-b" : ""
                  }`}
                >
                  <dt className="text-sm text-muted">{f.term}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="skills" aria-labelledby="skills-heading" className="py-18">
          <div className={container}>
            <p className={sectionLabel}>{site.skills.label}</p>
            <h2 id="skills-heading" className={h2}>
              {site.skills.heading}
            </h2>
            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-8">
              {site.skills.groups.map((g) => (
                <div key={g.title} className="min-w-[240px] flex-1 basis-[240px]">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{g.title}</h3>
                  <p className="mt-3">{g.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-heading" className="bg-ink-900 pt-18 pb-20">
          <div className={`${container} flex flex-wrap items-start gap-x-14 gap-y-10`}>
            <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-8">
              <div>
                <p className={sectionLabel}>{contact.label}</p>
                <h2
                  id="contact-heading"
                  className="mt-3 font-serif-display text-[clamp(36px,5vw,56px)] font-bold leading-[1.1]"
                >
                  {contact.heading}
                </h2>
                <p className="mt-5 max-w-[520px] text-muted">{contact.intro}</p>
              </div>

              <div className="flex w-full max-w-[440px] flex-col gap-3 rounded-ui border border-white/14 bg-[rgb(24_32_74/0.55)] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-serif-display text-[clamp(24px,2.6vw,28px)] font-bold leading-tight">{site.name}</p>
                    <p className="mt-1 text-sm text-muted">{contact.cardTagline}</p>
                  </div>
                  <a
                    href="#contact-form"
                    aria-label="Scan the QR code to open the contact form, or tap to jump to it"
                    title="Scan to leave a message"
                    className="shrink-0 rounded-ui bg-fg p-2"
                  >
                    {/* Quét bằng điện thoại → trang /contact; bấm trên trang chủ → cuộn xuống form. */}
                    <QrCode value={contactPageUrl} size={72} />
                  </a>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-4 border-t border-white/14 pt-1">
                  {mailto ? (
                    <a href={mailto} className="flex min-h-11 items-center text-sm font-medium break-all hover:text-accent">
                      {contact.email}
                    </a>
                  ) : (
                    <span className="flex min-h-11 items-center text-sm font-medium">{contact.email}</span>
                  )}
                  <div className="flex gap-4">
                    {socials.map((s) =>
                      s.href ? (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-11 items-center text-sm text-muted hover:text-fg"
                        >
                          {s.label}
                        </a>
                      ) : (
                        <span key={s.label} className="flex min-h-11 items-center text-sm text-muted">
                          {s.label}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            <ContactForm email={contact.email} mailto={mailto} />
          </div>
        </section>
      </main>

      <footer className="border-t border-line-section">
        <div className={`${container} py-8 text-sm text-muted`}>© 2026 {site.name}</div>
      </footer>
    </>
  );
}
