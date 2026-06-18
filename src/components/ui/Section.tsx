import type { ReactNode } from "react";

/**
 * Section surfaces are intentionally dark. Legacy light tone names remain
 * accepted so existing pages keep rendering without route/content changes.
 */
type Tone = "white" | "paper" | "canvas" | "muted" | "blush" | "gold" | "dark" | "gradient";

const TONE_CLASS: Record<Tone, string> = {
  white:    "section-light",
  paper:    "section-light",
  canvas:   "section-canvas",
  muted:    "section-muted",
  blush:    "bg-soft-crimson",
  gold:     "section-accent",
  dark:     "brand-gradient",
  gradient: "brand-gradient",
};

export function Section({
  children,
  className = "",
  id,
  tone = "white",
  tight = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: Tone;
  tight?: boolean;
}) {
  const surfaceClass = TONE_CLASS[tone] ?? TONE_CLASS.white;
  const padding = tight ? "section-tight" : "section";

  return (
    <section id={id} className={`relative ${padding} ${surfaceClass} ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  const alignmentClass = align === "center" ? "mx-auto text-center" : "section-heading-left";

  return (
    <div className={`section-heading max-w-[52rem] ${alignmentClass}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="serif-heading mt-6 text-4xl leading-[0.98] text-cream-50 text-balance md:text-[3.1rem] lg:text-[3.7rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-base leading-[1.82] text-ink-500 text-pretty md:text-[1.08rem]">
          {description}
        </p>
      )}
    </div>
  );
}
