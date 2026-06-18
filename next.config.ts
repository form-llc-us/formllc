import type { NextConfig } from "next";

/**
 * Per source-of-truth:
 *  - Geolocation routing is handled by middleware.ts (307 only).
 *  - The redirects below are *legacy URL canonicalization*, NOT geolocation.
 *    They use 301 because they are permanent SEO-preservation redirects
 *    (no country/cookie context). 301 is fine here — the prohibition on 301
 *    is specific to geo-routing per §0.3 / §1.1.
 *  - Both /blogs/[slug].html (global) and /us/blogs/[slug].html (US) are
 *    preserved as redirect destinations so middleware can geo-route the
 *    .html form without breaking the chain.
 *  - Payment / paypal pages are excluded from middleware geo-routing
 *    (see middleware.ts), so legacy .html payment URLs resolve to the
 *    canonical payment-focused clean URL.
 */
const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "formllc.us" },
      { protocol: "https", hostname: "www.formllc.us" },
    ],
  },

  async redirects() {
    return [
      // -----------------------------------------------------------------
      // Legacy index.{html,php} → canonical homepages.
      // These MUST come before the generic ".php → strip" rule below,
      // otherwise /index.php would be rewritten to /index (404).
      // -----------------------------------------------------------------
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/us/index.html", destination: "/us", permanent: true },
      { source: "/us/index.php", destination: "/us", permanent: true },

      // -----------------------------------------------------------------
      // Legacy .php → clean (permanent canonicalization)
      // -----------------------------------------------------------------
      { source: "/:path*.php", destination: "/:path*", permanent: true },

      // -----------------------------------------------------------------
      // Legacy comparison .html → clean URL
      // -----------------------------------------------------------------
      { source: "/formllc-vs-atlas.html", destination: "/formllc-vs-atlas", permanent: true },
      { source: "/formllc-vs-bizee.html", destination: "/formllc-vs-bizee", permanent: true },
      { source: "/formllc-vs-doola.html", destination: "/formllc-vs-doola", permanent: true },
      { source: "/formllc-vs-zenbusiness.html", destination: "/formllc-vs-zenbusiness", permanent: true },

      // -----------------------------------------------------------------
      // Misc legacy .html → clean URL
      // -----------------------------------------------------------------
      { source: "/thank-you.html", destination: "/thank-you", permanent: true },
      { source: "/us/thank-you.html", destination: "/us/thank-you", permanent: true },
      { source: "/us-tax-filing-intake.html", destination: "/us-tax-filing-intake", permanent: true },
      { source: "/us/onboarding.html", destination: "/us/onboarding", permanent: true },

      // -----------------------------------------------------------------
      // Legacy paypal payment-XX.html -> canonical payment page.
      // -----------------------------------------------------------------
      { source: "/paypal/payment-:amount.html", destination: "/paypal/payment-:amount", permanent: true },
      { source: "/paypal/index.html", destination: "/paypal", permanent: true },

      // -----------------------------------------------------------------
      // Blog .html → clean URL (both global and /us regional pair).
      // Middleware sees the .html form as geo-aware and redirects U.S.
      // visitors with no `site_locale=global` cookie to /us/blogs/[slug].html
      // FIRST; this redirect then strips the .html on either side.
      // -----------------------------------------------------------------
      { source: "/blogs/:slug.html", destination: "/blogs/:slug", permanent: true },
      { source: "/us/blogs/:slug.html", destination: "/us/blogs/:slug", permanent: true },

      // -----------------------------------------------------------------
      // Trailing slash stripping (single canonical form).
      // -----------------------------------------------------------------
      { source: "/:path+/", destination: "/:path+", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default config;
