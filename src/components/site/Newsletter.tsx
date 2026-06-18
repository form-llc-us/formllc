"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function Newsletter({
  title = "Stay sharp on U.S. tax & compliance.",
  description = "One email a month — practical, no fluff. Annual report deadlines, IRS updates, and tactics from our compliance team.",
}: {
  /** Kept for backwards compatibility. */
  tone?: "muted" | "dark";
  title?: string;
  description?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/discount-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.split("@")[0] || "Subscriber",
          email,
          source: "Newsletter",
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };

      if (!res.ok || !data.ok) {
        setError("Could not subscribe. Please try again.");
      } else {
        setDone(true);
      }
    } catch {
      setError("Network error.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="newsletter-section py-16 md:py-20">
      <div className="container-x">
        <div className="newsletter-card relative overflow-hidden p-6 md:p-8 lg:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-gold-400/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-crimson-700/15 blur-3xl"
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
            <div>
              <span className="eyebrow">Newsletter</span>

              <h2 className="serif-heading mt-5 text-3xl leading-[1.02] text-cream-50 text-balance md:text-[2.85rem]">
                {title}
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-600 md:text-base">
                {description}
              </p>

              <ul className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-white/65">
                {["1 email / month", "Unsubscribe anytime", "No spam"].map(
                  (item, i) => (
                    <li key={item} className="inline-flex items-center gap-1.5">
                      {i > 0 && (
                        <span
                          className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-block"
                          aria-hidden
                        />
                      )}

                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-crimson-600"
                        aria-hidden
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>

                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              {done ? (
                <div className="rounded-xl border border-crimson-300/30 bg-crimson-700/10 px-4 py-3 text-sm">
                  <strong className="text-ink-900">You're in.</strong>{" "}
                  <span className="text-ink-600">
                    Check your inbox to confirm.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col items-stretch gap-2 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="input min-h-12 flex-1 text-sm"
                    aria-label="Email address"
                  />

                  <Button
                    type="submit"
                    size="md"
                    variant="primary"
                    disabled={submitting}
                    className="min-h-12 px-6 text-sm"
                  >
                    {submitting ? "Subscribing…" : "Subscribe"}
                  </Button>
                </form>
              )}

              {error && <p className="mt-2 text-sm text-crimson-700">{error}</p>}

              <p className="mt-2 text-xs text-white/50">
                We respect your inbox. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
