import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import { Section, SectionHeading } from "@/components/ui/Section";
import CTA from "@/components/site/CTA";
import PageHero from "@/components/site/PageHero";
import StatsBand from "@/components/site/StatsBand";
import Team from "@/components/site/Team";
import Testimonials from "@/components/site/Testimonials";

export const metadata: Metadata = {
  title: "About FormLLC — for U.S. Founders",
  description: "FormLLC is a team of CPAs, EAs, and attorneys who help U.S. founders launch and run their companies.",
  alternates: { canonical: "/us/about-us" },
};

const PILLARS = [
  { t: "Formation + EIN", b: "Same-day filings in fast states. Priority EIN for S-Corp eligibility." },
  { t: "Bookkeeping + payroll", b: "QuickBooks / Xero reconciliation, Gusto / Justworks payroll setup." },
  { t: "Federal + state tax", b: "Form 1120, 1065, 1120-S filed by IRS Enrolled Agents." },
];

export default function Page() {
  return (
    <SitePage region="us">
      <PageHero
        eyebrow="About"
        title={
          <>
            Helping U.S. founders move faster,{" "}
            <span className="gradient-text">with one team.</span>
          </>
        }
        description="We started FormLLC because the standard playbook for a U.S. founder — formation here, bookkeeping there, taxes somewhere else — wastes weeks every year. We bring it all under one roof, with a single team that knows your business."
        primary={{ label: "Talk to the team", href: "/us/contact-us" }}
        secondary={{ label: "See what we do", href: "/us/services" }}
      />

      <StatsBand />

      <Section tone="white">
        <SectionHeading
          eyebrow="What you get"
          title="One team, one dashboard."
          description="Three pillars cover the full lifecycle of a U.S.-based business."
        />
        <div className="mt-14 content-grid-3">
          {PILLARS.map((x) => (
            <div key={x.t} className="card p-7 md:p-8">
              <h3 className="text-lg font-bold text-ink-900">{x.t}</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">{x.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Team />
      <Testimonials />
      <CTA region="us" />
    </SitePage>
  );
}
