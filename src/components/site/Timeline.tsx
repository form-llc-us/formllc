import { Section, SectionHeading } from "@/components/ui/Section";

const ENTRIES = [
  { year: "2020", title: "Founded in Wyoming", body: "FormLLC starts as a side project to help international founders form a U.S. LLC without paying $2,000+ to a law firm." },
  { year: "2021", title: "First 1,000 customers", body: "We launch in 12 countries and become the go-to formation service for non-U.S. founders raising on Stripe." },
  { year: "2023", title: "Tax filing in-house", body: "We bring federal return preparation in-house. Form 1120 + 5472 filed by IRS Enrolled Agents — no more hand-offs." },
  { year: "2025", title: "5,000+ companies", body: "Now serving founders in 60+ countries with formation, banking introductions, bookkeeping, and tax filing — under one roof." },
];

export default function Timeline() {
  return (
    <Section tone="muted">
      <SectionHeading eyebrow="Our story" title="From side project to 5,000+ founders." />
      <div className="mt-14 max-w-3xl mx-auto relative">
        <div
          aria-hidden
          className="absolute bottom-2 left-[18px] top-2 w-px bg-gradient-to-b from-crimson-500 via-gold-400/60 to-transparent md:left-1/2 md:-translate-x-1/2"
        />
        <ol className="space-y-12">
          {ENTRIES.map((e, i) => (
            <li
              key={e.year}
              className="relative md:grid md:grid-cols-2 md:gap-12 items-start"
            >
              <div
                className={`hidden md:block ${
                  i % 2 === 0 ? "text-right pr-2" : "md:order-2 text-left pl-2"
                }`}
              >
                <span className="text-[2.75rem] font-extrabold tracking-tighterPremium text-ink-900 leading-none">
                  {e.year}
                </span>
              </div>
              <div
                className={`relative pl-12 md:pl-0 ${
                  i % 2 === 0 ? "" : "md:order-1 md:text-right md:pr-12"
                }`}
              >
                <span
                  aria-hidden
                  className="absolute left-2.5 top-1.5 h-4 w-4 rounded-full bg-crimson-600 shadow-glow ring-[5px] ring-[#160808] md:left-1/2 md:-translate-x-1/2"
                />
                <p className="md:hidden text-2xl font-extrabold text-crimson-700">{e.year}</p>
                <h3 className="md:mt-0 font-bold text-ink-900 text-lg">{e.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{e.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
