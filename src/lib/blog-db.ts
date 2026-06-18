import "server-only";
import mysql from "mysql2/promise";
import { env, logMissing } from "./env";

export type BlogRegion = "global" | "us" | "both";
export type BlogStatus = "draft" | "published";
export type BlogContentType = "html" | "markdown";

export type BlogRow = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  content_type: BlogContentType;
  featured_image: string | null;
  image_alt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  category: string | null;
  tags: unknown | null;
  region: BlogRegion;
  status: BlogStatus;
  published_at: Date | string | null;
  seo_score: number | null;
  reading_minutes: number | null;
  old_slug: string | null;
  source_file: string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

export type BlogInput = {
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  content_type?: BlogContentType;
  featured_image?: string | null;
  image_alt?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  category?: string | null;
  tags?: unknown | null;
  region?: BlogRegion;
  status?: BlogStatus;
  published_at?: string | Date | null;
  seo_score?: number | null;
  reading_minutes?: number | null;
  old_slug?: string | null;
  source_file?: string | null;
};

let pool: mysql.Pool | null = null;

export function getBlogPool(): mysql.Pool | null {
  if (pool) return pool;
  if (!env.blogDb.name || !env.blogDb.user) {
    logMissing("blogDb", "MYSQL_DATABASE/MYSQL_USER (or DB_NAME/DB_USER)");
    return null;
  }
  pool = mysql.createPool({
    host: env.blogDb.host,
    port: env.blogDb.port,
    database: env.blogDb.name,
    user: env.blogDb.user,
    password: env.blogDb.pass,
    waitForConnections: true,
    connectionLimit: 5,
    charset: "utf8mb4",
    dateStrings: false,
    timezone: "Z",
  });
  return pool;
}

export function isBlogDbAvailable(): boolean {
  return Boolean(env.blogDb.name && env.blogDb.user);
}

function toJsonString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return null;
  }
}

function parseTags(value: unknown): unknown {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

function hydrate(row: mysql.RowDataPacket | BlogRow): BlogRow {
  const r = row as BlogRow & { tags: unknown };
  return { ...r, tags: parseTags(r.tags) };
}

export type ListFilters = {
  q?: string;
  status?: BlogStatus | "all";
  region?: BlogRegion | "all";
  limit?: number;
  offset?: number;
  publicOnly?: boolean;
  publicRegion?: "global" | "us";
};

export async function listBlogs(filters: ListFilters = {}): Promise<BlogRow[]> {
  const p = getBlogPool();
  if (!p) return [];
  const where: string[] = [];
  const params: unknown[] = [];

  if (filters.q) {
    where.push("(title LIKE ? OR slug LIKE ?)");
    const like = `%${filters.q}%`;
    params.push(like, like);
  }
  if (filters.status && filters.status !== "all") {
    where.push("status = ?");
    params.push(filters.status);
  }
  if (filters.region && filters.region !== "all") {
    where.push("region = ?");
    params.push(filters.region);
  }
  if (filters.publicOnly) {
    where.push("status = 'published'");
  }
  if (filters.publicRegion) {
    where.push("(region = ? OR region = 'both')");
    params.push(filters.publicRegion);
  }

  const limit = Math.min(Math.max(filters.limit ?? 200, 1), 1000);
  const offset = Math.max(filters.offset ?? 0, 0);

  const sql = `
    SELECT * FROM blogs
    ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY COALESCE(published_at, updated_at) DESC, id DESC
    LIMIT ? OFFSET ?
  `;
  params.push(limit, offset);
  const [rows] = await p.query<mysql.RowDataPacket[]>(sql, params);
  return rows.map(hydrate);
}

export async function getBlogById(id: number): Promise<BlogRow | null> {
  const p = getBlogPool();
  if (!p) return null;
  const [rows] = await p.query<mysql.RowDataPacket[]>(
    "SELECT * FROM blogs WHERE id = ? LIMIT 1",
    [id],
  );
  return rows[0] ? hydrate(rows[0]) : null;
}

export async function getBlogBySlug(
  slug: string,
  opts: { publicRegion?: "global" | "us"; publicOnly?: boolean } = {},
): Promise<BlogRow | null> {
  const p = getBlogPool();
  if (!p) return null;
  const where = ["(slug = ? OR old_slug = ?)"];
  const params: unknown[] = [slug, slug];
  if (opts.publicOnly) where.push("status = 'published'");
  if (opts.publicRegion) {
    where.push("(region = ? OR region = 'both')");
    params.push(opts.publicRegion);
  }
  const [rows] = await p.query<mysql.RowDataPacket[]>(
    `SELECT * FROM blogs WHERE ${where.join(" AND ")} LIMIT 1`,
    params,
  );
  return rows[0] ? hydrate(rows[0]) : null;
}

export async function slugExists(slug: string, excludeId?: number): Promise<boolean> {
  const p = getBlogPool();
  if (!p) return false;
  const sql = excludeId
    ? "SELECT id FROM blogs WHERE slug = ? AND id <> ? LIMIT 1"
    : "SELECT id FROM blogs WHERE slug = ? LIMIT 1";
  const params = excludeId ? [slug, excludeId] : [slug];
  const [rows] = await p.query<mysql.RowDataPacket[]>(sql, params);
  return rows.length > 0;
}

function publishedAtFor(input: BlogInput): Date | null {
  if (input.published_at) return new Date(input.published_at);
  if (input.status === "published") return new Date();
  return null;
}

export async function createBlog(input: BlogInput): Promise<BlogRow | null> {
  const p = getBlogPool();
  if (!p) return null;
  const publishedAt = publishedAtFor(input);
  const [result] = await p.execute<mysql.ResultSetHeader>(
    `INSERT INTO blogs
      (title, slug, excerpt, content, content_type, featured_image, image_alt,
       meta_title, meta_description, canonical_url, category, tags, region,
       status, published_at, seo_score, reading_minutes, old_slug, source_file)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.title,
      input.slug,
      input.excerpt ?? null,
      input.content,
      input.content_type ?? "html",
      input.featured_image ?? null,
      input.image_alt ?? null,
      input.meta_title ?? null,
      input.meta_description ?? null,
      input.canonical_url ?? null,
      input.category ?? null,
      toJsonString(input.tags ?? null),
      input.region ?? "both",
      input.status ?? "draft",
      publishedAt,
      input.seo_score ?? null,
      input.reading_minutes ?? null,
      input.old_slug ?? null,
      input.source_file ?? null,
    ],
  );
  return getBlogById(result.insertId);
}

export async function updateBlog(id: number, input: BlogInput): Promise<BlogRow | null> {
  const p = getBlogPool();
  if (!p) return null;
  const existing = await getBlogById(id);
  if (!existing) return null;
  const nextStatus = input.status ?? existing.status;
  const publishedAt =
    input.published_at !== undefined
      ? input.published_at
        ? new Date(input.published_at)
        : null
      : existing.published_at && nextStatus === "published"
        ? existing.published_at
        : nextStatus === "published"
          ? new Date()
          : null;

  await p.execute(
    `UPDATE blogs SET
       title = ?, slug = ?, excerpt = ?, content = ?, content_type = ?,
       featured_image = ?, image_alt = ?, meta_title = ?, meta_description = ?,
       canonical_url = ?, category = ?, tags = ?, region = ?, status = ?,
       published_at = ?, seo_score = ?, reading_minutes = ?, old_slug = ?, source_file = ?
     WHERE id = ?`,
    [
      input.title,
      input.slug,
      input.excerpt ?? null,
      input.content,
      input.content_type ?? existing.content_type,
      input.featured_image ?? null,
      input.image_alt ?? null,
      input.meta_title ?? null,
      input.meta_description ?? null,
      input.canonical_url ?? null,
      input.category ?? null,
      toJsonString(input.tags ?? null),
      input.region ?? existing.region,
      nextStatus,
      publishedAt,
      input.seo_score ?? null,
      input.reading_minutes ?? null,
      input.old_slug ?? existing.old_slug,
      input.source_file ?? existing.source_file,
      id,
    ],
  );
  return getBlogById(id);
}

export async function deleteBlog(id: number): Promise<boolean> {
  const p = getBlogPool();
  if (!p) return false;
  const [result] = await p.execute<mysql.ResultSetHeader>(
    "DELETE FROM blogs WHERE id = ?",
    [id],
  );
  return result.affectedRows > 0;
}

export async function listPublishedSlugs(region: "global" | "us"): Promise<string[]> {
  const rows = await listBlogs({ publicOnly: true, publicRegion: region, limit: 1000 });
  return rows.map((r) => r.slug);
}
