"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import BlogSeoPanel from "./BlogSeoPanel";
import BlogPreview from "./BlogPreview";

export type BlogEditorValue = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  content_type: "html" | "markdown";
  featured_image: string;
  image_alt: string;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  category: string;
  tags: string; // comma-separated in the UI
  region: "global" | "us" | "both";
  status: "draft" | "published";
  published_at: string; // datetime-local format
};

export const emptyBlog: BlogEditorValue = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  content_type: "html",
  featured_image: "",
  image_alt: "",
  meta_title: "",
  meta_description: "",
  canonical_url: "",
  category: "",
  tags: "",
  region: "both",
  status: "draft",
  published_at: "",
};

function parseTags(input: string): string[] {
  return input
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function toIsoOrNull(localValue: string): string | null {
  if (!localValue) return null;
  const d = new Date(localValue);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export default function BlogEditor({
  initial,
  mode,
}: {
  initial: BlogEditorValue;
  mode: "new" | "edit";
}) {
  const router = useRouter();
  const [value, setValue] = useState<BlogEditorValue>(initial);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const seoInput = useMemo(
    () => ({
      title: value.title,
      slug: value.slug,
      excerpt: value.excerpt || null,
      content: value.content,
      contentType: value.content_type,
      metaTitle: value.meta_title || null,
      metaDescription: value.meta_description || null,
      featuredImage: value.featured_image || null,
      imageAlt: value.image_alt || null,
    }),
    [value],
  );

  function patch<K extends keyof BlogEditorValue>(k: K, v: BlogEditorValue[K]) {
    setValue((prev) => ({ ...prev, [k]: v }));
  }

  async function submit(status: "draft" | "published") {
    setError(null);
    const payload = {
      title: value.title.trim(),
      slug: value.slug.trim(),
      excerpt: value.excerpt.trim() || null,
      content: value.content,
      content_type: value.content_type,
      featured_image: value.featured_image.trim() || null,
      image_alt: value.image_alt.trim() || null,
      meta_title: value.meta_title.trim() || null,
      meta_description: value.meta_description.trim() || null,
      canonical_url: value.canonical_url.trim() || null,
      category: value.category.trim() || null,
      tags: parseTags(value.tags),
      region: value.region,
      status,
      published_at: toIsoOrNull(value.published_at),
    };

    const url = mode === "edit" && value.id ? `/api/admin/blogs/${value.id}` : "/api/admin/blogs";
    const method = mode === "edit" ? "PUT" : "POST";

    startTransition(async () => {
      try {
        const res = await fetch(url, {
          method,
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data?.error ?? `Save failed (${res.status})`);
          return;
        }
        if (mode === "new" && data?.data?.id) {
          router.push(`/admin/blogs/${data.data.id}/edit?saved=1`);
        } else {
          router.refresh();
        }
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  async function remove() {
    if (mode !== "edit" || !value.id) return;
    if (!window.confirm("Delete this blog post permanently?")) return;
    startTransition(async () => {
      const res = await fetch(`/api/admin/blogs/${value.id}`, { method: "DELETE" });
      if (res.ok) router.push("/admin/blogs");
      else setError(`Delete failed (${res.status})`);
    });
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value.status);
        }}
        className="space-y-6"
      >
        <div className="card p-6 space-y-4">
          <Field label="Title" required>
            <input
              className="input"
              value={value.title}
              onChange={(e) => patch("title", e.target.value)}
              required
              maxLength={255}
            />
          </Field>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Slug" hint="Lowercase, hyphenated. Auto-filled from the title.">
              <input
                className="input"
                value={value.slug}
                onChange={(e) => patch("slug", e.target.value)}
                maxLength={200}
                placeholder="my-blog-slug"
              />
            </Field>
            <Field label="Category">
              <input
                className="input"
                value={value.category}
                onChange={(e) => patch("category", e.target.value)}
                maxLength={120}
              />
            </Field>
          </div>
          <Field label="Excerpt" hint="Short summary used in listings, RSS, and social cards.">
            <textarea
              className="textarea"
              value={value.excerpt}
              onChange={(e) => patch("excerpt", e.target.value)}
              maxLength={2000}
              rows={3}
            />
          </Field>
        </div>

        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-ink-900">Content</h2>
            <div className="flex items-center gap-2">
              <label className="text-xs text-ink-500 font-semibold uppercase tracking-wider">
                Format
              </label>
              <select
                className="select !h-9 !text-xs !pr-8 !pl-3 w-32"
                value={value.content_type}
                onChange={(e) => patch("content_type", e.target.value as "html" | "markdown")}
              >
                <option value="html">HTML</option>
                <option value="markdown">Markdown</option>
              </select>
              <button
                type="button"
                onClick={() => setShowPreview((v) => !v)}
                className="text-xs font-semibold text-crimson-700 hover:text-crimson-600"
              >
                {showPreview ? "Hide preview" : "Preview"}
              </button>
            </div>
          </div>
          <textarea
            className="textarea font-mono text-[13px] leading-relaxed"
            value={value.content}
            onChange={(e) => patch("content", e.target.value)}
            rows={20}
            placeholder={
              value.content_type === "markdown"
                ? "# Heading\n\nWrite markdown here…"
                : "<h2>Heading</h2>\n<p>HTML content…</p>"
            }
          />
        </div>

        {showPreview && (
          <BlogPreview
            title={value.title}
            excerpt={value.excerpt}
            content={value.content}
            contentType={value.content_type}
            featuredImage={value.featured_image || null}
          />
        )}

        <div className="card p-6 space-y-4">
          <h2 className="text-base font-bold text-ink-900">Media & SEO</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Featured image URL">
              <input
                className="input"
                value={value.featured_image}
                onChange={(e) => patch("featured_image", e.target.value)}
                maxLength={500}
                placeholder="/Assets/posts/example.webp"
              />
            </Field>
            <Field label="Image alt text">
              <input
                className="input"
                value={value.image_alt}
                onChange={(e) => patch("image_alt", e.target.value)}
                maxLength={255}
              />
            </Field>
          </div>
          <Field label="Meta title" hint="Aim for 30–60 chars.">
            <input
              className="input"
              value={value.meta_title}
              onChange={(e) => patch("meta_title", e.target.value)}
              maxLength={255}
            />
          </Field>
          <Field label="Meta description" hint="Aim for 70–160 chars.">
            <textarea
              className="textarea"
              value={value.meta_description}
              onChange={(e) => patch("meta_description", e.target.value)}
              maxLength={320}
              rows={3}
            />
          </Field>
          <Field label="Canonical URL" hint="Leave blank to use the default canonical.">
            <input
              className="input"
              value={value.canonical_url}
              onChange={(e) => patch("canonical_url", e.target.value)}
              maxLength={500}
            />
          </Field>
          <Field label="Tags" hint="Comma-separated. Use 'author:Name' or 'state:Texas' for legacy metadata.">
            <input
              className="input"
              value={value.tags}
              onChange={(e) => patch("tags", e.target.value)}
              placeholder="annual report, alabama, llc"
            />
          </Field>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 text-rose-800 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => submit("draft")}
            disabled={isPending}
            className="btn-secondary btn-md"
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={() => submit("published")}
            disabled={isPending}
            className="btn-primary btn-md"
          >
            {value.status === "published" ? "Update published" : "Publish"}
          </button>
          {mode === "edit" && (
            <button
              type="button"
              onClick={remove}
              disabled={isPending}
              className="ml-auto text-sm font-semibold text-rose-700 hover:text-rose-600"
            >
              Delete
            </button>
          )}
        </div>
      </form>

      <aside className="space-y-5">
        <div className="card p-6 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500">
            Visibility
          </h3>
          <Field label="Status">
            <select
              className="select"
              value={value.status}
              onChange={(e) => patch("status", e.target.value as "draft" | "published")}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
          <Field label="Region">
            <select
              className="select"
              value={value.region}
              onChange={(e) => patch("region", e.target.value as "global" | "us" | "both")}
            >
              <option value="both">Both (global + US)</option>
              <option value="global">Global only</option>
              <option value="us">U.S. only</option>
            </select>
          </Field>
          <Field label="Published date">
            <input
              type="datetime-local"
              className="input"
              value={value.published_at}
              onChange={(e) => patch("published_at", e.target.value)}
            />
          </Field>
        </div>

        <BlogSeoPanel input={seoInput} />
      </aside>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-ink-500 mb-1.5">
        {label}
        {required ? <span className="text-crimson-600 ml-1">*</span> : null}
      </span>
      {children}
      {hint ? <span className="block text-xs text-ink-500 mt-1.5">{hint}</span> : null}
    </label>
  );
}
