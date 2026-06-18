import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import CTA from "@/components/site/CTA";
import PageHero from "@/components/site/PageHero";
import StatsBand from "@/components/site/StatsBand";
import BankingPartners from "@/components/site/BankingPartners";
import Steps from "@/components/site/Steps";
import Testimonials from "@/components/site/Testimonials";
import Guarantee from "@/components/site/Guarantee";
import Newsletter from "@/components/site/Newsletter";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services for U.S. Founders",
  description: "Formation, S-Corp election, bookkeeping, payroll, sales tax, and federal/state tax filing for U.S.-based founders.",
  alternates: regionalAlternates("us", "/services"),
};

const SERVICES = [
  {
    title: "Formation + S-Corp election",
    body: "LLC, C-Corp, or S-Corp formation in any state, including state-specific quirks (CA franchise tax, NY publication, TX franchise).",
    bullets: ["LLC, C-Corp, S-Corp", "Form 2553 S-election", "Operating Agreement / Bylaws", "Initial state filings"],
  },
  {
    title: "Bookkeeping",
    body: "Monthly reconciliation against bank, Stripe, PayPal, and Square. Year-end close ready for your tax return.",
    bullets: ["QuickBooks Online or Xero", "Stripe / PayPal / Square syncs", "Monthly P&L + balance sheet", "Year-end tax-ready close"],
  },
  {
    title: "Payroll",
    body: "Gusto, Justworks, or ADP setup. We run owner payroll for S-Corp tax savings and handle 941 / 940 filings.",
    bullets: ["Gusto / Justworks / ADP setup", "S-Corp owner payroll", "941 / 940 filings", "W-2 / 1099 issuance"],
  },
  {
    title: "Sales tax",
    body: "Nexus analysis, registration in every state, monthly/quarterly filings via TaxJar/Avalara.",
    bullets: ["Economic & physical nexus analysis", "State-by-state registration", "Monthly / quarterly filings", "Audit support"],
  },
  {
    title: "Federal + state tax",
    body: "Form 1120 (C-Corp), 1120-S (S-Corp), 1065 (partnership), 1040 owner returns, and state corporate/partnership returns.",
    bullets: ["Form 1120 / 1120-S / 1065", "Schedule K-1s", "State corporate returns", "Owner Form 1040"],
  },
  {
    title: "Quarterly compliance",
    body: "Estimated tax vouchers, sales-tax filings, payroll filings, annual report tracking — all on one calendar.",
    bullets: ["Estimated tax (1040-ES / 1120-W)", "Annual report tracking", "BOI / FinCEN filings", "Compliance dashboard"],
  },
];

export default function Page() {
  return (
    <SitePage region="us">
      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything a U.S. founder needs —{" "}
            <span className="gradient-text">under one roof.</span>
          </>
        }
        description="Formation, S-Corp election, bookkeeping, payroll, sales tax, federal + state filing — handled by one senior team."
        primary={{ label: "Start onboarding", href: "/us/onboarding" }}
        secondary={{ label: "See pricing", href: "/us/pricing" }}
      />

      <Section tone="white">
        <SectionHeading
          eyebrow="What we do"
          title="Six core services. One team handling them."
          description="We work as your in-house legal + accounting team — without the in-house headcount."
        />
        <div className="mt-14 content-grid-2">
          {SERVICES.map((s) => (
            <article key={s.title} className="card p-7 md:p-8">
              <h2 className="text-xl font-bold text-ink-900">{s.title}</h2>
              <p className="mt-2.5 text-ink-600 leading-relaxed text-[15px]">{s.body}</p>
              <ul className="mt-6 space-y-2.5 text-sm text-ink-700">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-crimson-700 border border-crimson-100"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <BankingPartners />
      <StatsBand />
      <Steps />
      <Testimonials />
      <Guarantee region="us" />

      <Section tone="muted">
        <SectionHeading
          eyebrow="Get started"
          title="Build your plan."
          description="Use the onboarding wizard to map your formation, EIN, banking, and tax setup in 5 minutes."
        />
        <div className="mt-10 flex justify-center">
          <LinkButton href="/us/onboarding" variant="primary" size="lg">
            Start Onboarding
          </LinkButton>
        </div>
      </Section>

      <Newsletter />
      <CTA region="us" />
    </SitePage>
  );
}
