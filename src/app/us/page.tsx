import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import Hero from "@/components/site/Hero";
import Features from "@/components/site/Features";
import Steps from "@/components/site/Steps";
import { Section, SectionHeading } from "@/components/ui/Section";
import StateGrid from "@/components/site/StateGrid";
import { PLANS } from "@data/pricing";
import PriceCard from "@/components/site/PriceCard";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/site/FAQ";
import CTA from "@/components/site/CTA";
import PressLogos from "@/components/site/PressLogos";
import StatsBand from "@/components/site/StatsBand";
import BankingPartners from "@/components/site/BankingPartners";
import PopularStates from "@/components/site/PopularStates";
import UseCases from "@/components/site/UseCases";
import Comparison from "@/components/site/Comparison";
import Guarantee from "@/components/site/Guarantee";
import Newsletter from "@/components/site/Newsletter";
import Team from "@/components/site/Team";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FormLLC for U.S. Founders",
  description:
    "U.S.-based founders: form your LLC, S-Corp, or C-Corp in any state. Bookkeeping, payroll, sales-tax registration, and federal/state tax filing — all in one place.",
  alternates: regionalAlternates("us", "/"),
};

const FAQS = [
  { q: "Do you serve U.S. residents?", a: "Yes. The /us section is built for U.S.-based founders who want a single team for formation, bookkeeping, payroll, and federal + state tax filing." },
  { q: "Should I form an LLC or an S-Corp?", a: "Most U.S. founders start as a single-member LLC and elect S-Corp tax status once revenue exceeds ~$60k/year to save on self-employment tax. We model both scenarios in your onboarding." },
  { q: "Do you handle sales tax?", a: "Yes — we register and file in every state where you have nexus, including economic-nexus thresholds for online sellers." },
  { q: "Can you file my prior-year return?", a: "Yes. We routinely catch up 2–5 years of late returns. Use our Tax Intake to upload prior books and we'll quote within 24 hours." },
];

export default function UsHomePage() {
  return (
    <SitePage region="us">
      <Hero
        region="us"
        eyebrow="Built for U.S.-based founders"
        title={
          <>
            Form. File. <span className="gradient-text">Grow.</span>
          </>
        }
        subtitle="One team for U.S. founders: LLC or S-Corp formation, bookkeeping, payroll, and state + federal tax filing — without juggling four different vendors."
      />
      <PressLogos tone="muted" />

      {/* §4: "Why FormLLC?" — U.S. positioning */}
      <Features
        id="why-formllc"
        eyebrow="Why FormLLC"
        title="Why FormLLC?"
        description="One U.S. team handling formation, EIN, BOI/FinCEN, bookkeeping, payroll, and federal + state tax filing — for LLC, C-Corp, and S-Corp."
      />

      {/* §4: "Your One-Stop Business Solution" */}
      <UseCases
        id="one-stop-solution"
        eyebrow="One platform"
        title="Your One-Stop Business Solution"
        description="Three founder paths, one U.S.-based team handling formation, EIN, banking, bookkeeping, payroll, and ongoing compliance."
      />

      {/* §4: "Start, Run and Grow your Business in the United States" */}
      <Steps
        id="start-run-grow"
        eyebrow="Start. Run. Grow."
        title="Start, Run and Grow your Business in the United States"
        description="From entity choice and EIN to BOI filing, payroll, and federal + state tax — handled end-to-end."
      />

      <BankingPartners />
      <StatsBand />
      <PopularStates region="us" />

      <Section tone="white" id="pricing">
        <SectionHeading
          eyebrow="Pricing"
          title="Plans for every stage."
          description="From day-one formation to full-service registration-to-revenue."
        />
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {PLANS.map((p) => (<PriceCard key={p.key} plan={p} />))}
        </div>
      </Section>

      <Section tone="muted" id="states">
        <SectionHeading eyebrow="All 50 states" title="Form in any state." description="Including DC. State-by-state guides, fees, and timelines." />
        <div className="mt-12">
          <StateGrid region="us" />
        </div>
      </Section>

      {/* §4: "Hear From Our Clients" */}
      <Testimonials
        id="hear-from-clients"
        eyebrow="What clients say"
        title="Hear From Our Clients"
        description="U.S. founders trust FormLLC with formation, bookkeeping, payroll, and ongoing federal + state tax filing."
      />

      <Comparison region="us" />
      <Guarantee region="us" />
      <Team />

      {/* §4: "Frequently Asked Questions" */}
      <Section tone="muted" id="faq">
        <FAQ items={FAQS} title="Frequently Asked Questions" />
      </Section>

      <Newsletter />

      {/* §4: "Start Your Business in the United States With FormLLC" */}
      <section id="start-with-formllc" aria-labelledby="us-final-cta-heading">
        <CTA region="us" />
      </section>
    </SitePage>
  );
}
