import type { Metadata } from "next";
import Link from "next/link";
import SitePage from "@/components/site/SitePage";
import { Section, SectionHeading } from "@/components/ui/Section";
import CTA from "@/components/site/CTA";
import PageHero from "@/components/site/PageHero";
import StatsBand from "@/components/site/StatsBand";
import StateGrid from "@/components/site/StateGrid";
import Newsletter from "@/components/site/Newsletter";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tools for U.S. Founders",
  description: "Free tools for U.S. founders: state cost estimator, S-Corp savings calculator, BOI/FinCEN explainer, and more.",
  alternates: regionalAlternates("us", "/tools"),
};

const TOOLS = [
  { title: "State Cost Estimator", body: "What each state charges for filing, registered agent, and annual reports.", href: "/us/pricing#states", badge: "Free" },
  { title: "S-Corp Savings Calculator", body: "Run your numbers through an S-Corp election to see whether the SE-tax savings beat the payroll setup cost.", href: "/blogs/s-corp-savings-explained", badge: "Calculator" },
  { title: "Onboarding Wizard", body: "Build your formation, EIN, banking, and tax plan in 5 minutes.", href: "/us/onboarding", badge: "Wizard" },
  { title: "Tax Documents Intake", body: "Upload your 1099s, K-1s, prior returns, and bookkeeping in one place.", href: "/tax-intake", badge: "Service" },
  { title: "BOI / FinCEN Explainer", body: "What U.S. founders need to file under the Corporate Transparency Act.", href: "/blogs/boi-fincen-explained", badge: "Guide" },
  { title: "FormLLC vs Alternatives", body: "Compare us against Doola, Bizee, Atlas, ZenBusiness — feature-by-feature.", href: "/us/formllc-vs-alternatives", badge: "Compare" },
];

export default function Page() {
  return (
    <SitePage region="us">
      <PageHero
        eyebrow="Tools"
        title={
          <>
            Free <span className="gradient-text">founder tools.</span>
          </>
        }
        description="Calculators, quizzes, and guides we built for our customers — and made free for everyone."
      />

      <Section tone="white">
        <SectionHeading
          eyebrow="Browse"
          title="Free tools, no signup."
          description="Pick a tool and get an answer in under a minute."
        />
        <div className="mt-14 content-grid-3">
          {TOOLS.map((t) => (
            <Link key={t.title} href={t.href} className="card p-7 md:p-8 group flex flex-col h-full">
              <div className="flex items-center justify-between">
                <span className="badge">{t.badge}</span>
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cream-100 text-ink-700 group-hover:bg-crimson-50 group-hover:text-crimson-700 transition"
                >
                  →
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{t.title}</h3>
              <p className="mt-2.5 text-ink-600 leading-relaxed text-[15px] flex-1">{t.body}</p>
            </Link>
          ))}
        </div>
      </Section>

      <StatsBand />

      <Section tone="muted">
        <SectionHeading
          eyebrow="State guides"
          title="Pick a state, get a guide."
          description="Every U.S. state has its own filing rules. Our guides walk through fees, timelines, and gotchas."
        />
        <div className="mt-12">
          <StateGrid region="us" />
        </div>
      </Section>

      <Newsletter />
      <CTA region="us" />
    </SitePage>
  );
}
