import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import { Section } from "@/components/ui/Section";
import TaxIntakeForm from "@/components/forms/TaxIntakeForm";
import PageHero from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "U.S. Tax Filing Intake",
  description:
    "Foreign-owned U.S. LLCs must file Form 1120 + Form 5472 each year, even with zero revenue. Submit your intake and our Enrolled Agents will prepare and file.",
  alternates: { canonical: "/us-tax-filing-intake" },
};

const FILERS: { entity: string; forms: string; due: string }[] = [
  { entity: "Foreign-owned single-member LLC", forms: "Form 1120 + 5472", due: "Apr 15 (ext. Oct 15)" },
  { entity: "Multi-member LLC", forms: "Form 1065 + K-1s", due: "Mar 15" },
  { entity: "C-Corp", forms: "Form 1120", due: "Apr 15" },
  { entity: "S-Corp", forms: "Form 1120-S", due: "Mar 15" },
];

export default function Page() {
  return (
    <SitePage region="global">
      <PageHero
        eyebrow="U.S. tax filing"
        title={
          <>
            File your U.S. federal return —{" "}
            <span className="gradient-text">without the headache.</span>
          </>
        }
        description="We file Form 1120 + Form 5472 for foreign-owned LLCs, Form 1065 for partnerships, and Form 1120-S for S-Corps. All returns reviewed and signed by IRS Enrolled Agents."
      />

      <Section tone="muted">
        <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div>
            <TaxIntakeForm variant="us-tax-filing" />
          </div>

          <aside className="card p-7 md:p-8 lg:sticky lg:top-28">
            <p className="eyebrow">Who needs to file</p>
            <ul className="mt-5 space-y-4 text-sm">
              {FILERS.map((f) => (
                <li key={f.entity} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-crimson-700 border border-crimson-100"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-bold text-ink-900">{f.entity}</p>
                    <p className="mt-0.5 text-xs text-ink-500">
                      {f.forms} · due {f.due}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-7 pt-6 border-t border-ink-100">
              <p className="eyebrow">Pricing</p>
              <p className="mt-4 text-sm text-ink-600 leading-relaxed">
                From{" "}
                <strong className="text-ink-900">$499</strong> for foreign-owned single-member LLC (1120 + 5472). Multi-member and corporate filings priced after intake review.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </SitePage>
  );
}
