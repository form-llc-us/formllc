import type { ReactNode } from "react";
import { LinkButton } from "@/components/ui/Button";

type Action = { label: string; href: string };

export default function PageHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  meta,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  primary?: Action;
  secondary?: Action;
  /** Optional small metadata line below the eyebrow (e.g. last-updated). */
  meta?: ReactNode;
  /** Optional right-side content (image, card, stat block). */
  children?: ReactNode;
}) {
  const hasSide = Boolean(children);

  return (
    <section className="brand-gradient relative overflow-hidden">

      <div className="container-x relative py-10 md:py-14 lg:py-[4.5rem]">
        <div
          className={
            hasSide
              ? "hero-grid"
              : "mx-auto max-w-4xl text-center"
          }
        >
          <div className={hasSide ? "max-w-2xl" : "mx-auto max-w-3xl"}>
            <span className="eyebrow">{eyebrow}</span>

            {meta && (
              <div className="mt-2 text-sm font-medium text-ink-500">
                {meta}
              </div>
            )}

            <h1 className="mt-4 text-balance font-display text-4xl font-normal leading-[1.03] tracking-[-0.032em] text-cream-50 md:text-5xl lg:text-[3.35rem]">
              {title}
            </h1>

            {description && (
              <p
                className={
                  hasSide
                    ? "mt-5 max-w-2xl text-pretty text-base leading-[1.75] text-white/72 md:text-[1.05rem]"
                    : "mx-auto mt-5 max-w-3xl text-pretty text-base leading-[1.75] text-white/72 md:text-[1.05rem]"
                }
              >
                {description}
              </p>
            )}

            {(primary || secondary) && (
              <div
                className={
                  hasSide
                    ? "mt-7 flex flex-wrap items-center gap-3"
                    : "mt-7 flex flex-wrap items-center justify-center gap-3"
                }
              >
                {primary && (
                  <LinkButton href={primary.href} variant="primary" size="md">
                    {primary.label}
                  </LinkButton>
                )}

                {secondary && (
                  <LinkButton href={secondary.href} variant="ghost" size="md">
                    {secondary.label}
                  </LinkButton>
                )}
              </div>
            )}
          </div>

          {children && <div className="relative">{children}</div>}
        </div>
      </div>

      <div className="container-x relative">
        <div className="luxury-divider" />
      </div>
    </section>
  );
}
