"use client";

import { useEffect, useMemo, useState } from "react";

type TocHeading = {
  id: string;
  text: string;
  level: number;
};

export default function BlogToc({ headings }: { headings: TocHeading[] }) {
  const visibleHeadings = useMemo(
    () => headings.filter((heading) => heading.level <= 3).slice(0, 16),
    [headings]
  );

  const [activeId, setActiveId] = useState<string>(visibleHeadings[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (visibleHeadings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 1],
      }
    );

    visibleHeadings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [visibleHeadings]);

  useEffect(() => {
    function updateProgress() {
      const article = document.querySelector("[data-blog-article]");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = article.scrollHeight - window.innerHeight;
      const current = window.scrollY - articleTop;

      const percentage =
        articleHeight > 0
          ? Math.min(100, Math.max(0, (current / articleHeight) * 100))
          : 0;

      setProgress(percentage);
    }

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  if (visibleHeadings.length === 0) {
    return null;
  }

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="card flex w-full items-center justify-between px-5 py-4 text-left"
        >
          <span>
            <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-ink-500">
              On this page
            </span>
            <span className="mt-1 block text-sm font-bold text-ink-900">
              Jump to section
            </span>
          </span>

          <span
            aria-hidden
            className={`text-xl font-bold text-crimson-700 transition ${
              open ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </button>

        {open && (
          <div className="card mt-3 p-4">
            <TocList headings={visibleHeadings} activeId={activeId} />
          </div>
        )}
      </div>

      <div className="card hidden p-6 lg:block">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink-500">
              On this page
            </p>
            <p className="mt-1 text-sm font-semibold text-ink-500">
              Scroll tracker
            </p>
          </div>

          <div className="relative h-12 w-12 shrink-0">
            <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-ink-200"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="text-crimson-600 transition-all duration-150"
              />
            </svg>

            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-ink-700">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-ink-200">
          <div
            className="h-full rounded-full bg-crimson-600 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-5">
          <TocList headings={visibleHeadings} activeId={activeId} />
        </div>
      </div>
    </>
  );
}

function TocList({
  headings,
  activeId,
}: {
  headings: TocHeading[];
  activeId: string;
}) {
  return (
    <ol className="space-y-1.5">
      {headings.map((heading, index) => {
        const active = activeId === heading.id;
        const indent = Math.max(0, heading.level - 2) * 12;

        return (
          <li key={heading.id} style={{ paddingLeft: `${indent}px` }}>
            <a
              href={`#${heading.id}`}
              className={`group flex items-start gap-3 rounded-xl px-3 py-2 text-sm font-semibold leading-snug transition ${
                active
                  ? "bg-crimson-50 text-crimson-700 shadow-soft"
                  : "text-ink-500 hover:bg-ink-50 hover:text-ink-900"
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold ${
                  active
                    ? "bg-crimson-600 text-white"
                    : "bg-ink-100 text-ink-500 group-hover:bg-crimson-50 group-hover:text-crimson-600"
                }`}
              >
                {index + 1}
              </span>

              <span>{heading.text}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
