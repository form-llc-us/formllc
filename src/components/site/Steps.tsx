import { Section, SectionHeading } from "@/components/ui/Section";

const STEPS = [
  {
    n: "01",
    title: "Tell us your goal",
    body: "Share your country, business idea, and where you'd like to operate. 5-minute intake.",
  },
  {
    n: "02",
    title: "We file the paperwork",
    body: "Articles of Organization, registered agent, EIN — all submitted within 24 hours.",
  },
  {
    n: "03",
    title: "Open your bank account",
    body: "Use our intros to get a U.S. business account, payment processors, and accounting setup.",
  },
  {
    n: "04",
    title: "Stay compliant — automatically",
    body: "We track annual reports, franchise tax, and tax filings so nothing slips through.",
  },
];

export default function Steps({
  id,
  eyebrow = "How it works",
  title = "From idea to incorporated — in days.",
  description = "A clear, guided process. We do the filing; you make the calls.",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <Section tone="muted" id={id}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ol className="mt-16 content-grid-4">
        {STEPS.map((s, i) => (
          <li
            key={s.n}
            className="card relative overflow-hidden p-8 md:p-9"
          >
            <span
              aria-hidden
              className="absolute -right-2 -top-3 select-none font-display text-[5.25rem] leading-none tracking-tighterPremium text-ink-900/[0.04]"
            >
              {s.n}
            </span>
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-crimson-300/30 bg-crimson-700/15 text-sm font-bold text-crimson-400">
              {i + 1}
            </span>
            <h3 className="relative mt-6 font-bold text-ink-900 text-lg">{s.title}</h3>
            <p className="relative mt-3.5 text-ink-600 leading-relaxed text-sm">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
