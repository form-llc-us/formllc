import type { CSSProperties, ReactNode } from "react";
import { LinkButton } from "@/components/ui/Button";
import TrustBar from "./TrustBar";
import type { Region } from "@data/site";
import { SITE } from "@data/site";

const QUICK_STATES = [
  { state: "Wyoming", why: "Best privacy & low fees", price: "$100" },
  { state: "Delaware", why: "Investor-ready C-Corp", price: "$110" },
  { state: "Florida", why: "No state income tax", price: "$125" },
  { state: "New Mexico", why: "Lowest annual cost", price: "$50" },
];

export default function Hero({
  region = "global",
  eyebrow = "Form an LLC or C-Corp in any U.S. state",
  title,
  subtitle,
}: {
  region?: Region;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
}) {
  const base = region === "us" ? "/us" : "";

  return (
    <section className="relative bg-soft-premium">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-4 h-[26rem] w-[26rem] rounded-full bg-navy-900/[0.06] blur-3xl" />
        <div className="absolute right-[-5rem] top-[-4rem] h-[24rem] w-[24rem] rounded-full bg-plum-600/[0.05] blur-3xl" />
      </div>

      <div className="container-x relative py-16 md:py-24 lg:py-28">
        <div className="hero-grid">
          <div className="text-center lg:text-left">
            <span className="eyebrow">{eyebrow}</span>

            <h1 className="premium-heading mx-auto mt-6 max-w-[11.5ch] lg:mx-0">
              {title ?? (
                <>
                  Launch your U.S. company{" "}
                  <span className="gradient-text">without the paperwork.</span>
                </>
              )}
            </h1>

            <p className="premium-subtitle mx-auto mt-6 max-w-[40rem] lg:mx-0">
              {subtitle ??
                "FormLLC handles your formation, EIN, registered agent, banking, and taxes — so you can focus on building, not filing."}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <LinkButton href={`${base}/pricing`} variant="primary" size="lg">
                See Pricing
              </LinkButton>

              <LinkButton href={SITE.calendly} variant="ghost" size="lg">
                Book Free Consult
              </LinkButton>
            </div>

            <div className="mt-10">
              <TrustBar />
            </div>
          </div>

          <div className="hero-card-perspective relative mx-auto w-full max-w-[500px] lg:mx-0 lg:justify-self-end">
            <div className="hero-card-flip">
              <div className="card relative overflow-hidden p-8 md:p-9 lg:p-10 noise-overlay">
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow !px-3 !py-1 text-[10px]">
                    Quick start
                  </p>

                  <span className="shrink-0 text-xs font-semibold text-ink-500">
                    Avg. turnaround 2–5 days
                  </span>
                </div>

                <h3 className="mt-6 text-[1.35rem] font-bold leading-tight text-ink-900">
                  Pick a state to incorporate.
                </h3>

                <p className="mt-2.5 text-sm leading-7 text-ink-600">
                  We&apos;ll show you the filing fee, timeline, and which plan
                  fits.
                </p>

                <ul className="mt-8 space-y-2">
                  {QUICK_STATES.map((s, index) => (
                    <li
                      key={s.state}
                      className="hero-state-pulse flex items-center justify-between gap-5 rounded-xl px-3 py-3.5"
                      style={
                        {
                          animationDelay: `${1200 + index * 260}ms`,
                        } as CSSProperties
                      }
                    >
                      <div className="min-w-0">
                        <p className="font-semibold leading-5 text-ink-900">
                          {s.state}
                        </p>

                        <p className="mt-0.5 text-xs leading-5 text-ink-500">
                          {s.why}
                        </p>
                      </div>

                      <span className="shrink-0 text-sm font-bold text-crimson-700">
                        {s.price}
                      </span>
                    </li>
                  ))}
                </ul>

                <LinkButton
                  href={`${base}/pricing`}
                  variant="primary"
                  size="md"
                  className="mt-8 w-full"
                >
                  Compare All States
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x">
        <div className="luxury-divider" />
      </div>
    </section>
  );
}
