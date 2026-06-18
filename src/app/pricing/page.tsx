import type { Metadata } from "next";
import Link from "next/link";
import SitePage from "@/components/site/SitePage";
import { Section, SectionHeading } from "@/components/ui/Section";
import PriceCard from "@/components/site/PriceCard";
import { getAddons, getPlans } from "@data/pricing";
import FAQ from "@/components/site/FAQ";
import CTA from "@/components/site/CTA";
import PricingCompareTable from "@/components/site/PricingCompareTable";
import Guarantee from "@/components/site/Guarantee";
import Comparison from "@/components/site/Comparison";
import Testimonials from "@/components/site/Testimonials";
import Newsletter from "@/components/site/Newsletter";
import PageHero from "@/components/site/PageHero";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing — U.S. Company Formation for Non-Residents",
  description:
    "Simple and transparent pricing for forming a U.S. LLC. Includes EIN, BOI filing, Registered Agent, U.S. address, annual filing, tax filing, and optional add-ons.",
  alternates: regionalAlternates("global", "/pricing"),
};

const PRICING_FAQ = [
  {
    q: "Are the packages all-inclusive?",
    a: "Starter is all-inclusive for Wyoming. Standard and Registration-To-Revenue include the listed services in the plan. Some state-specific or extra services may be quoted separately if requested.",
  },
  {
    q: "Is EIN included?",
    a: "Yes. EIN support is included in all main packages. For non-U.S. founders, no SSN is required.",
  },
  {
    q: "Is tax filing included?",
    a: "Tax filing is included in the Registration-To-Revenue package. It is also available separately as an add-on.",
  },
  {
    q: "Can I buy add-ons separately?",
    a: "Yes. Add-ons like ITIN application, annual report filing, IRS tax filing, sales tax permit, registered agent renewal, dissolution, and reinstatement can be purchased separately.",
  },
];

export default function PricingPage() {
  const plans = getPlans("global");
  const addons = getAddons("global");

  return (
    <SitePage region="global">
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Simple, transparent{" "}
            <span className="gradient-text">pricing.</span>
          </>
        }
        description="LLC/C-Corp formation, EIN, BOI/FinCEN, Registered Agent, U.S. address, annual filing, and tax filing support — built for non-U.S. founders. Flat pricing, no hidden fees."
        primary={{ label: "Compare plans", href: "#plans" }}
        secondary={{ label: "Talk to sales", href: "/contact-us" }}
      />

      <Section tone="white" id="plans">
        <SectionHeading
          eyebrow="Plans"
          title="Choose your formation package."
          description="Transparent packages for non-U.S. founders who want to start and maintain a U.S. company."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <PriceCard key={plan.key} plan={plan} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-500">
          Starter is positioned for Wyoming LLC formation. Additional requirements may vary by state and service scope.
        </p>
      </Section>

      <PricingCompareTable region="global" />

      <Section tone="muted">
        <SectionHeading
          eyebrow="Separate add-ons"
          title="Popular separate add-ons."
          description="Add only what you need — ITIN, tax filing, annual reports, sales tax permit, registered agent renewal, dissolution, and reinstatement."
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

      <Guarantee region="global" />
      <Testimonials />
      <Comparison region="global" />

      <Section tone="muted">
        <FAQ items={PRICING_FAQ} title="Pricing questions" />
      </Section>

      <Newsletter />
      <CTA region="global" />
    </SitePage>
  );
}