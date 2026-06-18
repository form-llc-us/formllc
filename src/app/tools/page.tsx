import type { Metadata } from "next";
import Link from "next/link";
import SitePage from "@/components/site/SitePage";
import { Section, SectionHeading } from "@/components/ui/Section";
import CTA from "@/components/site/CTA";
import StatsBand from "@/components/site/StatsBand";
import Newsletter from "@/components/site/Newsletter";
import StateGrid from "@/components/site/StateGrid";
import PageHero from "@/components/site/PageHero";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tools — Free LLC, EIN & Tax Calculators",
  description:
    "Free tools from FormLLC: state-by-state cost estimator, business name checker, EIN eligibility check, and U.S. tax obligation guides for non-resident founders.",
  alternates: regionalAlternates("global", "/tools"),
};

const TOOLS = [
  {
    title: "State Cost Estimator",
    body: "See exactly what each state charges for filing, registered agent, and annual reports.",
    href: "/pricing#states",
    badge: "Free",
  },
  {
    title: "Best State for Your LLC",
    body: "Wyoming, Delaware, Florida, or New Mexico? A 1-minute quiz gives you the right answer.",
    href: "/blogs/best-state-to-form-an-llc",
    badge: "Quiz",
  },
  {
    title: "EIN Eligibility Check",
    body: "Find out whether you can apply online or need to fax SS-4 — and how long it'll take.",
    href: "/blogs/how-to-get-an-ein-as-a-non-us-resident",
    badge: "Guide",
  },
  {
    title: "U.S. Tax Filing Intake",
    body: "Tell us your entity, ownership, and revenue — we'll prepare and file your federal return.",
    href: "/us-tax-filing-intake",
    badge: "Service",
  },
  {
    title: "Tax Documents Intake",
    body: "Upload your 1099s, K-1s, prior returns, and bookkeeping in one place. Encrypted by default.",
    href: "/tax-intake",
    badge: "Service",
  },
  {
    title: "FormLLC vs Alternatives",
    body: "Compare us against Doola, Bizee, Atlas, ZenBusiness — feature by feature, fee by fee.",
    href: "/formllc-vs-alternatives",
    badge: "Compare",
  },
];

export default function ToolsPage() {
  return (
    <SitePage region="global">
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
        <SectionHeading eyebrow="State guides" title="Pick a state, get a guide." description="Every U.S. state has its own filing rules. Our guides walk through fees, timelines, and gotchas." />
        <div className="mt-12">
          <StateGrid region="global" />
        </div>
      </Section>

      <Newsletter />
      <CTA region="global" />
    </SitePage>
  );
}
