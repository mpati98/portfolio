import site from "@/content/site.json";
import { contactHref } from "@/lib/placeholder";

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
  const contactRows = [
    { label: "Email", kind: "email", value: contact.email },
    { label: "LinkedIn", kind: "linkedin", value: contact.linkedin },
    { label: "GitHub", kind: "github", value: contact.github },
  ] as const;

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-ui bg-accent px-4 py-3 font-medium text-ink-950 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>

      <header className="border-b border-line-section">
        <div className={`${container} flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3`}>
          <a href="#" className="flex min-h-11 items-center font-serif-display text-xl font-bold">
            {site.name}
          </a>
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {["Projects", "About", "Skills"].map((item) => (
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
              <a
                href="#projects"
                className="inline-flex min-h-12 items-center rounded-ui bg-accent px-6 font-medium text-ink-950 transition-opacity hover:opacity-90"
              >
                See projects
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center rounded-ui border border-white/24 px-6 font-medium transition-colors hover:border-white/50"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-heading" className="border-b border-line-section py-18">
          <div className={container}>
            <p className={sectionLabel}>Projects</p>
            <h2 id="projects-heading" className={h2}>
              Selected work
            </h2>
            <div className="mt-10 flex flex-wrap gap-5">
              {site.projects.map((p) => {
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

        <section id="contact" aria-labelledby="contact-heading" className="bg-ink-900 py-18">
          <div className={`${container} grid gap-10 md:grid-cols-2 md:gap-14`}>
            <div>
              <p className={sectionLabel}>{contact.label}</p>
              <h2
                id="contact-heading"
                className="mt-3 font-serif-display text-[clamp(36px,5vw,56px)] font-bold leading-[1.1]"
              >
                {contact.heading}
              </h2>
              <p className="mt-5 max-w-[440px] text-muted">{contact.intro}</p>
            </div>
            <ul className="self-end">
              {contactRows.map((row, i) => {
                const href = contactHref(row.kind, row.value);
                return (
                  <li
                    key={row.label}
                    className={`flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-line-row py-3 ${
                      i === contactRows.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{row.label}</span>
                    {href ? (
                      <a
                        href={href}
                        className="break-all text-lg font-medium transition-colors hover:text-accent"
                        {...(row.kind === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="break-all text-lg font-medium">{row.value}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-line-section">
        <div className={`${container} py-8 text-sm text-muted`}>© 2026 {site.name}</div>
      </footer>
    </>
  );
}
