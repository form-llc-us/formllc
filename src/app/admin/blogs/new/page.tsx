import Link from "next/link";
import BlogEditor, { emptyBlog } from "@/components/admin/blogs/BlogEditor";

export const dynamic = "force-dynamic";

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/blogs" className="text-xs font-semibold text-ink-500 hover:text-crimson-700">
            ← All blogs
          </Link>
          <h1 className="mt-2 text-2xl font-extrabold text-ink-900 tracking-tight">New blog</h1>
        </div>
      </div>
      <BlogEditor mode="new" initial={emptyBlog} />
    </div>
  );
}
