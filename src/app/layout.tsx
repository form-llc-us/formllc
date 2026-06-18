import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import { SITE } from "@data/site";
import RegionToggle from "@/components/site/RegionToggle";
import OfferPopup from "@/components/site/OfferPopup";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

/**
 * Organization + WebSite JSON-LD published once on every page.
 * Per source-of-truth §0.3, every indexable public page must include these.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: SITE.legal.company,
  url: SITE.url,
  email: SITE.email,
  logo: `${SITE.url}/Assets/Logoo.webp`,
  sameAs: [SITE.socials.twitter, SITE.socials.linkedin].filter(Boolean),
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: SITE.email,
      contactType: "customer support",
      areaServed: "Worldwide",
      availableLanguage: ["en"],
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/blogs?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f2864",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Register Your LLC or C-Corp in Any U.S. State`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} — Register Your LLC or C-Corp in Any U.S. State`,
    description: SITE.description,
    images: [{ url: "/Assets/og-cover.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Register Your LLC or C-Corp`,
    description: SITE.description,
    images: ["/Assets/og-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
    shortcut: "/favicon_io/favicon.ico",
  },
  manifest: "/favicon_io/site.webmanifest",
  verification: {
    other: { "msvalidate.01": "BCB0DB4F344D8A855958F8C1F8002699" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>
        {/* Skip link for keyboard users — keeps floating UI from
            being the first reachable interactive element on every page. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[10000] focus:rounded-full focus:bg-ink-900 focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
        >
          Skip to main content
        </a>

        {children}

        {/* Global offer popup — replaces the old static promotional top bar.
            Wrapped in <Suspense> because it uses pathname/search client hooks. */}
        <Suspense fallback={null}>
          <OfferPopup />
        </Suspense>

        {/* Floating region switcher — fixed bottom-left site-wide.
            Hidden internally on /admin, /dashboard, /checkout, /payment,
            /paypal, /api per source-of-truth §2.1.
            Wrapped in <Suspense> because it uses useSearchParams() and the
            rest of the page should not opt out of static generation. */}
        <Suspense fallback={null}>
          <RegionToggle />
        </Suspense>

        {/* Global Organization + WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
