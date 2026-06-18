import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import type { Region } from "@data/site";

const POINTS = [
  { title: "Money-back guarantee", body: "Full refund if we haven't filed yet. Partial refund if filing is in progress. State fees pass-through at cost." },
  { title: "No surprise renewals", body: "We email 30 days before any renewal — registered agent, annual report — and you decide whether to proceed." },
  { title: "Secure by default", body: "TLS 1.3 in transit. AES-256 at rest. Tax documents stored on access-controlled servers, retained 7 years per IRS rules." },
  { title: "Real humans, fast", body: "Replies in hours, not days. Your dedicated success manager is a real person who knows your business." },
];

export default function Guarantee({ region = "global" }: { region?: Region }) {
  const base = region === "us" ? "/us" : "";
  return (
    <Section tone="white">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <span className="eyebrow">Our promise</span>
          <h2 className="mt-5 text-3xl md:text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.025em] text-ink-900 text-balance">
            We charge for paperwork.{" "}
            <span className="gradient-text">We don't charge for stress.</span>
          </h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed max-w-md text-pretty">
            FormLLC is built around a simple idea: if you're trusting us with your company, we should make every dollar easy to defend.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={`${base}/contact-us`} variant="primary" size="md">
              Talk to us
            </LinkButton>
            <LinkButton href={`${base}/refund-policy`} variant="ghost" size="md">
              Refund policy
            </LinkButton>
          </div>
        </div>

        <div className="content-grid-2">
          {POINTS.map((p, i) => (
            <div key={p.title} className="card p-6 md:p-7">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-crimson-50 text-crimson-700 font-bold text-sm border border-crimson-100"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-ink-900 text-base">{p.title}</h3>
              </div>
              <p className="mt-4 text-ink-600 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
