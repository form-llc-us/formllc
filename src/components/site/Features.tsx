import { Section, SectionHeading } from "@/components/ui/Section";

type Feature = { title: string; body: string; icon: React.ReactNode };

const FEATURES: Feature[] = [
  {
    title: "Formation in any state",
    body: "Pick the right state — we handle name search, articles, registered agent, and operating agreement.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 21h18M5 21V10l7-4 7 4v11M9 14h6M9 18h6" />
      </svg>
    ),
  },
  {
    title: "EIN — fast",
    body: "We file SS-4 the day you sign up. Priority routing for non-U.S. founders without an SSN.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 9h4M7 13h4M15 9h2M15 13h2" />
      </svg>
    ),
  },
  {
    title: "Banking introductions",
    body: "Warm intros to Mercury, Relay, Stripe, PayPal, Payoneer — without the cold-application headache.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 10l9-6 9 6v2H3z" />
        <path d="M5 12v6M9 12v6M15 12v6M19 12v6M3 20h18" />
      </svg>
    ),
  },
  {
    title: "Annual reports & compliance",
    body: "We track every state's annual report, franchise tax, and renewal so you never get hit with a surprise penalty.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "U.S. tax filing",
    body: "Form 1120 + 5472 for non-U.S.-owned LLCs. Form 1065 for partnerships. Filed by an Enrolled Agent.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6M9 14h6M9 18h4" />
      </svg>
    ),
  },
  {
    title: "Real humans",
    body: "Your dedicated success manager replies in hours, not days. No chatbots, no support tickets.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

export default function Features({
  id,
  eyebrow = "Why FormLLC",
  title = "Everything you need, nothing you don't.",
  description = "One team. One dashboard. From your first paperwork to your first tax return.",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <Section tone="white" id={id}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-16 content-grid-3">
        {FEATURES.map((f) => (
          <article key={f.title} className="card p-8 md:p-9">
            <div className="feature-icon">{f.icon}</div>
            <h3 className="mt-6 text-lg font-bold text-ink-900">{f.title}</h3>
            <p className="mt-3 text-ink-600 leading-relaxed text-[15px]">{f.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
