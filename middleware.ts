import { NextResponse, type NextRequest } from "next/server";

/**
 * Geolocation routing — matches the source-of-truth specification.
 *
 *  - U.S. visitors auto-redirect from geo-aware global routes to /us equivalents.
 *  - Non-U.S. visitors stay on global routes.
 *  - The `site_locale` cookie always wins over geolocation.
 *  - Bots/crawlers are never force-redirected (SEO safety).
 *  - /us/* paths are never redirected away from /us/.
 *  - Static assets, payment, admin/dashboard, API, and sitemap/robots are excluded.
 *  - All redirects are 307 (temporary) — never 301.
 *  - Query strings are preserved through redirects.
 */

const LOCALE_COOKIE = "site_locale";

const STATIC_FILE = /\.(?:avif|bmp|css|csv|gif|ico|jpeg|jpg|js|json|map|mp3|mp4|pdf|png|svg|txt|webp|woff|woff2|xml)$/i;

const BOT_UA = [
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "sogou",
  "exabot",
  "facebot",
  "facebookexternalhit",
  "ia_archiver",
  "semrushbot",
  "ahrefsbot",
  "mj12bot",
  "dotbot",
  "petalbot",
];

const EXACT_GEO_AWARE_PATHS = new Set<string>([
  "/",
  "/pricing",
  "/services",
  "/about-us",
  "/contact-us",
  "/tools",
  "/privacy",
  "/refund-policy",
  "/terms-conditions",
  "/blogs",
  "/formllc-vs-alternatives",
]);

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
}

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_UA.some((bot) => ua.includes(bot));
}

function isExcludedPath(pathname: string): boolean {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/payment") ||
    pathname.startsWith("/paypal") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/Assets/") ||
    pathname.startsWith("/favicon_io/") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/sitemap-blogs.xml" ||
    pathname === "/BingSiteAuth.xml" ||
    STATIC_FILE.test(pathname)
  );
}

function isGeoAwarePath(pathname: string): boolean {
  const normalized = normalizePathname(pathname);
  if (EXACT_GEO_AWARE_PATHS.has(normalized)) return true;
  // Legacy .html blog detail URLs.
  if (/^\/blogs\/[^/]+\.html$/.test(normalized)) return true;
  // Clean /blogs/[slug] URLs — auto-routed for U.S. visitors per the
  // geolocation spec. Bots remain exempt (handled by isBot) so the
  // canonical/hreflang pair is preserved for crawlers.
  if (/^\/blogs\/[^/]+$/.test(normalized)) return true;
  return false;
}

function toUsPath(pathname: string): string {
  const normalized = normalizePathname(pathname);
  if (normalized === "/") return "/us";
  if (normalized === "/us" || normalized.startsWith("/us/")) return normalized;
  return `/us${normalized}`;
}

function getCountry(request: NextRequest): string {
  // request.geo is deprecated in newer Next.js but still populated on Vercel.
  // Falls back to the standard Vercel/Cloudflare headers.
  const geoCountry = (request as unknown as { geo?: { country?: string } }).geo?.country;
  return String(
    geoCountry ||
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      ""
  ).toUpperCase();
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = normalizePathname(url.pathname);
  const userAgent = request.headers.get("user-agent") || "";

  // 1. Hard exclusions: never touch these
  if (isExcludedPath(pathname)) return NextResponse.next();

  // 2. Already on /us/* → never redirect away
  if (pathname === "/us" || pathname.startsWith("/us/")) return NextResponse.next();

  // 3. Not a geo-aware route → leave alone
  if (!isGeoAwarePath(pathname)) return NextResponse.next();

  // 4. Bots / crawlers → never force-redirect (SEO safety)
  if (isBot(userAgent)) return NextResponse.next();

  // 5. Manual cookie override always wins
  const preferredLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (preferredLocale === "global") return NextResponse.next();

  // 6. Decide based on cookie or geolocation
  const country = getCountry(request);
  const shouldUseUS = preferredLocale === "us" || country === "US";
  if (!shouldUseUS) return NextResponse.next();

  // 7. Redirect to /us/* equivalent, preserving query strings
  url.pathname = toUsPath(pathname);
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: [
    /*
     * Skip all internal paths (_next, api, common static asset names) at the
     * matcher level so middleware doesn't even fire for them. Everything else
     * runs through the function above where finer-grained exclusions apply.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemap-blogs.xml|Assets|favicon_io|BingSiteAuth.xml).*)",
  ],
};
