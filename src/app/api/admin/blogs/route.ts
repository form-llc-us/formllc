import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import {
  createBlog,
  listBlogs,
  slugExists,
  type BlogInput,
} from "@/lib/blog-db";
import { ensureUniqueSlug, isValidSlug, slugify } from "@/lib/slug";
import { plainTextFromContent, readingMinutes, scoreSeo } from "@/lib/seo-score";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RegionEnum = z.enum(["global", "us", "both"]);
const StatusEnum = z.enum(["draft", "published"]);
const ContentTypeEnum = z.enum(["html", "markdown"]);

const BlogPayload = z.object({
  title: z.string().min(2).max(255),
  slug: z.string().max(200).optional().default(""),
  excerpt: z.string().max(2000).nullable().optional(),
  content: z.string().min(1),
  content_type: ContentTypeEnum.optional().default("html"),
  featured_image: z.string().max(500).nullable().optional(),
  image_alt: z.string().max(255).nullable().optional(),
  meta_title: z.string().max(255).nullable().optional(),
  meta_description: z.string().max(320).nullable().optional(),
  canonical_url: z.string().max(500).nullable().optional(),
  category: z.string().max(120).nullable().optional(),
  tags: z.unknown().nullable().optional(),
  region: RegionEnum.optional().default("both"),
  status: StatusEnum.optional().default("draft"),
  published_at: z.string().nullable().optional(),
});

export async function GET(req: Request) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? undefined;
  const status = (url.searchParams.get("status") as "draft" | "published" | "all" | null) ?? "all";
  const region = (url.searchParams.get("region") as "global" | "us" | "both" | "all" | null) ?? "all";
  const limit = Number(url.searchParams.get("limit") ?? 200);
  const offset = Number(url.searchParams.get("offset") ?? 0);

  const rows = await listBlogs({ q, status, region, limit, offset });
  return Response.json({ data: rows });
}

export async function POST(req: Request) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = BlogPayload.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Slug: generate from title if missing; ensure uniqueness; reject if invalid.
  let slug = data.slug?.trim() ? slugify(data.slug) : slugify(data.title);
  if (!isValidSlug(slug)) {
    return Response.json({ error: "Invalid slug" }, { status: 400 });
  }
  if (await slugExists(slug)) {
    // Build a unique variant by suffixing -2, -3, …
    const probe = new Set<string>([slug]);
    let attempt = slug;
    let n = 2;
    while (await slugExists(attempt)) {
      attempt = `${slug}-${n}`;
      probe.add(attempt);
      n++;
      if (n > 50) break;
    }
    slug = ensureUniqueSlug(slug, probe);
  }

  const text = plainTextFromContent(data.content, data.content_type);
  const reading = readingMinutes(text);
  const seo = scoreSeo({
    title: data.title,
    slug,
    excerpt: data.excerpt ?? null,
    content: data.content,
    contentType: data.content_type,
    metaTitle: data.meta_title ?? null,
    metaDescription: data.meta_description ?? null,
    featuredImage: data.featured_image ?? null,
    imageAlt: data.image_alt ?? null,
  });

  const payload: BlogInput = {
    ...data,
    slug,
    reading_minutes: reading,
    seo_score: seo.score,
  };
  const row = await createBlog(payload);
  if (!row) {
    return Response.json({ error: "Database is not configured" }, { status: 503 });
  }
  return Response.json({ data: row }, { status: 201 });
}
