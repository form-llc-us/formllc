"use client";

import { useMemo } from "react";
import { scoreSeo, type SeoInput, type SeoReport } from "@/lib/seo-score";

type Props = {
  input: SeoInput;
};

function scoreColor(score: number): string {
  if (score >= 85) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (score >= 65) return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-rose-700 bg-rose-50 border-rose-200";
}

function lengthHint(value: number, min: number, max: number) {
  if (value === 0) return "text-ink-500";
  if (value < min || value > max) return "text-amber-700";
  return "text-emerald-700";
}

export default function BlogSeoPanel({ input }: Props) {
  const report: SeoReport = useMemo(() => scoreSeo(input), [input]);

  return (
    <div className="card p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500">
          SEO score
        </h3>
        <span
          className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-sm font-extrabold ${scoreColor(report.score)}`}
        >
          {report.score}/100
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-ink-500">Meta title</dt>
          <dd className={`font-semibold ${lengthHint(report.metaTitleLength, 30, 60)}`}>
            {report.metaTitleLength} chars
          </dd>
        </div>
        <div>
          <dt className="text-ink-500">Meta description</dt>
          <dd className={`font-semibold ${lengthHint(report.metaDescriptionLength, 70, 160)}`}>
            {report.metaDescriptionLength} chars
          </dd>
        </div>
        <div>
          <dt className="text-ink-500">Word count</dt>
          <dd className="font-semibold text-ink-800">{report.wordCount}</dd>
        </div>
        <div>
          <dt className="text-ink-500">Reading time</dt>
          <dd className="font-semibold text-ink-800">{report.readingMinutes} min</dd>
        </div>
        <div>
          <dt className="text-ink-500">Slug quality</dt>
          <dd
            className={`font-semibold capitalize ${
              report.slugQuality === "good"
                ? "text-emerald-700"
                : report.slugQuality === "okay"
                  ? "text-amber-700"
                  : "text-rose-700"
            }`}
          >
            {report.slugQuality}
          </dd>
        </div>
      </dl>

      {report.warnings.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
            Suggestions
          </p>
          <ul className="space-y-2">
            {report.warnings.map((w, i) => (
              <li
                key={`${w.field}-${i}`}
                className={`text-xs leading-relaxed rounded-xl border px-3 py-2 ${
                  w.level === "error"
                    ? "bg-rose-50 text-rose-800 border-rose-200"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}
              >
                <span className="font-bold mr-1.5">{w.field}:</span>
                {w.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
