"use client";

import { useMemo } from "react";

type Props = {
  title: string;
  excerpt: string;
  content: string;
  contentType: "html" | "markdown";
  featuredImage?: string | null;
};

function basicMarkdownToHtml(md: string): string {
  if (!md) return "";
  const esc = md.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let html = esc;
  html = html.replace(/```([\s\S]*?)```/g, (_m, c) => `<pre><code>${c}</code></pre>`);
  html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/!\[([^\]]*)]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  html = html.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return html
    .split(/\n{2,}/)
    .map((block) =>
      /^\s*<(h\d|ul|ol|pre|blockquote|table|p|figure|div|section)/i.test(block)
        ? block
        : `<p>${block.trim().replace(/\n/g, "<br/>")}</p>`,
    )
    .join("\n");
}

export default function BlogPreview({
  title,
  excerpt,
  content,
  contentType,
  featuredImage,
}: Props) {
  const html = useMemo(
    () => (contentType === "markdown" ? basicMarkdownToHtml(content) : content),
    [content, contentType],
  );

  return (
    <article className="card p-6 md:p-8 max-h-[80vh] overflow-auto">
      {featuredImage ? (
        <div className="mb-6 aspect-[16/9] overflow-hidden rounded-2xl border border-ink-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featuredImage} alt={title} className="h-full w-full object-cover" />
        </div>
      ) : null}
      <h1 className="text-2xl md:text-3xl font-extrabold text-ink-900 tracking-tight">
        {title || "Untitled draft"}
      </h1>
      {excerpt ? (
        <p className="mt-3 text-ink-600 leading-relaxed">{excerpt}</p>
      ) : null}
      <div className="prose-blog mt-6" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
