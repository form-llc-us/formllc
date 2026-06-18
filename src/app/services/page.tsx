import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import CTA from "@/components/site/CTA";
import StatsBand from "@/components/site/StatsBand";
import BankingPartners from "@/components/site/BankingPartners";
import Steps from "@/components/site/Steps";
import Testimonials from "@/components/site/Testimonials";
import Guarantee from "@/components/site/Guarantee";
import Newsletter from "@/components/site/Newsletter";
import FAQ from "@/components/site/FAQ";
import PageHero from "@/components/site/PageHero";
import { regionalAlternates } from "@/lib/seo";

const SERVICES_FAQ = [
  { q: "Do you replace my CPA or attorney?", a: "We replace day-to-day filing and compliance work. For complex M&A, IRS audit defense, or litigation, we recommend a licensed attorney or CPA — and we'll refer one." },
  { q: "How long does each service take?", a: "Formation: 2–5 business days in fast states, 1–3 weeks in slower ones. EIN: same-day for U.S. founders, 4–8 weeks for non-residents (or 1–3 days with Priority). Annual reports: filed within 24 hours of intake." },
  { q: "Can I use my own bank?", a: "Yes. Banking introductions are optional. If you already have a U.S. bank account, we just file paperwork and skip those steps." },
  { q: "Do you handle BOI / FinCEN filings?", a: "Yes — included in every plan starting 2024. We file your initial Beneficial Ownership Information report and any updates as your company changes." },
  { q: "Can you migrate my company from another provider?", a: "Yes. We handle the full transfer: registered agent change, document retrieval, filing history reconciliation. Most migrations complete within 5 business days." },
];

export const metadata: Metadata = {
  title: "Services — Formation, EIN, Banking, Tax & Compliance",
  description:
    "Everything FormLLC offers: U.S. LLC and C-Corp formation, EIN/ITIN, registered agent, banking introductions, annual reports, bookkeeping, and U.S. tax filing.",
  alternates: regionalAlternates("global", "/services"),
};

const SERVICES = [
  {
    title: "Company formation",
    body: "Form an LLC, C-Corp, or convert to S-Corp. We handle name search, articles, registered agent (1 year included), and Operating Agreement.",
    bullets: ["Articles of Organization / Incorporation", "Registered Agent — all 50 states", "Operating Agreement / Bylaws", "Express filing where state allows"],
  },
  {
    title: "EIN & ITIN",
    body: "We file SS-4 the same day you sign up. For founders without an SSN we route via fax + IRS phone for fastest possible turnaround.",
    bullets: ["Same-day SS-4 filing", "Priority routing for non-US founders", "ITIN guidance via Form W-7", "Standard or Priority speed"],
  },
  {
    title: "Banking introductions",
    body: "Skip cold applications. We introduce you to Mercury, Relay, Wise, Stripe, PayPal, and Payoneer with a real human contact.",
    bullets: ["Mercury / Relay business banking", "Stripe / PayPal merchant accounts", "Wise / Payoneer global payouts", "Bookkeeping integrations"],
  },
  {
    title: "Annual reports & state compliance",
    body: "We track every state's annual report, biennial report, and franchise tax — and file them on your behalf.",
    bullets: ["Annual / biennial reports", "Franchise tax filings", "BOI / FinCEN reports", "Compliance reminders"],
  },
  {
    title: "U.S. tax filing",
    body: "Federal returns prepared by IRS Enrolled Agents. We handle Form 1120 + 5472 for foreign-owned LLCs, 1065 for partnerships, 1120-S for S-Corps.",
    bullets: ["Form 1120 + 5472 (foreign-owned LLC)", "Form 1065 (partnerships)", "Form 1120-S (S-Corp)", "State tax filings"],
  },
  {
    title: "Bookkeeping",
    body: "Monthly bookkeeping reconciled to your bank and Stripe feeds. Year-end closing books ready for your CPA or our tax team.",
    bullets: ["Monthly reconciliation", "P&L + balance sheet", "Stripe / PayPal / Mercury syncs", "Year-end tax-ready close"],
  },
];

export default function ServicesPage() {
  return (
    <SitePage region="global">
      <PageHero
        eyebrow="Services"
        title={
          <>
            One team for your entire{" "}
            <span className="gradient-text">U.S. company lifecycle.</span>
          </>
        }
        description="From the moment you have an idea to your fifth tax return — we cover the legal, banking, and compliance work so you can focus on your customers."
        primary={{ label: "See Pricing", href: "/pricing" }}
        secondary={{ label: "Talk to us", href: "/contact-us" }}
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
      <Guarantee region="global" />

      <Section tone="muted">
        <FAQ items={SERVICES_FAQ} title="Frequently asked about our services" />
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Pick a plan"
          title="Simple, all-inclusive pricing."
          description="Three plans that cover the full lifecycle. State filing fees billed at cost."
        />
        <div className="mt-10 flex justify-center">
          <LinkButton href="/pricing" variant="primary" size="lg">
            View Pricing
          </LinkButton>
        </div>
      </Section>

      <Newsletter />
      <CTA region="global" />
    </SitePage>
  );
}
