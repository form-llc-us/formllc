import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import { Section, SectionHeading } from "@/components/ui/Section";
import CTA from "@/components/site/CTA";
import StatsBand from "@/components/site/StatsBand";
import Team from "@/components/site/Team";
import PressLogos from "@/components/site/PressLogos";
import Testimonials from "@/components/site/Testimonials";
import Newsletter from "@/components/site/Newsletter";
import PageHero from "@/components/site/PageHero";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About FormLLC",
  description:
    "FormLLC helps non-U.S. founders start, manage, and stay compliant with U.S. LLCs and C-Corps through formation, EIN without SSN, BOI/FinCEN filing, Registered Agent service, banking introductions, bookkeeping, and ongoing compliance support.",
  alternates: regionalAlternates("global", "/about-us"),
};

const TRUST_POINTS = [
  "Built for non-U.S. founders",
  "Flat pricing, no hidden fees",
  "Human + AI support",
];

const MISSION_DELIVERABLES = [
  "LLC and C-Corp formation in founder-friendly states",
  "EIN support without SSN",
  "BOI/FinCEN filing assistance",
  "Registered Agent service",
  "Annual compliance reminders",
  "Banking introductions",
  "Bookkeeping coordination",
  "Founder support after formation",
];

const VALUES = [
  {
    title: "Clarity before complexity",
    body: "We translate formation, EIN, BOI, banking, bookkeeping, and compliance into clear steps founders can actually act on.",
    icon: "01",
  },
  {
    title: "Transparent by default",
    body: "Flat pricing, written scopes, clear timelines, and no surprise charges. Founders deserve to know what happens before they pay.",
    icon: "02",
  },
  {
    title: "Built for global founders",
    body: "Our process is remote-first and designed for entrepreneurs outside the U.S. who want a credible, compliant American company.",
    icon: "03",
  },
  {
    title: "Compliance-led execution",
    body: "Formation is only the beginning. We help founders stay aligned with key obligations like EIN, BOI/FinCEN, Registered Agent, and annual compliance.",
    icon: "04",
  },
  {
    title: "Human + AI support",
    body: "Smart systems help us move faster, while real people review sensitive work, answer complex questions, and keep founders informed.",
    icon: "05",
  },
  {
    title: "Trust earned daily",
    body: "We earn confidence through fast responses, accurate delivery, secure handling of documents, and accountability when something needs attention.",
    icon: "06",
  },
];

const STORY = [
  {
    label: "Early days",
    title: "Solving U.S. setup for founders abroad",
    body: "FormLLC began with a simple problem: helping international entrepreneurs understand how to form a U.S. company without a Social Security Number, expensive legal back-and-forth, or confusing paperwork.",
  },
  {
    label: "Formation",
    title: "Turning filings into a guided product",
    body: "We streamlined LLC and C-Corp formation across founder-friendly states, adding clear document collection, Registered Agent coordination, and step-by-step launch guidance.",
  },
  {
    label: "Compliance",
    title: "Expanding beyond company registration",
    body: "As founders needed support after formation, we added EIN assistance, BOI/FinCEN filing, annual reminders, banking introductions, bookkeeping coordination, and ongoing support.",
  },
  {
    label: "Today",
    title: "Registration-To-Revenue™",
    body: "Today, FormLLC helps founders move from idea to operating business with a full stack of formation, compliance, banking, bookkeeping, tax coordination, analytics, and support.",
  },
];

const PRINCIPLES = [
  {
    title: "Make U.S. business setup borderless.",
    body: "A serious founder should be able to launch a credible U.S. company from anywhere in the world.",
  },
  {
    title: "Keep every step understandable.",
    body: "We explain requirements, fees, documents, and timelines in plain language before work begins.",
  },
  {
    title: "Support the whole journey.",
    body: "Formation matters, but founders also need EIN, BOI, banking, bookkeeping, compliance, and guidance after launch.",
  },
  {
    title: "Use technology with judgment.",
    body: "AI helps us move quickly and organize work, but critical filings and sensitive decisions require human attention.",
  },
  {
    title: "Protect founder information.",
    body: "Documents, IDs, business records, and compliance data must be handled securely and responsibly.",
  },
  {
    title: "Fix issues without friction.",
    body: "When something needs correction, we communicate clearly, act quickly, and stay accountable until it is resolved.",
  },
];

export default function AboutPage() {
  return (
    <SitePage region="global">
      <PageHero
        eyebrow="About FormLLC"
        title={
          <>
            Helping <span className="gradient-text">non-U.S. founders</span>{" "}
            build, manage, and grow U.S. companies.
          </>
        }
        description="FormLLC helps global entrepreneurs start and operate U.S. LLCs and C-Corps with formation, EIN without SSN, BOI/FinCEN filing, Registered Agent service, banking introductions, bookkeeping coordination, and ongoing compliance support."
        primary={{ label: "Start my business", href: "/pricing" }}
        secondary={{ label: "Talk to the team", href: "/contact-us" }}
      />

      <Section tone="white">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {TRUST_POINTS.map((point) => (
              <div
                key={point}
                className="flex min-h-[76px] items-center justify-center rounded-[1.25rem] border border-ink-100 bg-white px-5 py-4 text-center shadow-soft"
              >
                <p className="text-sm font-extrabold tracking-[-0.01em] text-ink-800">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <PressLogos tone="white" />
      <StatsBand />

      <Section tone="white">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Our mission</span>

            <h2 className="mt-5 max-w-xl text-3xl font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-900 text-balance md:text-[2.5rem]">
              Make U.S. company creation simple, fair, and{" "}
              <span className="gradient-text">borderless.</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-ink-600">
              We believe anyone with ambition should be able to launch, sell,
              hire, and scale globally — regardless of where they live.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink-700">
              <p>
                For many founders outside the U.S., starting an American company
                still feels harder than it should. There are state filings, EIN
                uncertainty, BOI/FinCEN requirements, Registered Agent rules,
                banking barriers, bookkeeping questions, tax obligations, and
                compliance deadlines.
              </p>

              <p>
                FormLLC brings those steps into one guided experience. We help
                founders form a U.S. LLC or C-Corp, apply for an EIN without
                SSN, handle BOI/FinCEN filing, arrange Registered Agent support,
                prepare for banking, coordinate bookkeeping, and stay aware of
                ongoing compliance requirements.
              </p>

              <p>
                Our job is not only to register companies. Our job is to help
                founders move from registration to revenue with a business that
                is professional, compliant, and ready to operate globally.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-ink-100 bg-white p-6 shadow-soft md:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="eyebrow">What we deliver</span>
                  <h3 className="mt-3 text-xl font-extrabold tracking-[-0.02em] text-ink-900">
                    End-to-end launch and compliance support.
                  </h3>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {MISSION_DELIVERABLES.map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[56px] items-start gap-3 rounded-2xl border border-ink-100 bg-ink-50/60 px-4 py-3"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-xs font-extrabold text-crimson-700"
                    >
                      ✓
                    </span>
                    <span className="text-sm font-medium leading-6 text-ink-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Our values"
          title="The standards behind every founder experience."
          description="These values guide how we build products, handle documents, communicate timelines, and support founders after formation."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value) => (
            <article
              key={value.title}
              className="group flex h-full flex-col rounded-[1.5rem] border border-ink-100 bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card md:p-8"
            >
              <div className="flex items-start justify-between gap-5">
                <span
                  aria-hidden
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-crimson-100 bg-crimson-50 text-sm font-extrabold text-crimson-700"
                >
                  {value.icon}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-extrabold tracking-[-0.015em] text-ink-900">
                {value.title}
              </h3>

              <p className="mt-3 text-[15px] leading-7 text-ink-600">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Our story</span>

            <h2 className="mt-5 max-w-xl text-3xl font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-900 text-balance md:text-[2.75rem]">
              From business registration to{" "}
              <span className="gradient-text">Registration-To-Revenue™.</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-ink-600">
              FormLLC started by solving one painful problem for founders
              abroad. Today, it supports the full journey from setup to
              compliance and operational readiness.
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute left-[21px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-crimson-200 via-crimson-300 to-gold-200 md:block"
            />

            <div className="space-y-5">
              {STORY.map((item, index) => (
                <article
                  key={item.label}
                  className="relative rounded-[1.5rem] border border-ink-100 bg-white/95 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card md:ml-14 md:p-7"
                >
                  <div
                    aria-hidden
                    className="absolute left-5 top-7 hidden h-3 w-3 rounded-full bg-crimson-600 ring-8 ring-crimson-50 md:-left-[39px] md:block"
                  />

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="inline-flex items-center rounded-full border border-crimson-100 bg-crimson-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-crimson-700">
                        {item.label}
                      </div>

                      <h3 className="mt-4 text-xl font-extrabold tracking-[-0.02em] text-ink-900">
                        {item.title}
                      </h3>

                      <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink-600">
                        {item.body}
                      </p>
                    </div>

                    <span className="hidden shrink-0 text-4xl font-extrabold leading-none tracking-[-0.04em] text-crimson-100 sm:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Team />

      <Section tone="white">
        <SectionHeading
          eyebrow="How we work"
          title="Six operating principles, written down."
          description="These principles keep our work clear, reliable, secure, and founder-first."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <article
              key={principle.title}
              className="flex h-full flex-col rounded-[1.5rem] border border-ink-100 bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card md:p-8"
            >
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-crimson-100 bg-crimson-50 text-sm font-extrabold text-crimson-700"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-6 text-lg font-extrabold tracking-[-0.015em] text-ink-900">
                {principle.title}
              </h3>

              <p className="mt-3 text-[15px] leading-7 text-ink-600">
                {principle.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Testimonials />
      <Newsletter />
      <CTA region="global" />
    </SitePage>
  );
}