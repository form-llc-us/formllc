#!/usr/bin/env node
/**
 * Parses every legacy blog HTML file and emits:
 *   - data/blogs.json                  (index entries: slug, title, description, category, image, etc.)
 *   - data/blogs/<slug>.json           (full post: index entry + bodyHtml + headings)
 *
 * The legacy folder must be at SOURCE_DIR. Override with FORMLLC_SOURCE env var.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";
import * as cheerio from "cheerio";

const SOURCE_DIR =
  process.env.FORMLLC_SOURCE ??
  path.resolve(process.cwd(), "..", "formllc-us", "blogs");

const OUT_DIR = path.resolve(process.cwd(), "data");
const POSTS_DIR = path.join(OUT_DIR, "blogs");
const INDEX_FILE = path.join(OUT_DIR, "blogs.json");

const SKIP_FILES = new Set([
  "generate-sitemap.php",
  "index.php",
  "index.html",
  "styles",
]);

const STRIP_SELECTORS = [
  "script",
  "noscript",
  "style",
  "header",
  "footer",
  ".site-header",
  ".site-footer",
  ".mmenu",
  ".nav",
  ".breadcrumb",
  "#mmenu",
  "[class*='gtm-']",
];

function categorize(slug) {
  if (slug.includes("foreign-llc")) return { category: "Foreign LLC", state: extractState(slug) };
  if (slug.includes("annual-report") || slug.includes("biennial-report") || slug.includes("annual-registration"))
    return { category: "Annual Report", state: extractState(slug) };
  if (slug.includes("franchise-tax")) return { category: "Franchise Tax", state: extractState(slug) };
  if (slug.includes("how-to-close") || slug.includes("dissolve"))
    return { category: "Dissolution", state: extractState(slug) };
  if (slug.includes("state-tax-filing") || slug.includes("state-income-tax-filing") || slug.includes("tax-filing"))
    return { category: "State Tax Filing", state: extractState(slug) };
  if (slug.includes("llc-registration")) return { category: "LLC Registration", state: extractState(slug) };
  if (slug.includes("us-tax-filing")) return { category: "U.S. Tax Filing" };
  return { category: "Guides" };
}

function extractState(slug) {
  const known = [
    "-llc-registration",
    "-foreign-llc-registration",
    "-llc-annual-report",
    "-llc-biennial-report",
    "-llc-annual-registration",
    "-llc-annual-registration-fee",
    "-llc-franchise-tax",
    "-state-tax-filing",
    "-state-income-tax-filing",
    "-tax-filing",
    "-franchise-tax-report",
  ];
  for (const sfx of known) {
    const idx = slug.indexOf(sfx);
    if (idx > 0) {
      return slug.slice(0, idx).split("-").map((w) => (w.length <= 2 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1))).join(" ");
    }
  }
  const m = slug.match(/in-([a-z-]+)$/);
  if (m) return m[1].split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
  return undefined;
}

function rewriteAssetUrls(html) {
  return html
    .replace(/(["'])(?:\.{1,2}\/)?Assets\//g, '$1/Assets/')
    .replace(/(["'])\/Assets\//g, '$1/Assets/')
    .replace(/(["'])\/blogs\/([^"']+?)\.html/g, "$1/blogs/$2")
    .replace(/(["'])\/index\.html\b/g, '$1/')
    .replace(/(["'])\/(about-us|services|pricing|contact-us|tools|privacy|terms-conditions|refund-policy|formllc-vs-[a-z]+)\.html\b/g, "$1/$2");
}

async function parseFile(filePath, slug) {
  const raw = await fs.readFile(filePath, "utf8");
  const $ = cheerio.load(raw);

  const title =
    $('meta[property="og:title"]').attr("content") ||
    $("title").first().text().trim() ||
    slug;

  const description =
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    "";

  const canonical = $('link[rel="canonical"]').attr("href") || "";
  const ogImage = $('meta[property="og:image"]').attr("content") || "";
  const author = $('meta[name="author"]').attr("content") || "FormLLC";

  // Try to find an existing image referenced in the page that maps to /Assets/
  let image = ogImage;
  if (!image) {
    const found = $('link[rel="preload"][as="image"]').attr("href") || $("img").first().attr("src") || "";
    image = found;
  }
  if (image && image.includes("/Assets/")) {
    image = image.replace(/^https?:\/\/[^/]+/, "");
  }

  // Extract body content — prefer <main>, fall back to .page-wrapper, fall back to <body>
  let $content = $("main").first();
  if ($content.length === 0) $content = $(".page-wrapper").first();
  if ($content.length === 0) $content = $("body").first();

  // Strip noisy elements
  for (const sel of STRIP_SELECTORS) {
    $content.find(sel).remove();
  }
  // Drop common decorative classes inserted by the legacy theme
  $content.find('[class*="newsletter"]').remove();
  $content.find('[class*="pramotional"]').remove();
  $content.find("a:contains('Consult Now')").closest(".cta-band, .promo, .actions").remove();

  // Collect headings for TOC
  const headings = [];
  $content.find("h1, h2, h3").each((_, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    if (!text) return;
    let id = $el.attr("id");
    if (!id) {
      id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 80);
      $el.attr("id", id);
    }
    headings.push({ id, text, level: Number(el.tagName.slice(1)) });
  });

  // Drop any inline event handlers and inline styles
  $content.find("*").each((_, el) => {
    const e = $(el);
    const attribs = el.attribs || {};
    for (const a of Object.keys(attribs)) {
      if (a.startsWith("on")) e.removeAttr(a);
      if (a === "style") e.removeAttr(a);
    }
  });

  let bodyHtml = $content.html() ?? "";
  bodyHtml = rewriteAssetUrls(bodyHtml);

  const { category, state } = categorize(slug);

  return {
    slug,
    title: title.replace(/\s*\|\s*FormLLC.*$/i, "").trim(),
    metaTitle: title.trim(),
    description,
    canonical: canonical || undefined,
    category,
    state,
    image: image || undefined,
    author,
    bodyHtml,
    headings,
  };
}

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    console.warn(`[blogs] Source dir not found: ${SOURCE_DIR}. Skipping blog build.`);
    await fs.mkdir(OUT_DIR, { recursive: true });
    if (!existsSync(INDEX_FILE)) await fs.writeFile(INDEX_FILE, "[]");
    return;
  }
  await fs.mkdir(POSTS_DIR, { recursive: true });

  const entries = await fs.readdir(SOURCE_DIR);
  const index = [];
  let count = 0;
  let failed = 0;

  for (const entry of entries) {
    if (SKIP_FILES.has(entry)) continue;
    if (!entry.endsWith(".html")) continue;

    const slug = entry.replace(/\.html$/, "");
    const file = path.join(SOURCE_DIR, entry);
    try {
      const post = await parseFile(file, slug);
      const indexEntry = {
        slug: post.slug,
        title: post.title,
        metaTitle: post.metaTitle,
        description: post.description,
        category: post.category,
        state: post.state,
        author: post.author,
        image: post.image,
        canonical: post.canonical,
      };
      index.push(indexEntry);
      await fs.writeFile(path.join(POSTS_DIR, `${slug}.json`), JSON.stringify(post));
      count++;
    } catch (e) {
      failed++;
      console.error(`[blogs] failed to parse ${entry}:`, e.message);
    }
  }

  index.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  await fs.writeFile(INDEX_FILE, JSON.stringify(index, null, 2));
  console.log(`[blogs] processed ${count} posts (${failed} failed). Index: ${INDEX_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
