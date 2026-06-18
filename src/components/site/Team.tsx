import { Section, SectionHeading } from "@/components/ui/Section";

const TEAM = [
  {
    name: "A. Khan",
    role: "Founder & CEO",
    bio: "Serial founder. Previously incorporated 4 companies in 3 states before realizing nobody was building this for global founders.",
    initials: "AK",
  },
  {
    name: "M. Patel",
    role: "Head of Tax",
    bio: "IRS Enrolled Agent. 12 years preparing federal returns for foreign-owned LLCs, partnerships, and S-Corps.",
    initials: "MP",
  },
  {
    name: "S. Lee",
    role: "Head of Compliance",
    bio: "Tracks every state's annual report calendar so you don't have to. Former Delaware filing-clerk insider.",
    initials: "SL",
  },
  {
    name: "R. Costa",
    role: "Customer Success Lead",
    bio: "Your first call. Replies in hours, not days, in English, Spanish, or Portuguese.",
    initials: "RC",
  },
];

export default function Team() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="Leadership"
        title="The humans behind the paperwork."
        description="A small, senior team — every member has built and shipped a company themselves."
      />
      <div className="mt-14 content-grid-4">
        {TEAM.map((p) => (
          <article key={p.name} className="card p-7 md:p-8 text-center">
            <div
              aria-hidden
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-crimson-300/30 bg-crimson-700/15 text-xl font-extrabold text-crimson-400 shadow-soft"
            >
              {p.initials}
            </div>
            <h3 className="mt-6 text-lg font-bold text-ink-900">{p.name}</h3>
            <p className="mt-1 text-sm font-bold text-crimson-700">{p.role}</p>
            <p className="mt-4 text-sm text-ink-600 leading-relaxed">{p.bio}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
