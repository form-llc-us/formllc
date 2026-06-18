import path from "node:path";
import fs from "node:fs";
import {
  getBlogBySlug,
  isBlogDbAvailable,
  listBlogs,
  listPublishedSlugs,
  type BlogRow,
} from "./blog-db";

export type BlogIndexEntry = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  category: string;
  state?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  image?: string;
  canonical?: string;
};

export type BlogHeading = { id: string; text: string; level: number };

export type BlogPost = BlogIndexEntry & {
  bodyHtml: string;
  headings: BlogHeading[];
};

const DATA_DIR = path.join(process.cwd(), "data", "blogs");
const INDEX_FILE = path.join(process.cwd(), "data", "blogs.json");

let cachedIndex: BlogIndexEntry[] | null = null;

// ---------------------------------------------------------------------------
// JSON fallback (unchanged behaviour) — keeps the site rendering even when
// the DB is unreachable or the table is empty during migration.
// ---------------------------------------------------------------------------

export function getAllBlogs(): BlogIndexEntry[] {
  if (cachedIndex) return cachedIndex;
  if (!fs.existsSync(INDEX_FILE)) {
    cachedIndex = [];
    return cachedIndex;
  }
  const raw = fs.readFileSync(INDEX_FILE, "utf8");
  cachedIndex = JSON.parse(raw) as BlogIndexEntry[];
  return cachedIndex;
}

export function getBlog(slug: string): BlogPost | null {
  const file = path.join(DATA_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw) as BlogPost;
}

export function getBlogSlugs(): string[] {
  return getAllBlogs().map((b) => b.slug);
}

export function getRelatedBlogs(currentSlug: string, limit = 6): BlogIndexEntry[] {
  const all = getAllBlogs();
  const current = all.find((b) => b.slug === currentSlug);
  if (!current) return all.slice(0, limit);
  const sameCategory = all.filter((b) => b.slug !== currentSlug && b.category === current.category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = all.filter((b) => b.slug !== currentSlug && b.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function categorize(slug: string): { category: string; state?: string } {
  if (slug.includes("foreign-llc")) return { category: "Foreign LLC", state: extractState(slug) };
  if (slug.includes("annual-report") || slug.includes("biennial-report") || slug.includes("annual-registration"))
    return { category: "Annual Report", state: extractState(slug) };
  if (slug.includes("franchise-tax") || slug.includes("franchise-tax-report"))
    return { category: "Franchise Tax", state: extractState(slug) };
  if (slug.includes("how-to-close") || slug.includes("dissolve"))
    return { category: "Dissolution", state: extractState(slug) };
  if (slug.includes("state-tax-filing") || slug.includes("state-income-tax-filing") || slug.includes("tax-filing"))
    return { category: "State Tax Filing", state: extractState(slug) };
  if (slug.includes("llc-registration"))
    return { category: "LLC Registration", state: extractState(slug) };
  if (slug.includes("us-tax-filing"))
    return { category: "U.S. Tax Filing" };
  return { category: "Guides" };
}

function extractState(slug: string): string | undefined {
  const knownSuffixes = [
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
  for (const sfx of knownSuffixes) {
    const idx = slug.indexOf(sfx);
    if (idx > 0) {
      return slug
        .slice(0, idx)
        .split("-")
        .map((w) => (w.length <= 2 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
        .join(" ");
    }
  }
  const m = slug.match(/in-([a-z-]+)$/);
  if (m) {
    return m[1]
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Heading extraction (used by DB-backed reads where we no longer pre-compute).
// ---------------------------------------------------------------------------

const HEADING_RE = /<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>/gi;
const ID_RE = /id\s*=\s*"([^"]+)"/i;

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function extractHeadings(html: string): BlogHeading[] {
  const headings: BlogHeading[] = [];
  if (!html) return headings;
  let match: RegExpExecArray | null;
  while ((match = HEADING_RE.exec(html)) !== null) {
    const level = Number(match[1]);
    const attrs = match[2] ?? "";
    const inner = match[3] ?? "";
    const text = inner.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (!text) continue;
    const idMatch = ID_RE.exec(attrs);
    const id = idMatch?.[1] ?? slugifyHeading(text) ?? `h-${headings.length}`;
    headings.push({ id, text, level });
  }
  return headings;
}

// ---------------------------------------------------------------------------
// DB-first async readers. Public pages should prefer these. They fall back
// to the JSON store while the migration is in progress.
// ---------------------------------------------------------------------------

function rowToIndexEntry(row: BlogRow): BlogIndexEntry {
  const cat = categorize(row.slug);
  const tags = Array.isArray(row.tags) ? (row.tags as string[]) : [];
  const authorTag = tags.find((t) => typeof t === "string" && t.startsWith("author:"));
  const stateTag = tags.find((t) => typeof t === "string" && t.startsWith("state:"));
  return {
    slug: row.slug,
    title: row.title,
    metaTitle: row.meta_title ?? undefined,
    description: row.excerpt ?? row.meta_description ?? "",
    category: row.category ?? cat.category,
    state: stateTag ? stateTag.slice("state:".length) : cat.state,
    publishedAt: row.published_at ? new Date(row.published_at).toISOString() : undefined,
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : undefined,
    author: authorTag ? authorTag.slice("author:".length) : undefined,
    image: row.featured_image ?? undefined,
    canonical: row.canonical_url ?? undefined,
  };
}

function rowToPost(row: BlogRow): BlogPost {
  const base = rowToIndexEntry(row);
  const bodyHtml =
    row.content_type === "markdown" ? markdownToHtml(row.content) : row.content;
  return {
    ...base,
    bodyHtml,
    headings: extractHeadings(bodyHtml),
  };
}

// Minimal markdown→HTML for admin-authored posts. Existing JSON content is
// already HTML; this only runs when a row explicitly uses content_type='markdown'.
function markdownToHtml(md: string): string {
  if (!md) return "";
  const escaped = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  let html = escaped;
  // Code fences
  html = html.replace(/```([\s\S]*?)```/g, (_m, code) => `<pre><code>${code}</code></pre>`);
  // Headings
  html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");
  // Bold / italic / inline code
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Links and images
  html = html.replace(/!\[([^\]]*)]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');
  html = html.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // Lists
  html = html.replace(/^(?:- (.+)(?:\n|$))+?/gm, (block) => {
    const items = block
      .trim()
      .split(/\n/)
      .map((l) => l.replace(/^- /, "").trim())
      .filter(Boolean)
      .map((t) => `<li>${t}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  });
  // Paragraphs (blank-line separated, untouched blocks left alone)
  html = html
    .split(/\n{2,}/)
    .map((block) => {
      if (/^\s*<(h\d|ul|ol|pre|blockquote|table|p|figure|div|section)/i.test(block)) return block;
      return `<p>${block.trim().replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");
  return html;
}

export async function getAllBlogsAsync(region: "global" | "us"): Promise<BlogIndexEntry[]> {
  if (isBlogDbAvailable()) {
    try {
      const rows = await listBlogs({
        publicOnly: true,
        publicRegion: region,
        limit: 1000,
      });
      const dbEntries = rows.map(rowToIndexEntry);
      // Merge JSON entries for slugs that aren't yet in the DB. Drafts and
      // wrong-region rows are filtered out; legacy rows stay available until
      // imported.
      const dbSlugs = new Set(dbEntries.map((e) => e.slug));
      const jsonEntries = getAllBlogs().filter((e) => !dbSlugs.has(e.slug));
      return [...dbEntries, ...jsonEntries];
    } catch (err) {
      console.warn("[blog] DB read failed, falling back to JSON:", (err as Error).message);
    }
  }
  return getAllBlogs();
}

export async function getBlogAsync(
  slug: string,
  region: "global" | "us",
): Promise<BlogPost | null> {
  if (isBlogDbAvailable()) {
    try {
      const row = await getBlogBySlug(slug, { publicOnly: true, publicRegion: region });
      if (row) return rowToPost(row);
    } catch (err) {
      console.warn("[blog] DB getBlog failed, falling back to JSON:", (err as Error).message);
    }
  }
  const json = getBlog(slug);
  if (!json) return null;
  // Hydrate JSON entries with their index metadata (state, author, etc.)
  const meta = getAllBlogs().find((b) => b.slug === slug);
  return meta ? { ...meta, ...json } : json;
}

export async function getBlogSlugsAsync(region: "global" | "us"): Promise<string[]> {
  const slugs = new Set<string>();
  if (isBlogDbAvailable()) {
    try {
      for (const s of await listPublishedSlugs(region)) slugs.add(s);
    } catch (err) {
      console.warn("[blog] DB slugs failed, falling back to JSON:", (err as Error).message);
    }
  }
  for (const s of getBlogSlugs()) slugs.add(s);
  return [...slugs];
}

export async function getRelatedBlogsAsync(
  currentSlug: string,
  region: "global" | "us",
  limit = 3,
): Promise<BlogIndexEntry[]> {
  const all = await getAllBlogsAsync(region);
  const current = all.find((b) => b.slug === currentSlug);
  if (!current) return all.slice(0, limit);
  const sameCategory = all.filter((b) => b.slug !== currentSlug && b.category === current.category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = all.filter((b) => b.slug !== currentSlug && b.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}
