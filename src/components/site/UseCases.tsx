import { Section, SectionHeading } from "@/components/ui/Section";
import Link from "next/link";

const CASES = [
  {
    title: "Non-U.S. founder",
    body: "Form a Wyoming or Delaware LLC, get an EIN without an SSN, open Mercury or Wise, and stay compliant — even with zero U.S. presence.",
    bullets: ["No SSN required", "ITIN guidance included", "Form 1120 + 5472 filing"],
    href: "/services",
  },
  {
    title: "U.S. solo founder",
    body: "Single-member LLC in your home state, with the option to elect S-Corp once revenue clears the SE-tax threshold.",
    bullets: ["State-specific guidance", "S-Corp election (Form 2553)", "Owner payroll setup"],
    href: "/us/services",
  },
  {
    title: "Global SaaS / e-com",
    body: "Delaware C-Corp with Stripe Atlas-style cap table — but with FormLLC's banking, tax, and ongoing compliance baked in.",
    bullets: ["Investor-ready cap table", "Stripe / Mercury intros", "Multi-state sales-tax registration"],
    href: "/services",
  },
];

export default function UseCases({
  id,
  eyebrow = "Who it's for",
  title = "Built for three kinds of founders.",
  description = "Different paths, same team handling the paperwork.",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <Section tone="muted" id={id}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-14 content-grid-3">
        {CASES.map((c) => (
          <Link key={c.title} href={c.href} className="card group flex flex-col h-full p-7 md:p-8">
            <div className="flex items-center justify-between">
              <span className="badge">Use case</span>
              <span
                aria-hidden
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cream-100 text-ink-700 group-hover:bg-crimson-50 group-hover:text-crimson-700 transition"
              >
                →
              </span>
            </div>
            <h3 className="mt-5 text-xl font-bold text-ink-900">{c.title}</h3>
            <p className="mt-2.5 text-ink-600 leading-relaxed text-[15px] flex-1">{c.body}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {c.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-ink-700">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-crimson-500 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </Section>
  );
}
