import { LinkButton } from "@/components/ui/Button";
import { SITE, type Region } from "@data/site";

const POINTS = [
  "Same-week filings in fast states",
  "EIN guidance for non-U.S. founders",
  "Bank account introductions",
  "Bookkeeping & tax filing add-ons",
];

export default function CTA({ region = "global" }: { region?: Region }) {
  const base = region === "us" ? "/us" : "";
  return (
    <section className="section bg-soft-crimson">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.32fr_1fr] lg:gap-16">
          <div>
            <span className="eyebrow">Ready to start?</span>
            <h2 className="premium-heading mt-6 max-w-[11ch]">
              Launch your U.S. company in days,{" "}
              <span className="gradient-text">not months.</span>
            </h2>
            <p className="premium-subtitle mt-6">
              From entity choice to EIN, banking, taxes, and beyond — FormLLC handles the paperwork so you can focus on building.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <LinkButton href={`${base}/pricing`} variant="primary" size="lg">
                See Pricing
              </LinkButton>
              <LinkButton href={SITE.calendly} variant="ghost" size="lg">
                Book a Free Consult
              </LinkButton>
            </div>
          </div>

          <div className="card p-8 md:p-9">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold text-ink-900">Talk to an expert</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              Free 30-minute consultation. We'll map your formation, banking, and tax setup — no sales pitch.
            </p>
            <ul className="mt-6 space-y-3.5 text-sm">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-crimson-700">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                  <span className="text-ink-700">{p}</span>
                </li>
              ))}
            </ul>
            <LinkButton href={SITE.calendly} variant="primary" size="md" className="mt-8 w-full">
              Book Free Consult
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
