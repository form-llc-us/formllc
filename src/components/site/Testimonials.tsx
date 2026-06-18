import { Section, SectionHeading } from "@/components/ui/Section";

const QUOTES = [
  {
    q: "Got my Wyoming LLC + EIN + Mercury account in under two weeks. Most painless company setup I've ever done.",
    name: "Anika R.",
    role: "Founder, AI tooling startup",
  },
  {
    q: "I'm not a U.S. resident. They handled my ITIN, EIN, and 5472 filing without me chasing them once.",
    name: "Daniel V.",
    role: "Founder, e-commerce brand",
  },
  {
    q: "The annual compliance reminders alone pay for the plan. Saved us a Texas franchise penalty last year.",
    name: "Priya K.",
    role: "Co-founder, SaaS",
  },
];

export default function Testimonials({
  id,
  eyebrow = "Loved by founders",
  title = "5,000+ companies launched.",
  description = "Founders from 60+ countries trust FormLLC with their U.S. legal home base.",
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
        {QUOTES.map((q) => {
          const initials = q.name
            .split(/\s+/)
            .map((p) => p[0])
            .filter(Boolean)
            .slice(0, 2)
            .join("")
            .toUpperCase();
          return (
            <figure key={q.name} className="card flex flex-col p-8 md:p-9">
              <svg
                aria-hidden
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="text-crimson-200"
                fill="currentColor"
              >
                <path d="M9.4 22.8c-2.5 0-4.5-2-4.5-4.6 0-4.7 3.7-9.5 9.6-12l1.5 2.5c-3.5 1.6-6 4.4-6.5 6.7.6-.4 1.4-.7 2.4-.7 2.4 0 4.4 1.9 4.4 4.5 0 2.4-2 3.6-4.4 3.6h-2.5zm12 0c-2.5 0-4.5-2-4.5-4.6 0-4.7 3.7-9.5 9.6-12l1.5 2.5c-3.5 1.6-6 4.4-6.5 6.7.6-.4 1.4-.7 2.4-.7 2.4 0 4.4 1.9 4.4 4.5 0 2.4-2 3.6-4.4 3.6h-2.5z" />
              </svg>
              <Stars />
              <blockquote className="mt-5 flex-1 text-ink-800 leading-relaxed text-[15px]">
                {q.q}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-ink-100 pt-6">
                <span
                  aria-hidden
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-crimson-300/30 bg-crimson-700/15 text-sm font-bold text-cream-50"
                >
                  {initials}
                </span>
                <div>
                  <p className="font-bold text-ink-900 text-sm">{q.name}</p>
                  <p className="text-xs text-ink-500">{q.role}</p>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </Section>
  );
}

function Stars() {
  return (
    <div className="mt-3 flex gap-1 text-gold-400" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}
