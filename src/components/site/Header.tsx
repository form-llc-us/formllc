"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Region } from "@data/site";
import { getNav } from "@data/nav";
import { LinkButton } from "@/components/ui/Button";
import { SITE } from "@data/site";

export default function Header({ region = "global" }: { region?: Region }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const items = getNav(region);

  function isActiveHref(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/us") return pathname === "/us";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "nav-premium shadow-[0_18px_48px_rgba(0,0,0,0.32)]"
          : "nav-premium"
      }`}
    >
      <div className="container-x grid h-[68px] grid-cols-[auto_1fr_auto] items-center gap-3 md:h-[72px] lg:gap-4">
        {/* Logo */}
        <div className="flex min-w-0 items-center justify-start">
          <Link
            href={region === "us" ? "/us" : "/"}
            className="inline-flex shrink-0 items-center whitespace-nowrap font-display text-[1.68rem] font-extrabold leading-none tracking-[-0.035em] md:text-[1.82rem]"
            aria-label="FormLLC"
            onClick={() => setOpen(false)}
          >
            <span className="text-cream-50">Form</span>
            <span className="text-[#ff4d5a]">LLC</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden min-w-0 items-center justify-center gap-0 lg:flex"
          aria-label="Primary"
        >
          {items.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="group relative flex items-center justify-center"
              >
                <button
                  type="button"
                  className="nav-link inline-flex h-10 items-center justify-center gap-1 whitespace-nowrap px-2.5 text-center text-[0.94rem] font-semibold leading-none"
                >
                  <span>{item.label}</span>

                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-[1px] transition-transform duration-200 group-hover:rotate-180"
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div className="invisible absolute left-1/2 top-full z-50 w-max -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="min-w-[248px] rounded-2xl border border-white/10 bg-[#0e1535] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`block rounded-xl px-4 py-2.5 text-left text-sm font-semibold leading-5 transition hover:bg-crimson-600/12 hover:text-cream-50 ${isActiveHref(c.href) ? "bg-crimson-600/12 text-cream-50" : "text-cream-100/75"}`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link inline-flex h-10 items-center justify-center whitespace-nowrap px-2.5 text-center text-[0.94rem] font-semibold leading-none ${isActiveHref(item.href) ? "nav-link-active" : ""}`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop Actions + Mobile Toggle */}
        <div className="flex shrink-0 items-center justify-end gap-2.5">
          <div className="hidden items-center justify-center gap-2.5 md:flex">
            <LinkButton
              href={SITE.account}
              variant="ghost"
              size="md"
              className="hidden min-w-[92px] justify-center text-center lg:inline-flex"
            >
              Account
            </LinkButton>

            <LinkButton
              href={SITE.calendly}
              variant="primary"
              size="md"
              className="min-w-[124px] justify-center text-center"
            >
              Consult Now
            </LinkButton>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 text-cream-50 transition hover:border-crimson-300 hover:bg-white/5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            ) : (
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-white/10 bg-[#0c1a3e] lg:hidden">
          <nav
            className="container-x flex flex-col items-stretch gap-2 py-5"
            aria-label="Mobile"
          >
            {items.map((item) =>
              item.children ? (
                <details
                  key={item.label}
                  className="group rounded-2xl border border-crimson-500/10 bg-white/[0.03] px-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3.5 text-base font-semibold text-cream-50">
                    <span>{item.label}</span>

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-200 group-open:rotate-180"
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>

                  <div className="flex flex-col gap-1 border-t border-crimson-500/10 pb-3 pt-2">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className={`rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-white/[0.04] hover:text-cream-50 ${isActiveHref(c.href) ? "bg-crimson-600/12 text-cream-50" : "text-cream-100/70"}`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl border px-4 py-3.5 text-base font-semibold text-cream-50 transition hover:bg-white/[0.05] ${isActiveHref(item.href) ? "border-crimson-500/30 bg-crimson-600/12" : "border-crimson-500/10 bg-white/[0.03]"}`}
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2">
              <LinkButton
                href={SITE.account}
                variant="ghost"
                size="md"
                className="w-full justify-center text-center"
              >
                Account
              </LinkButton>

              <LinkButton
                href={SITE.calendly}
                variant="primary"
                size="md"
                className="w-full justify-center text-center"
              >
                Consult Now
              </LinkButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
