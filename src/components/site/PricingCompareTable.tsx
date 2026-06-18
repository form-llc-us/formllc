import { Fragment } from "react";
import type { Region } from "@data/site";
import { getComparisonRows, PLAN_LABELS } from "@data/pricing";
import { Section, SectionHeading } from "@/components/ui/Section";

type CellValue = boolean | "Add-on";

export default function PricingCompareTable({
  region = "global",
}: {
  region?: Region;
}) {
  const rows = getComparisonRows(region);

  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="Plan comparison"
        title="A detailed breakdown of everything included."
        description={
          region === "us"
            ? "Compare formation, EIN support, compliance, tax filing, bookkeeping, and support for U.S. residents."
            : "Compare formation, compliance, tax filing, banking support, and add-ons across all plans."
        }
      />

      <div className="mt-12 overflow-x-auto rounded-3xl border border-ink-200/50 bg-white shadow-card">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-ink-100">
              <th className="bg-ink-50 px-6 py-5 text-left font-bold text-ink-900">
                Features
              </th>

              {PLAN_LABELS.map((plan, index) => (
                <th
                  key={plan}
                  className={`px-6 py-5 text-center font-bold ${
                    index === 2
                      ? "bg-crimson-50 text-crimson-700"
                      : "bg-ink-50 text-ink-900"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {plan}

                    {index === 2 && (
                      <span className="inline-flex h-5 items-center rounded-full bg-crimson-600 px-2 text-[9px] font-bold uppercase tracking-wider text-white">
                        Popular
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-ink-100">
            {rows.map((group) => (
              <Fragment key={group.category}>
                <tr>
                  <td
                    colSpan={4}
                    className="bg-ink-50 px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-700"
                  >
                    {group.category}
                  </td>
                </tr>

                {group.rows.map((row) => (
                  <tr key={`${group.category}-${row.feature}`} className="align-top">
                    <td className="px-6 py-4 font-medium text-ink-700">
                      {row.feature}
                    </td>

                    {row.values.map((value, index) => (
                      <td
                        key={`${row.feature}-${index}`}
                        className={`px-6 py-4 text-center ${
                          index === 2 ? "bg-crimson-700/10" : ""
                        }`}
                      >
                        <Cell value={value} highlight={index === 2} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-center text-sm text-ink-500">
        <strong>Legend:</strong> ✓ = Included · Add-on = Available separately · — = Not included
      </p>
    </Section>
  );
}

function Cell({ value, highlight }: { value: CellValue; highlight: boolean }) {
  if (value === true) {
    return (
      <span
        aria-label="Included"
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          highlight ? "bg-crimson-600 text-white" : "bg-crimson-700 text-white"
        }`}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
    );
  }

  if (value === false) {
    return (
      <span aria-label="Not included" className="inline-block font-bold text-ink-500">
        —
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-700">
      {value}
    </span>
  );
}
