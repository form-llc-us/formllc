import type { MetadataRoute } from "next";
import { SITE } from "@data/site";
import { getBlogSlugsAsync } from "@/lib/blog";

const STATIC_ROUTES = [
  // Global
  "/", "/about-us", "/services", "/pricing", "/contact-us", "/tools",
  "/privacy", "/terms-conditions", "/refund-policy",
  "/formllc-vs-doola", "/formllc-vs-bizee", "/formllc-vs-atlas",
  "/formllc-vs-zenbusiness", "/formllc-vs-alternatives",
  "/blogs", "/tax-intake", "/us-tax-filing-intake",
  // US
  "/us", "/us/about-us", "/us/services", "/us/pricing", "/us/contact-us", "/us/tools",
  "/us/privacy", "/us/terms-conditions", "/us/refund-policy",
  "/us/formllc-vs-alternatives", "/us/blogs", "/us/onboarding",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" || path === "/us" ? 1.0 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));

  const globalSlugs = await getBlogSlugsAsync("global");
  const usSlugs = await getBlogSlugsAsync("us");
  const globalSet = new Set(globalSlugs);
  // Only US-region-exclusive slugs need a /us/blogs/* entry — global/both rows
  // are covered by the canonical /blogs/{slug} URL with hreflang alternates.
  const usOnly = usSlugs.filter((s) => !globalSet.has(s));

  const blogEntries: MetadataRoute.Sitemap = [
    ...globalSlugs.map((slug) => ({
      url: `${SITE.url}/blogs/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...usOnly.map((slug) => ({
      url: `${SITE.url}/us/blogs/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticEntries, ...blogEntries];
}
