import Link from "next/link";
import { US_STATES } from "@data/states";

export default function StateGrid({ region = "global" }: { region?: "global" | "us" }) {
  const base = region === "us" ? "/us" : "";
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {US_STATES.map((s) => (
        <Link
          key={s.code}
          href={`${base}/blogs/${s.slug}-llc-registration`}
          className="group rounded-2xl border border-ink-200/60 bg-white px-4 py-3.5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300/50 hover:shadow-card"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-ink-900 truncate">{s.name}</span>
            <span className="text-[11px] font-bold text-ink-500 transition-colors group-hover:text-crimson-600">
              ${s.formationFee}
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-500 transition-colors group-hover:text-crimson-400">
            Form your LLC →
          </p>
        </Link>
      ))}
    </div>
  );
}
