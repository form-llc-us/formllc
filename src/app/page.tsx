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
import PressLogos from "@/components/site/PressLogos";
import StatsBand from "@/components/site/StatsBand";
import BankingPartners from "@/components/site/BankingPartners";
import PopularStates from "@/components/site/PopularStates";
import UseCases from "@/components/site/UseCases";
import Comparison from "@/components/site/Comparison";
import Guarantee from "@/components/site/Guarantee";
import Newsletter from "@/components/site/Newsletter";
import Team from "@/components/site/Team";

const HOMEPAGE_FAQ = [
  {
    q: "Can I form a U.S. LLC if I'm not a U.S. resident?",
    a: "Yes. Anyone in the world can own a U.S. LLC. You don't need a Social Security Number. We help you obtain an EIN (and an ITIN if needed) using IRS Form W-7 / SS-4.",
  },
  {
    q: "Which state should I form in?",
    a: "Wyoming, Delaware, New Mexico, and Florida are the most common. Wyoming wins on privacy and low fees, Delaware is preferred for funded startups, New Mexico is the cheapest, and Florida is great if you'll have a U.S. presence.",
  },
  {
    q: "How long does it take?",
    a: "Most states approve LLC filings in 2–5 business days. EINs are issued the same day if you're U.S.-based, or 4–8 weeks if we need to fax SS-4 (we offer Priority for faster turnaround).",
  },
  {
    q: "What's included in your Standard plan?",
    a: "State filing, registered agent (1 year), Operating Agreement, EIN application, banking introductions, ITIN guidance, annual report filing for year one, and your first federal tax return.",
  },
  {
    q: "Do I need a U.S. address or phone number?",
    a: "No — we provide a registered agent address in your state of formation. For banking, our partners (Mercury, Relay, Wise) accept non-U.S. founders.",
  },
  {
    q: "What about taxes?",
    a: "Single-member LLCs owned by non-U.S. residents must file Form 1120 + Form 5472 with the IRS each year, even with zero revenue. We handle that for you. C-Corps file Form 1120; partnerships file 1065.",
  },
];

import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Register Your LLC or C-Corp in Any U.S. State",
  description:
    "FormLLC handles your U.S. company formation, EIN, registered agent, banking introductions, and annual compliance — all in one place. Trusted by 5,000+ founders worldwide.",
  alternates: regionalAlternates("global", "/"),
};

export default function HomePage() {
  return (
    <SitePage region="global">
      <Hero region="global" />
      <PressLogos tone="muted" />

      {/* §4: "Why FormLLC?" */}
      <Features
        id="why-formllc"
        eyebrow="Why FormLLC"
        title="Why FormLLC?"
        description="Built end-to-end for non-U.S. founders: LLC/C-Corp formation, EIN without SSN, BOI/FinCEN filing, banking introductions, and compliant bookkeeping under one roof."
      />

      {/* §4: "Your One–Stop Business Solution" */}
      <UseCases
        id="one-stop-solution"
        eyebrow="One platform"
        title="Your One-Stop Business Solution"
        description="Three founder paths, one team handling formation, EIN, banking, and ongoing compliance — so global entrepreneurs ship instead of chase paperwork."
      />

      {/* §4: "Start, Run and Grow your Business in United States" */}
      <Steps
        id="start-run-grow"
        eyebrow="Start. Run. Grow."
        title="Start, Run and Grow your Business in the United States"
        description="A clear path from idea to incorporated to compliant. EIN without SSN, registered agent, BOI filing, and banking introductions — handled end-to-end."
      />

      <BankingPartners />
      <StatsBand />
      <PopularStates region="global" />

      <Section tone="white" id="pricing">
        <SectionHeading
          eyebrow="Pricing"
          title="Plans built around your stage."
          description="No hidden fees. State filing fees billed at cost, fully transparent."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {PLANS.map((p) => (<PriceCard key={p.key} plan={p} />))}
        </div>
        <p className="mt-6 text-center text-sm text-ink-500">
          State filing fees billed at cost. Registered agent included for the first year.
        </p>
      </Section>

      <Section tone="muted" id="states">
        <SectionHeading
          eyebrow="All 50 states"
          title="Form an LLC in any U.S. state."
          description="State-by-state guides, fees, and timelines."
        />
        <div className="mt-16">
          <StateGrid region="global" />
        </div>
      </Section>

      {/* §4: "Hear From Our Clients" */}
      <Testimonials
        id="hear-from-clients"
        eyebrow="What clients say"
        title="Hear From Our Clients"
        description="Founders from 60+ countries trust FormLLC with their U.S. legal home base — formation, EIN, banking, and compliance."
      />

      <Comparison region="global" />
      <Guarantee region="global" />
      <Team />

      {/* §4: "Frequently Asked Questions" */}
      <Section tone="muted" id="faq">
        <FAQ items={HOMEPAGE_FAQ} title="Frequently Asked Questions" />
      </Section>

      <Newsletter />

      {/* §4: "Start Business in U.S. As 'Non-Residents'" — non-resident-positioned final CTA */}
      <section
        id="start-as-non-residents"
        className="section bg-soft-crimson"
        aria-labelledby="non-residents-heading"
      >
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-[1.32fr_1fr] lg:gap-16">
            <div>
              <span className="eyebrow">For non-residents</span>
              <h2
                id="non-residents-heading"
                className="premium-heading mt-6 max-w-[11ch]"
              >
                Start Business in U.S. As{" "}
                <span className="gradient-text">"Non-Residents"</span>
              </h2>
              <p className="premium-subtitle mt-6">
                Anyone in the world can own a U.S. LLC or C-Corp. We handle the
                EIN without SSN, ITIN where needed, BOI/FinCEN filing, U.S.
                banking introductions, and Form 1120 + 5472 compliance for
                foreign-owned LLCs — all in one place, with flat pricing and a
                real human you can talk to.
              </p>
              <ul className="mt-8 grid max-w-xl gap-x-8 gap-y-3 text-sm text-ink-700 sm:grid-cols-2">
                {[
                  "EIN without SSN",
                  "ITIN guidance via Form W-7",
                  "BOI / FinCEN filing",
                  "Foreign-owned LLC tax filing",
                  "Mercury / Wise / Payoneer intros",
                  "Registered agent in your state",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className="mt-1 h-1.5 w-1.5 rounded-full bg-crimson-500 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="/pricing" className="btn btn-primary btn-lg">
                  Start My Business
                </a>
                <a href="/contact-us" className="btn btn-ghost btn-lg">
                  Talk to a specialist
                </a>
              </div>
            </div>
            <div className="card p-8 md:p-9">
              <p className="eyebrow">Free 30-min consult</p>
              <h3 className="mt-6 text-xl font-bold text-ink-900">
                Talk to a non-resident specialist
              </h3>
              <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                We'll map your formation, EIN, banking, and U.S. tax setup in a
                single call — no sales pitch.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-ink-700">
                {[
                  "EIN without SSN routing",
                  "Mercury / Wise account guidance",
                  "Form 1120 + 5472 timeline",
                ].map((it) => (
                  <li key={it} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-crimson-700 border border-crimson-100"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href="/contact-us"
                className="btn btn-primary btn-md mt-8 w-full"
              >
                Book a free consult
              </a>
            </div>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
