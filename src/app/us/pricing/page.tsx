import type { Metadata } from "next";
import Link from "next/link";
import SitePage from "@/components/site/SitePage";
import { Section, SectionHeading } from "@/components/ui/Section";
import PriceCard from "@/components/site/PriceCard";
import { getAddons, getPlans } from "@data/pricing";
import FAQ from "@/components/site/FAQ";
import CTA from "@/components/site/CTA";
import PageHero from "@/components/site/PageHero";
import PricingCompareTable from "@/components/site/PricingCompareTable";
import Guarantee from "@/components/site/Guarantee";
import Testimonials from "@/components/site/Testimonials";
import Newsletter from "@/components/site/Newsletter";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing — LLC & Corporation Formation for U.S. Residents",
  description:
    "Simple, transparent pricing for U.S. residents to form an LLC, C-Corp, or S-Corp. Includes EIN filing support, BOI guidance, Registered Agent, annual compliance, bookkeeping, and CPA tax services.",
  alternates: regionalAlternates("us", "/pricing"),
};

const PRICING_FAQ = [
  {
    q: "Why does the price change by state?",
    a: "Each state charges a different filing fee. The package price includes the base service fee plus the selected state filing fee.",
  },
  {
    q: "Is EIN included for U.S. residents?",
    a: "Yes. EIN filing support is included. For U.S. residents, EIN support is generally based on SSN/ITIN availability and IRS processing rules.",
  },
  {
    q: "Is bookkeeping included?",
    a: "Bookkeeping features are included in Standard and Registration-To-Revenue as listed in the plan comparison.",
  },
  {
    q: "Are tax filings included?",
    a: "Federal tax filing support is included in Registration-To-Revenue. It is also available separately as an add-on.",
  },
];

export default function Page() {
  const plans = getPlans("us");
  const addons = getAddons("us");

  return (
    <SitePage region="us">
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Start your LLC, C-Corp, or S-Corp{" "}
            <span className="gradient-text">with confidence.</span>
          </>
        }
        description="Choose the right business structure with complete pricing clarity. We handle LLC, C-Corp, and S-Corp formation along with EIN filing support, BOI/FinCEN guidance, Registered Agent service, bookkeeping, and compliance support for U.S. residents."
        primary={{ label: "Compare plans", href: "#plans" }}
        secondary={{ label: "Talk to sales", href: "/us/contact-us" }}
      />

      <Section tone="white" id="plans">
        <SectionHeading
          eyebrow="Plans"
          title="Transparent U.S. resident pricing."
          description="Select your state to see the estimated total package price including the state filing fee."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <PriceCard key={plan.key} plan={plan} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-500">
          State filing fees are included in the displayed estimate after you select your state.
        </p>
      </Section>

      <PricingCompareTable region="us" />

      <Section tone="muted">
        <SectionHeading
          eyebrow="Separate add-ons"
          title="Popular separate add-ons."
          description="Add only what you need — annual reports, federal tax filing, dissolution, reinstatement, sales tax permits, and registered agent renewal."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {addons.map((addon) => (
            <Link
              key={addon.key}
              href={addon.href}
              className="group card flex min-h-[230px] flex-col p-7 transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="badge">{addon.chip}</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-ink-900 shadow-soft transition group-hover:-translate-y-0.5">
                  +
                </span>
              </div>

              <h3 className="mt-6 text-lg font-extrabold text-ink-900">
                {addon.label}
              </h3>

              <p className="mt-2 text-xl font-extrabold tracking-tight text-crimson-700">
                {addon.price}
              </p>

              <p className="mt-3 text-sm leading-6 text-ink-600">
                {addon.description}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Guarantee region="us" />
      <Testimonials />

      <Section tone="muted">
        <FAQ items={PRICING_FAQ} title="Pricing questions" />
      </Section>

      <Newsletter />
      <CTA region="us" />
    </SitePage>
  );
}