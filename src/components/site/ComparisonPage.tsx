import SitePage from "./SitePage";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import CTA from "./CTA";
import StatsBand from "./StatsBand";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import Comparison from "./Comparison";
import Guarantee from "./Guarantee";
import type { Region } from "@data/site";

export type ComparisonRow = {
  feature: string;
  formllc: string | boolean;
  competitor: string | boolean;
  note?: string;
};

export type ComparisonProps = {
  region?: Region;
  competitorName: string;
  competitorTagline: string;
  intro: string;
  rows: ComparisonRow[];
  verdict: string;
};

export default function ComparisonPage({
  region = "global",
  competitorName,
  competitorTagline,
  intro,
  rows,
  verdict,
}: ComparisonProps) {
  const base = region === "us" ? "/us" : "";

  const wins = rows.reduce(
    (acc, r) => {
      const f = r.formllc;
      const c = r.competitor;
      if (f === true && c !== true) acc.formllc++;
      else if (c === true && f !== true) acc.competitor++;
      else acc.tie++;
      return acc;
    },
    { formllc: 0, competitor: 0, tie: 0 }
  );

  const PROS = [
    "EIN included in the base plan — no upsell.",
    "Banking introductions to Mercury, Stripe, PayPal, Wise, and Payoneer.",
    "Federal tax filing in-house, signed by IRS Enrolled Agents.",
    "Annual report tracking + filing on autopilot.",
    "Replies in hours, not days. Real human, real account manager.",
    "Money-back guarantee before filing. No auto-renewals, ever.",
  ];

  return (
    <SitePage region={region}>
      <section className="relative bg-soft-premium">
        <div className="container-x py-14 md:py-20 lg:py-[5.75rem]">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">Comparison</span>
              <h1 className="premium-heading mt-5 max-w-2xl">
                FormLLC vs <span className="gradient-text">{competitorName}</span>
              </h1>
              <p className="mt-4 text-sm font-semibold text-ink-500">{competitorTagline}</p>
              <p className="premium-subtitle mt-5">{intro}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <LinkButton href={`${base}/pricing`} variant="primary" size="lg">
                  See FormLLC pricing
                </LinkButton>
                <LinkButton href={`${base}/contact-us`} variant="ghost" size="lg">
                  Talk to us
                </LinkButton>
              </div>
            </div>

            <div className="card p-7 md:p-8 lg:p-9">
              <p className="eyebrow">At a glance</p>
              <h3 className="mt-5 text-xl font-bold text-ink-900">Feature wins</h3>
              <p className="mt-2 text-sm text-ink-600">
                Across {rows.length} compared features.
              </p>
              <div className="mt-6 space-y-4">
                <Bar label="FormLLC" value={wins.formllc} total={rows.length} accent="crimson" />
                <Bar label={competitorName} value={wins.competitor} total={rows.length} accent="ink" />
                <Bar label="Tied" value={wins.tie} total={rows.length} accent="muted" />
              </div>
            </div>
          </div>
        </div>
        <div className="container-x">
          <div className="luxury-divider" />
        </div>
      </section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Side by side"
          title={`Feature comparison: FormLLC vs ${competitorName}`}
          description="Every row is sourced from each provider's public pricing and product pages. We update this table quarterly."
        />
        <div className="mt-10 overflow-x-auto rounded-3xl border border-ink-200/50 bg-white shadow-card md:mt-12">
          <table className="w-full text-sm min-w-[620px]">
            <thead>
              <tr className="border-b border-ink-100">
                <th className="bg-ink-50 px-5 py-4 text-left font-bold text-ink-900 md:px-6 md:py-5">Feature</th>
                <th className="bg-crimson-50 px-5 py-4 text-left font-bold text-crimson-700 md:px-6 md:py-5">FormLLC</th>
                <th className="bg-ink-50 px-5 py-4 text-left font-bold text-ink-900 md:px-6 md:py-5">{competitorName}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {rows.map((r) => (
                <tr key={r.feature} className="align-top">
                  <td className="px-5 py-4 font-medium text-ink-700 md:px-6">
                    {r.feature}
                    {r.note && (
                      <span className="block text-xs text-ink-500 font-normal mt-1">{r.note}</span>
                    )}
                  </td>
                  <td className="bg-crimson-700/10 px-5 py-4 md:px-6">
                    <Cell value={r.formllc} positive />
                  </td>
                  <td className="px-5 py-4 md:px-6">
                    <Cell value={r.competitor} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-7">
          <div className="card p-7 md:p-8 lg:p-9">
            <p className="eyebrow">Why pick FormLLC</p>
            <h3 className="mt-5 text-2xl font-bold text-ink-900">
              Six things you get with us.
            </h3>
            <ul className="mt-6 space-y-3.5 text-sm">
              {PROS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink-700">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-crimson-700 border border-crimson-100"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <LinkButton href={`${base}/pricing`} variant="primary" size="md">
                See pricing
              </LinkButton>
            </div>
          </div>

          <div className="card p-7 md:p-8 lg:p-9">
            <p className="eyebrow">Our take</p>
            <h3 className="mt-5 text-2xl font-bold text-ink-900">
              When {competitorName} might still be the right call.
            </h3>
            <p className="mt-4 text-ink-700 leading-relaxed">{verdict}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton href={`${base}/contact-us`} variant="ghost" size="md">
                Talk to us
              </LinkButton>
              <LinkButton href={`${base}/formllc-vs-alternatives`} variant="outline" size="md">
                All comparisons
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>

      <StatsBand />
      <Testimonials />
      <Guarantee region={region} />
      <Comparison region={region} />
      <Newsletter />
      <CTA region={region} />
    </SitePage>
  );
}

function Cell({ value, positive = false }: { value: string | boolean; positive?: boolean }) {
  if (value === true) {
    return (
      <span
        className={`inline-flex items-center gap-2 ${
          positive ? "font-bold text-crimson-700" : "text-ink-500"
        }`}
      >
        <span
          aria-hidden
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${
            positive ? "bg-crimson-600 text-white" : "bg-ink-400 text-white"
          }`}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        Yes
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-2 text-ink-400">
        <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-ink-200 bg-ink-50 text-ink-400">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
          </svg>
        </span>
        No
      </span>
    );
  }
  return (
    <span className={positive ? "font-bold text-crimson-700" : "font-semibold text-ink-500"}>
      {value}
    </span>
  );
}

function Bar({
  label,
  value,
  total,
  accent,
}: {
  label: string;
  value: number;
  total: number;
  accent: "crimson" | "ink" | "muted";
}) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  const fill =
    accent === "crimson"
      ? "bg-gradient-to-r from-crimson-600 to-crimson-700"
      : accent === "ink"
      ? "bg-ink-700"
      : "bg-ink-300";
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-bold text-ink-900">{label}</span>
        <span className="text-ink-500 font-semibold">
          {value} / {total}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink-200">
        <div className={`h-full rounded-full ${fill}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
