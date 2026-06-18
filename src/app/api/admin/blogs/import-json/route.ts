import path from "node:path";
import fs from "node:fs";
import type { RowDataPacket } from "mysql2";
import { requireAdmin } from "@/lib/admin-auth";
import {
  createBlog,
  getBlogPool,
  slugExists,
  updateBlog,
  type BlogInput,
} from "@/lib/blog-db";
import { plainTextFromContent, readingMinutes, scoreSeo } from "@/lib/seo-score";
import { isValidSlug } from "@/lib/slug";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data", "blogs");
const INDEX_FILE = path.join(process.cwd(), "data", "blogs.json");

type LegacyIndexEntry = {
  slug: string;
  title: string;
  metaTitle?: string;
  description?: string;
  category?: string;
  state?: string;
  author?: string;
  image?: string;
  canonical?: string;
};

type LegacyPost = LegacyIndexEntry & {
  bodyHtml: string;
};

function readIndex(): LegacyIndexEntry[] {
  if (!fs.existsSync(INDEX_FILE)) return [];
  return JSON.parse(fs.readFileSync(INDEX_FILE, "utf8")) as LegacyIndexEntry[];
}

function readPost(slug: string): LegacyPost | null {
  const file = path.join(DATA_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as LegacyPost;
}

function buildTags(entry: LegacyIndexEntry): string[] {
  const tags: string[] = [];
  if (entry.author) tags.push(`author:${entry.author}`);
  if (entry.state) tags.push(`state:${entry.state}`);
  return tags;
}

export async function POST(req: Request) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  if (!getBlogPool()) {
    return Response.json({ error: "Database is not configured" }, { status: 503 });
  }

  let opts: { overwrite?: boolean; publish?: boolean; slugs?: string[] } = {};
  try {
    if (req.headers.get("content-type")?.includes("application/json")) {
      opts = (await req.json()) as typeof opts;
    }
  } catch {
    /* ignore — empty body is fine */
  }

  const overwrite = Boolean(opts.overwrite);
  const publish = opts.publish !== false; // default: publish all imports
  const filter = Array.isArray(opts.slugs) && opts.slugs.length ? new Set(opts.slugs) : null;

  const index = readIndex();
  const candidates = filter ? index.filter((e) => filter.has(e.slug)) : index;

  let created = 0;
  let updated = 0;
  let skipped = 0;
  const errors: { slug: string; error: string }[] = [];

  for (const entry of candidates) {
    try {
      if (!entry.slug || !isValidSlug(entry.slug)) {
        skipped++;
        errors.push({ slug: entry.slug ?? "?", error: "Invalid slug" });
        continue;
      }
      const post = readPost(entry.slug);
      if (!post) {
        skipped++;
        errors.push({ slug: entry.slug, error: "Body file missing" });
        continue;
      }

      const exists = await slugExists(entry.slug);
      if (exists && !overwrite) {
        skipped++;
        continue;
      }

      const tags = buildTags(entry);
      const text = plainTextFromContent(post.bodyHtml, "html");
      const reading = readingMinutes(text);
      const seo = scoreSeo({
        title: entry.title,
        slug: entry.slug,
        excerpt: entry.description ?? null,
        content: post.bodyHtml,
        contentType: "html",
        metaTitle: entry.metaTitle ?? null,
        metaDescription: entry.description ?? null,
        featuredImage: entry.image ?? null,
        imageAlt: entry.title,
      });

      const payload: BlogInput = {
        title: entry.title,
        slug: entry.slug,
        excerpt: entry.description ?? null,
        content: post.bodyHtml,
        content_type: "html",
        featured_image: entry.image ?? null,
        image_alt: entry.title,
        meta_title: entry.metaTitle ?? null,
        meta_description: entry.description ?? null,
        canonical_url: entry.canonical ?? null,
        category: entry.category ?? null,
        tags,
        region: "both",
        status: publish ? "published" : "draft",
        published_at: publish ? new Date().toISOString() : null,
        seo_score: seo.score,
        reading_minutes: reading,
        source_file: `data/blogs/${entry.slug}.json`,
      };

      if (exists && overwrite) {
        // Update existing by slug via id lookup
        const pool = getBlogPool();
        if (!pool) {
          skipped++;
          continue;
        }
        const [rows] = await pool.query<RowDataPacket[]>(
          "SELECT id FROM blogs WHERE slug = ? LIMIT 1",
          [entry.slug],
        );
        const id = rows[0]?.id as number | undefined;
        if (id) {
          await updateBlog(id, payload);
          updated++;
        } else {
          skipped++;
        }
      } else {
        await createBlog(payload);
        created++;
      }
    } catch (err) {
      errors.push({ slug: entry.slug, error: (err as Error).message });
      skipped++;
    }
  }

  return Response.json({
    ok: true,
    summary: { total: candidates.length, created, updated, skipped },
    errors,
  });
}
