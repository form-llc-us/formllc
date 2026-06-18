import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";

const COMPETITORS = [
  { name: "Doola", href: "/formllc-vs-doola", desc: "Non-resident bundles, but EIN and tax filing are extra." },
  { name: "Bizee", href: "/formllc-vs-bizee", desc: "Cheap formation, but the upsells on agent + EIN add up." },
  { name: "Stripe Atlas", href: "/formllc-vs-atlas", desc: "Great for VC-track Delaware C-Corps. Limited beyond that." },
  { name: "ZenBusiness", href: "/formllc-vs-zenbusiness", desc: "Subscription model. Built for U.S. residents only." },
];

export default function Comparison({ region = "global" }: { region?: "global" | "us" }) {
  const base = region === "us" ? "/us" : "";
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="Compare"
        title="How we stack up against the alternatives."
        description="See feature-by-feature comparisons against the four most-asked-about competitors."
      />
      <div className="mt-12 content-grid-4">
        {COMPETITORS.map((c) => (
          <Link key={c.name} href={c.href} className="card group flex h-full flex-col p-6">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-ink-900 leading-tight text-[15px]">
                FormLLC <span className="text-ink-400 font-medium">vs</span>{" "}
                <span className="text-crimson-700">{c.name}</span>
              </h3>
              <span
                aria-hidden
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-200 bg-ink-50 text-ink-600 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-crimson-200 group-hover:bg-crimson-50 group-hover:text-crimson-600"
              >
                →
              </span>
            </div>
            <p className="mt-3 text-sm text-ink-600 leading-relaxed flex-1">{c.desc}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href={`${base}/formllc-vs-alternatives`} className="link-pill">
          See all comparisons →
        </Link>
      </div>
    </Section>
  );
}
