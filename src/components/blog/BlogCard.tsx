import Link from "next/link";
import type { BlogIndexEntry } from "@/lib/blog";

export default function BlogCard({
  post,
  region = "global",
}: {
  post: BlogIndexEntry;
  region?: "global" | "us";
}) {
  const base = region === "us" ? "/us" : "";
  return (
    <Link
      href={`${base}/blogs/${post.slug}`}
      className="card group flex flex-col h-full overflow-hidden !p-0"
    >
      {post.image ? (
        <div className="aspect-[16/10] overflow-hidden bg-cream-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-[16/10] bg-gradient-to-br from-navy-50 to-brand-50 border-b border-ink-100" />
      )}
      <div className="p-6 flex-1 flex flex-col">
        <span className="badge self-start">{post.category}</span>
        <h3 className="mt-4 text-lg font-bold text-ink-900 leading-snug line-clamp-2 group-hover:text-crimson-700 transition">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-ink-600 leading-relaxed line-clamp-3 flex-1">
          {post.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-crimson-700 group-hover:text-crimson-600">
          Read article
          <span aria-hidden className="group-hover:translate-x-0.5 transition-transform">→</span>
        </span>
      </div>
    </Link>
  );
}
