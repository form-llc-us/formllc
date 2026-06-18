"use client";

import { useState } from "react";

export type FAQItem = {
  q: string;
  a: string;
};

export default function FAQ({
  items,
  title = "Frequently Asked Questions",
  description,
}: {
  items: FAQItem[];
  title?: string;
  description?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="w-full px-4 py-8 md:py-10">
      {title && (
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[28px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900 md:text-[38px]">
            {title}
          </h2>

          {description && (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-ink-600 md:text-base">
              {description}
            </p>
          )}
        </div>
      )}

      <div
        className={`${
          title ? "mt-7 md:mt-8" : ""
        } mx-auto flex w-full max-w-[820px] flex-col gap-2.5`}
      >
        {items.map((item, i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;

          return (
            <div
              key={i}
              className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                isOpen
                  ? "border-crimson-300/50 bg-white shadow-card"
                  : "border-ink-200/60 bg-white hover:border-crimson-200 hover:shadow-soft"
              }`}
            >
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex min-h-[56px] w-full items-center justify-between gap-4 border-0 px-4 py-3 text-left outline-none ring-0 md:min-h-[62px] md:px-5"
              >
                <span className="text-[15px] font-bold leading-6 text-cream-50 md:text-[16px]">
                  {item.q}
                </span>

                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                    isOpen
                      ? "border-crimson-600 bg-crimson-600 text-white shadow-[0_8px_22px_rgba(196,18,48,0.28)]"
                      : "border-ink-200 bg-ink-50 text-ink-500"
                  }`}
                >
                  <svg
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-all duration-300 ease-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-ink-100 px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
                    <p className="m-0 max-w-[700px] text-[14px] leading-6 text-ink-600 md:text-[15px] md:leading-7">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}