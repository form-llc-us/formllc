import BlogListClient from "@/components/admin/blogs/BlogListClient";
import { listBlogs } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const rows = await listBlogs({ limit: 200 });
  const initial = rows.map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    region: r.region,
    status: r.status,
    seo_score: r.seo_score,
    updated_at: r.updated_at as string | Date,
    published_at: r.published_at as string | Date | null,
    category: r.category,
  }));
  return <BlogListClient initial={initial} />;
}
