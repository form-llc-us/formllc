"use client";

import { useMemo, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import type { Plan } from "@data/pricing";
import { DEFAULT_STATE, STATE_FEES } from "@data/pricing";

function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PriceCard({ plan }: { plan: Plan }) {
  const [selectedState, setSelectedState] = useState(DEFAULT_STATE);

  const stateFee = STATE_FEES[selectedState] ?? STATE_FEES[DEFAULT_STATE] ?? 0;
  const totalPrice = plan.stateFeeMode ? plan.basePrice + stateFee : plan.basePrice;

  const stateOptions = useMemo(() => Object.keys(STATE_FEES).sort(), []);

  return (
    <div
      id={plan.key === "rtr" ? "registration-to-revenue" : plan.key}
      className={`pricing-card relative flex h-full flex-col overflow-visible ${
        plan.popular ? "ring-2 ring-crimson-500/40" : ""
      }`}
    >
      {plan.popular && (
        <span className="absolute left-1/2 top-0 z-20 inline-flex h-7 -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-crimson-600 px-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-button">
          Most popular
        </span>
      )}

      <div>
        <h3 className="text-xl font-extrabold tracking-tight text-ink-900">
          {plan.label}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">
          {plan.tagline}
        </p>
      </div>

      <div className="mt-8 border-b border-ink-100 pb-8">
        <div className="flex flex-wrap items-baseline gap-1.5">
          <span className="text-[2.5rem] font-extrabold leading-none tracking-tighter text-ink-900">
            {formatUSD(totalPrice)}
          </span>

          {plan.stateFeeMode && (
            <span className="text-xs font-bold text-ink-500">
              incl. state fee
            </span>
          )}
        </div>

        <p className="mt-3 text-sm font-semibold text-ink-500">
          {plan.stateFeeMode
            ? `Base ${formatUSD(plan.basePrice)} + ${formatUSD(stateFee)} state fee`
            : plan.priceNote}
        </p>

        {plan.stateFeeMode && (
          <div className="mt-5">
            <label
              htmlFor={`state-${plan.key}`}
              className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-500"
            >
              Select State
            </label>

            <select
              id={`state-${plan.key}`}
              value={selectedState}
              onChange={(event) => setSelectedState(event.target.value)}
              className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm font-semibold text-ink-900 outline-none transition focus:border-crimson-400 focus:ring-4 focus:ring-crimson-500/15"
            >
              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {state} — {formatUSD(STATE_FEES[state])}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <ul className="mt-8 flex-1 space-y-4 text-sm">
        {plan.features.map((feature) => (
          <li
            key={feature.text}
            className={`flex items-start gap-3 ${
              feature.included ? "text-ink-500" : "text-ink-500/55 line-through"
            }`}
          >
            <span
              aria-hidden
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                feature.included
                  ? "border border-crimson-300/40 bg-crimson-50 text-crimson-600"
                  : "border border-ink-200 bg-ink-50 text-ink-400"
              }`}
            >
              {feature.included ? (
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                </svg>
              )}
            </span>

            <span className={feature.highlight ? "font-bold text-ink-900" : ""}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <LinkButton
        href={plan.cta.href}
        variant={plan.popular ? "primary" : "outline"}
        size="lg"
        className="mt-10 w-full"
      >
        {plan.cta.label}
      </LinkButton>
    </div>
  );
}
