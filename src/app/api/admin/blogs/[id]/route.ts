import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import {
  deleteBlog,
  getBlogById,
  slugExists,
  updateBlog,
  type BlogInput,
} from "@/lib/blog-db";
import { isValidSlug, slugify } from "@/lib/slug";
import { plainTextFromContent, readingMinutes, scoreSeo } from "@/lib/seo-score";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RegionEnum = z.enum(["global", "us", "both"]);
const StatusEnum = z.enum(["draft", "published"]);
const ContentTypeEnum = z.enum(["html", "markdown"]);

const BlogPayload = z.object({
  title: z.string().min(2).max(255),
  slug: z.string().max(200),
  excerpt: z.string().max(2000).nullable().optional(),
  content: z.string().min(1),
  content_type: ContentTypeEnum,
  featured_image: z.string().max(500).nullable().optional(),
  image_alt: z.string().max(255).nullable().optional(),
  meta_title: z.string().max(255).nullable().optional(),
  meta_description: z.string().max(320).nullable().optional(),
  canonical_url: z.string().max(500).nullable().optional(),
  category: z.string().max(120).nullable().optional(),
  tags: z.unknown().nullable().optional(),
  region: RegionEnum,
  status: StatusEnum,
  published_at: z.string().nullable().optional(),
});

type Ctx = { params: Promise<{ id: string }> };

function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export async function GET(req: Request, { params }: Ctx) {
  const guard = requireAdmin(req);
  if (guard) return guard;
  const { id } = await params;
  const numId = parseId(id);
  if (!numId) return Response.json({ error: "Invalid id" }, { status: 400 });
  const row = await getBlogById(numId);
  if (!row) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ data: row });
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = requireAdmin(req);
  if (guard) return guard;
  const { id } = await params;
  const numId = parseId(id);
  if (!numId) return Response.json({ error: "Invalid id" }, { status: 400 });

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

  const existing = await getBlogById(numId);
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

  const slug = data.slug?.trim() ? slugify(data.slug) : slugify(data.title);
  if (!isValidSlug(slug)) {
    return Response.json({ error: "Invalid slug" }, { status: 400 });
  }
  if (slug !== existing.slug && (await slugExists(slug, numId))) {
    return Response.json({ error: "Slug already taken" }, { status: 409 });
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

  // Track previous slug for backward-compatible URLs.
  const old_slug = slug !== existing.slug ? existing.slug : existing.old_slug ?? null;

  const payload: BlogInput = {
    ...data,
    slug,
    reading_minutes: reading,
    seo_score: seo.score,
    old_slug,
  };
  const row = await updateBlog(numId, payload);
  if (!row) {
    return Response.json({ error: "Database is not configured" }, { status: 503 });
  }
  return Response.json({ data: row });
}

export async function DELETE(req: Request, { params }: Ctx) {
  const guard = requireAdmin(req);
  if (guard) return guard;
  const { id } = await params;
  const numId = parseId(id);
  if (!numId) return Response.json({ error: "Invalid id" }, { status: 400 });
  const ok = await deleteBlog(numId);
  if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ ok: true });
}
