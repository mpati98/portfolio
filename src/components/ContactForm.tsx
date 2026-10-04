"use client";

import { useRef, useState, type FormEvent } from "react";

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
// Bản production build mà không có key: form không gửi được → khoá hẳn.
const UNAVAILABLE = !ACCESS_KEY && process.env.NODE_ENV === "production";

type Status = "idle" | "sending" | "sent" | "error";

const label = "text-xs font-medium uppercase tracking-[0.14em] text-muted";
const field =
  "mt-2 block w-full rounded-ui border border-white/20 bg-ink-950 px-3.5 py-3 text-base text-fg placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ContactForm({ email, mailto }: { email: string; mailto: string | null }) {
  const [status, setStatus] = useState<Status>("idle");
  const sending = useRef(false); // chống bấm đúp trước khi state kịp render lại

  const emailLink = mailto ? (
    <a href={mailto} className="font-medium text-accent underline underline-offset-2">
      {email}
    </a>
  ) : (
    <span className="font-medium">{email}</span>
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || UNAVAILABLE) return;
    sending.current = true;
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "New message from portfolio",
          from_name: "Portfolio contact form",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          botcheck: data.get("botcheck") === "on",
        }),
        signal: AbortSignal.timeout(15000),
      });
      const json = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || !json?.success) throw new Error(`web3forms ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      // Không ghi log nội dung tin nhắn.
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  return (
    <form
      id="contact-form"
      onSubmit={onSubmit}
      aria-labelledby="contact-form-heading"
      className="@container min-w-0 flex-[1_1_400px] scroll-mt-6 rounded-ui border border-white/14 p-7"
    >
      <h3 id="contact-form-heading" className="font-serif-display text-[22px] font-bold">
        Leave a message
      </h3>

      {/* Form đủ rộng (desktop) thì Name/Email cạnh nhau — form thấp lại, cân với cột trái. */}
      <div className="mt-5 grid gap-4 @[26rem]:grid-cols-2">
        <label className="block">
          <span className={label}>Name</span>
          <input name="name" type="text" required autoComplete="name" placeholder="Your name" className={`${field} min-h-12`} />
        </label>
        <label className="block">
          <span className={label}>Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={`${field} min-h-12`}
          />
        </label>
        <label className="block @[26rem]:col-span-2">
          <span className={label}>Message</span>
          <textarea
            name="message"
            required
            placeholder="What would you like to talk about?"
            className={`${field} min-h-32 resize-y`}
          />
        </label>
        {/* Bẫy bot của Web3Forms: người dùng và trình đọc màn hình không thấy, phải để trống. */}
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
        <button
          type="submit"
          disabled={status === "sending" || UNAVAILABLE}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-ui bg-accent px-6 font-medium text-ink-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 @[26rem]:w-auto"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-muted">I&apos;ll only use your email to reply.</p>
      </div>

      <p aria-live="polite" className="mt-3 min-h-6 text-sm">
        {UNAVAILABLE ? (
          <span className="text-muted">
            The form is not available right now. Please email me directly: {emailLink}
          </span>
        ) : status === "sent" ? (
          <span className="text-kincha-200">Thanks, your message was sent. I&apos;ll reply to the email you gave.</span>
        ) : status === "error" ? (
          <span className="text-shuiro-500">
            Something went wrong. Please try again, or email me directly: {emailLink}
          </span>
        ) : null}
      </p>

      <noscript>
        <p className="mt-3 text-sm text-muted">Please email me directly: {emailLink}</p>
      </noscript>
    </form>
  );
}
