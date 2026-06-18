import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";

const POPULAR = [
  {
    state: "Wyoming",
    slug: "wyoming",
    asset: "Wyoming_LLC_Registration.webp",
    fee: 100,
    why: "Best privacy, low annual fees, no state income tax.",
  },
  {
    state: "Delaware",
    slug: "delaware",
    asset: "Delaware_LLC_Registration.webp",
    fee: 110,
    why: "Investor-ready C-Corps. Most-used state for VC fundraising.",
  },
  {
    state: "Florida",
    slug: "florida",
    asset: "Florida_LLC_Registration.webp",
    fee: 125,
    why: "No state income tax. Founder-friendly courts. Fast filings.",
  },
  {
    state: "New Mexico",
    slug: "new-mexico",
    asset: "New_Mexico_LLC_Registration.webp",
    fee: 50,
    why: "Lowest annual cost. Anonymous LLC ownership permitted.",
  },
];

export default function PopularStates({
  region = "global",
}: {
  region?: "global" | "us";
}) {
  const base = region === "us" ? "/us" : "";

  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="Popular states"
        title="Where founders form most often."
        description="The four states we recommend most — each for a different reason."
      />

      <div className="mt-14 content-grid-4">
        {POPULAR.map((s) => (
          <Link
            key={s.slug}
            href={`${base}/blogs/${s.slug}-llc-registration`}
            className="card group flex flex-col overflow-hidden !p-0"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
              <Image
                src={`/Assets/${s.asset}`}
                alt={`${s.state} LLC formation`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            <div className="p-6 md:p-7 flex-1 flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-ink-900 text-lg">
                  {s.state}
                </h3>

                <span className="text-[11px] font-bold uppercase tracking-wider text-ink-500">
                  ${s.fee}
                </span>
              </div>

              <p className="mt-2 text-sm text-ink-600 leading-relaxed flex-1">
                {s.why}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-crimson-700 group-hover:text-crimson-600">
                State formation guide
                <span
                  aria-hidden
                  className="group-hover:translate-x-0.5 transition-transform"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}