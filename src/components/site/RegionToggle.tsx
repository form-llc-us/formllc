"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * RegionToggle — fixed bottom-left site-wide region switcher.
 *
 * Implements the spec verbatim:
 *  - Client component (uses usePathname / useRouter / useSearchParams).
 *  - Checked state derived from current pathname (`/us` or `/us/*` ⇒ checked).
 *  - On toggle, sets `site_locale` cookie + localStorage and navigates to the
 *    equivalent regional path, preserving query strings.
 *  - Hidden on excluded paths: /admin, /dashboard, /checkout, /payment,
 *    /paypal, /api.
 *  - Visual + CSS rules in globals.css under .locale-sticky / .locale-toggle.
 */

const LOCALE_COOKIE = "site_locale";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const HIDDEN_PREFIXES = [
  "/admin",
  "/dashboard",
  "/checkout",
  "/payment",
  "/paypal",
  "/api",
] as const;

function shouldHide(pathname: string): boolean {
  return HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isUSPath(pathname: string): boolean {
  return pathname === "/us" || pathname.startsWith("/us/");
}

function toUS(pathname: string): string {
  if (isUSPath(pathname)) return pathname;
  if (pathname === "/" || pathname === "") return "/us";
  return `/us${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

function toGlobal(pathname: string): string {
  if (!isUSPath(pathname)) return pathname || "/";
  if (pathname === "/us") return "/";
  // strip "/us" prefix
  const stripped = pathname.slice(3);
  return stripped.length > 0 ? stripped : "/";
}

function persistLocale(value: "global" | "us"): void {
  if (typeof document !== "undefined") {
    document.cookie = `${LOCALE_COOKIE}=${value}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
  }
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(LOCALE_COOKIE, value);
    } catch {
      /* localStorage may be blocked — cookie is the source of truth */
    }
  }
}

export default function RegionToggle() {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();

  // Avoid SSR/CSR mismatch — render-once-mounted to keep the toggle hydration-safe.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isUS = useMemo(() => isUSPath(pathname), [pathname]);
  const hidden = useMemo(() => shouldHide(pathname), [pathname]);

  const handleToggle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const wantsUS = event.target.checked;
      const target = wantsUS ? "us" : "global";
      persistLocale(target);

      const nextPath = wantsUS ? toUS(pathname) : toGlobal(pathname);
      const qs = searchParams?.toString() ?? "";
      const href = qs ? `${nextPath}?${qs}` : nextPath;
      router.push(href);
    },
    [pathname, router, searchParams]
  );

  if (hidden) return null;
  if (!mounted) return null;

  return (
    <div className="locale-sticky" data-region={isUS ? "us" : "global"}>
      <label className="locale-toggle" aria-label="Switch site region">
        <input
          type="checkbox"
          checked={isUS}
          onChange={handleToggle}
        />
        <span className="track">
          <span className="text global">Global</span>
          <span className="text us">U.S.</span>
          <span className="thumb" />
        </span>
      </label>
    </div>
  );
}
