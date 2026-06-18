import Link from "next/link";
import { notFound } from "next/navigation";
import BlogEditor, {
  type BlogEditorValue,
} from "@/components/admin/blogs/BlogEditor";
import { getBlogById } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

function toLocalInput(value: Date | string | null | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function tagsToString(tags: unknown): string {
  if (!tags) return "";
  if (Array.isArray(tags)) return tags.filter((t) => typeof t === "string").join(", ");
  if (typeof tags === "string") return tags;
  try {
    return JSON.stringify(tags);
  } catch {
    return "";
  }
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId) || numId <= 0) notFound();

  const row = await getBlogById(numId);
  if (!row) notFound();

  const initial: BlogEditorValue = {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? "",
    content: row.content,
    content_type: row.content_type,
    featured_image: row.featured_image ?? "",
    image_alt: row.image_alt ?? "",
    meta_title: row.meta_title ?? "",
    meta_description: row.meta_description ?? "",
    canonical_url: row.canonical_url ?? "",
    category: row.category ?? "",
    tags: tagsToString(row.tags),
    region: row.region,
    status: row.status,
    published_at: toLocalInput(row.published_at),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/blogs" className="text-xs font-semibold text-ink-500 hover:text-crimson-700">
            ← All blogs
          </Link>
          <h1 className="mt-2 text-2xl font-extrabold text-ink-900 tracking-tight">
            Edit blog
          </h1>
          <p className="mt-1 text-sm text-ink-600 font-mono">{row.slug}</p>
        </div>
        <a
          href={`/blogs/${row.slug}`}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-crimson-700 hover:text-crimson-600"
        >
          View public page →
        </a>
      </div>
      <BlogEditor mode="edit" initial={initial} />
    </div>
  );
}
