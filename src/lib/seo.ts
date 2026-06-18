import type { Metadata } from "next";
import { SITE } from "@data/site";

/**
 * Build canonical + hreflang alternates for a paired regional route.
 * Per source-of-truth §3:
 *   - Global pages canonicalize to the global URL.
 *   - U.S. pages canonicalize to the /us URL.
 *   - hreflang: x-default + en → global; en-US → /us.
 *
 * `path` is the path on the current region without the /us prefix
 *  (e.g. "/pricing" or "/" for the homepage).
 */
export function regionalAlternates(
  region: "global" | "us",
  path: string
): NonNullable<Metadata["alternates"]> {
  const cleanPath = path === "/" ? "" : path;
  const globalUrl = `${SITE.url}${cleanPath || "/"}`;
  const usUrl = `${SITE.url}/us${cleanPath}`;

  return {
    canonical: region === "us" ? `/us${cleanPath || ""}` || "/us" : cleanPath || "/",
    languages: {
      "x-default": globalUrl,
      en: globalUrl,
      "en-US": usUrl,
    },
  };
}

/**
 * Single-region (no regional pair) — only canonical, no hreflang languages.
 * Used for /formllc-vs-{atlas,bizee,doola,zenbusiness} (global-only),
 * /paypal/*, /us-tax-filing-intake, etc.
 */
export function canonicalOnly(path: string): NonNullable<Metadata["alternates"]> {
  return { canonical: path };
}
