import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import BlogCard from "@/components/blog/BlogCard";
import BlogToc from "./BlogToc";
import ShareLinks from "@/components/blog/ShareLinks";
import Newsletter from "@/components/site/Newsletter";
import SitePage from "@/components/site/SitePage";
import { sanitizeBlogHtml } from "@/lib/sanitize";
import { getRelatedBlogsAsync, type BlogPost } from "@/lib/blog";
import { SITE } from "@data/site";

function readingTimeMinutes(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;

  return Math.max(1, Math.round(words / 220));
}

function removeLegacyModeToggle(html: string): string {
  return html.replace(
    /<div\s+class=["']mode-toggle["'][^>]*>[\s\S]*?<\/div>/i,
    ""
  );
}

export default async function BlogPostBody({
  slug,
  region,
  post,
}: {
  slug: string;
  region: "global" | "us";
  post: BlogPost;
}) {
  const sanitized = sanitizeBlogHtml(post.bodyHtml);
  const articleHtml = removeLegacyModeToggle(sanitized);
  const minutes = readingTimeMinutes(articleHtml);
  const related = await getRelatedBlogsAsync(slug, region, 3);

  const author = post.author ?? "FormLLC Team";
  const initials =
    author
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "FL";

  const base = region === "us" ? "/us" : "";
  const canonicalPath = `${base}/blogs/${slug}`;

  const tocItems = post.headings
    .filter((heading) => heading.level <= 3)
    .slice(0, 16);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "FormLLC",
      url: SITE.url,
    },
    image: post.image
      ? `${SITE.url}${post.image.startsWith("/") ? post.image : `/${post.image}`}`
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}${canonicalPath}`,
    },
  };

  const blogThemeScript = `
    (function () {
      var storageKey = "formllc_blog_theme";
      var current = "day";

      try {
        current = localStorage.getItem(storageKey) || "day";
      } catch (error) {}

      function setTheme(theme) {
        var isNight = theme === "night";
        current = isNight ? "night" : "day";

        document.querySelectorAll("[data-blog-theme-scope]").forEach(function (scope) {
          scope.classList.toggle("blog-night", isNight);
        });

        document.querySelectorAll("[data-blog-theme-toggle]").forEach(function (button) {
          button.setAttribute("aria-pressed", isNight ? "true" : "false");

          var icon = button.querySelector("[data-blog-theme-icon]");
          var label = button.querySelector("[data-blog-theme-label]");

          if (icon) icon.textContent = isNight ? "☀️" : "🌙";
          if (label) label.textContent = isNight ? "Day mode" : "Night mode";
        });

        try {
          localStorage.setItem(storageKey, current);
        } catch (error) {}
      }

      document.addEventListener("click", function (event) {
        var target = event.target;
        if (!target || !target.closest) return;

        var button = target.closest("[data-blog-theme-toggle]");
        if (!button) return;

        event.preventDefault();
        setTheme(current === "night" ? "day" : "night");
      });

      function init() {
        setTheme(current);
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
      } else {
        init();
      }

      setTimeout(init, 100);
    })();
  `;

  const blogThemeStyles = `
    [data-blog-theme-toggle] {
      min-width: 132px;
    }

    [data-blog-theme-toggle][aria-pressed="true"] {
      background: rgba(196, 18, 48, 0.14);
      border-color: rgba(196, 18, 48, 0.32);
      color: #FFF8F0;
    }

    [data-blog-theme-toggle][aria-pressed="true"] [data-blog-theme-toggle-track] {
      background: rgba(255,255,255,0.18);
    }

    [data-blog-theme-toggle][aria-pressed="true"] [data-blog-theme-toggle-dot] {
      transform: translateX(18px);
      background: #ffffff;
    }

    .blog-theme-scope .prose-blog {
      transition: background-color 180ms ease, color 180ms ease, border-color 180ms ease;
    }

    .blog-theme-scope.blog-night .prose-blog {
      background: rgba(255, 255, 255, 0.035);
      color: #C4A898;
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 28px;
      padding: clamp(22px, 4vw, 36px);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.40);
    }

    .blog-theme-scope.blog-night .prose-blog h1,
    .blog-theme-scope.blog-night .prose-blog h2,
    .blog-theme-scope.blog-night .prose-blog h3,
    .blog-theme-scope.blog-night .prose-blog h4 {
      color: #ffffff;
    }

    .blog-theme-scope.blog-night .prose-blog p,
    .blog-theme-scope.blog-night .prose-blog li,
    .blog-theme-scope.blog-night .prose-blog span,
    .blog-theme-scope.blog-night .prose-blog td,
    .blog-theme-scope.blog-night .prose-blog th {
      color: #C4A898;
    }

    .blog-theme-scope.blog-night .prose-blog a {
      color: #E8193B;
    }

    .blog-theme-scope.blog-night .prose-blog strong {
      color: #ffffff;
    }

    .blog-theme-scope.blog-night .prose-blog img {
      background: #ffffff;
      border-radius: 18px;
    }

    .blog-theme-scope.blog-night .prose-blog table,
    .blog-theme-scope.blog-night .prose-blog .info-box,
    .blog-theme-scope.blog-night .prose-blog .faq-item,
    .blog-theme-scope.blog-night .prose-blog .hero-card,
    .blog-theme-scope.blog-night .prose-blog .content-card {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.08);
      color: #C4A898;
    }

    .blog-theme-scope.blog-night .prose-blog blockquote {
      background: rgba(255, 255, 255, 0.06);
      border-left-color: #E8193B;
      color: #F5EDE8;
    }

    .blog-theme-scope.blog-night .prose-blog code {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .blog-theme-scope.blog-night .prose-blog .badge {
      background: rgba(251, 113, 133, 0.16);
      color: #F5C55A;
      border-color: rgba(232, 168, 56, 0.25);
    }
  `;

  return (
    <SitePage region={region}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <script dangerouslySetInnerHTML={{ __html: blogThemeScript }} />
      <style dangerouslySetInnerHTML={{ __html: blogThemeStyles }} />

      <section className="relative bg-soft-premium">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(190,18,60,0.13),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.13),transparent_32%)]"
        />

        <div className="container-x relative py-10 md:py-14">
          <nav
            className="mb-7 flex flex-wrap items-center gap-2 text-sm font-semibold text-ink-500"
            aria-label="Breadcrumb"
          >
            <Link href={base || "/"} className="hover:text-crimson-700">
              Home
            </Link>

            <span aria-hidden className="text-ink-300">
              /
            </span>

            <Link href={`${base}/blogs`} className="hover:text-crimson-700">
              Resources
            </Link>

            <span aria-hidden className="text-ink-300">
              /
            </span>

            <span className="text-ink-800">{post.category}</span>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge">
                  {post.category}
                  {post.state ? ` · ${post.state}` : ""}
                </span>

                <span className="rounded-full border border-ink-100 bg-white/80 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink-500 shadow-soft">
                  {minutes}-minute read
                </span>
              </div>

              <h1 className="mt-5 font-display text-[2.15rem] font-extrabold leading-[1.05] tracking-tight text-ink-950 md:text-[3rem] lg:text-[3.45rem]">
                {post.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-ink-600 md:text-lg">
                {post.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[1.5rem] border border-ink-100 bg-white/75 p-4 shadow-soft backdrop-blur">
                <span
                  aria-hidden
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-crimson-100 bg-crimson-50 text-sm font-extrabold text-crimson-700"
                >
                  {initials}
                </span>

                <div>
                  <p className="text-sm font-semibold text-ink-500">
                    Written by{" "}
                    <span className="font-extrabold text-ink-950">{author}</span>
                  </p>

                  <p className="mt-0.5 text-xs font-semibold text-ink-500">
                    FormLLC compliance and formation desk
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:justify-self-end">
              <div className="rounded-[1.75rem] border border-ink-100 bg-white p-3 shadow-card">
                {post.image ? (
                  <div className="flex w-full items-center justify-center overflow-hidden rounded-[1.25rem] bg-cream-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="eager"
                      decoding="async"
                      className="h-auto max-h-[260px] w-full rounded-[1.25rem] object-contain md:max-h-[300px] lg:max-h-[320px]"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] rounded-[1.25rem] bg-[radial-gradient(circle_at_top_left,rgba(190,18,60,0.16),transparent_36%),linear-gradient(135deg,#fff7ed,#fff1f2)]" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div
          className="container-x grid gap-10 blog-theme-scope lg:grid-cols-[minmax(0,1fr)_340px]"
          data-blog-theme-scope
        >
          <article className="min-w-0" data-blog-article>
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 lg:hidden">
                <BlogToc headings={tocItems} />
              </div>

              <div className="mb-8 rounded-[1.5rem] border border-ink-100 bg-cream-50 p-4 shadow-soft">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <ShareLinks slug={slug} title={post.title} region={region} />

                  <button
                    type="button"
                    data-blog-theme-toggle
                    aria-pressed="false"
                    className="inline-flex h-11 items-center justify-center gap-3 rounded-full border border-ink-200 bg-white px-4 text-sm font-extrabold text-ink-800 shadow-soft transition hover:-translate-y-0.5 hover:border-crimson-200 hover:text-crimson-700"
                  >
                    <span
                      data-blog-theme-toggle-track
                      className="relative h-5 w-10 rounded-full bg-cream-100 transition"
                      aria-hidden
                    >
                      <span
                        data-blog-theme-toggle-dot
                        className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-crimson-600 transition"
                      />
                    </span>

                    <span data-blog-theme-icon aria-hidden>
                      🌙
                    </span>

                    <span data-blog-theme-label>Night mode</span>
                  </button>
                </div>
              </div>

              <div className="prose-blog">
                <div dangerouslySetInnerHTML={{ __html: articleHtml }} />
              </div>

              <div className="mt-12 rounded-[2rem] border border-white/10 bg-soft-crimson p-7 shadow-card md:p-8">
                <span className="badge !bg-white/15 !text-white/90">Need help?</span>

                <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-white">
                  Want FormLLC to handle this for you?
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/78 md:text-base">
                  Our team handles company formation, EIN, BOI filing, Registered
                  Agent service, annual reports, tax filing, and compliance
                  support — so you can focus on running the business.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <LinkButton href={`${base}/pricing`} variant="primary" size="md">
                    See Pricing
                  </LinkButton>

                  <LinkButton href={SITE.calendly} variant="ghost" size="md">
                    Free Consult
                  </LinkButton>
                </div>
              </div>

              <div className="mt-10 rounded-[2rem] border border-ink-100 bg-white p-6 shadow-soft md:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div
                    aria-hidden
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-crimson-100 bg-crimson-50 text-lg font-extrabold text-crimson-700"
                  >
                    {initials}
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink-500">
                      Written by
                    </p>

                    <h4 className="mt-1 text-xl font-extrabold text-ink-950">
                      {author}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-ink-600">
                      FormLLC helps founders form, maintain, and scale U.S.
                      companies with formation, EIN, Registered Agent, BOI,
                      annual filing, banking guidance, and tax compliance support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <div className="rounded-[2rem] border border-white/10 bg-soft-crimson p-6 shadow-card">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
                  Free consultation
                </p>

                <h3 className="mt-4 text-xl font-extrabold tracking-tight text-white">
                  Not sure what applies to your company?
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/78">
                  Book a free call and we’ll map your formation, EIN, banking,
                  annual filing, and tax requirements.
                </p>

                <LinkButton
                  href={SITE.calendly}
                  variant="primary"
                  size="md"
                  className="mt-5 w-full"
                >
                  Book Free Consult
                </LinkButton>
              </div>

              <BlogToc headings={tocItems} />

              <div className="rounded-[2rem] border border-ink-100 bg-white p-6 shadow-soft">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink-500">
                  Useful links
                </p>

                <ul className="mt-4 space-y-2.5 text-sm">
                  {[
                    { label: "See pricing", href: `${base}/pricing` },
                    { label: "All services", href: `${base}/services` },
                    { label: "Free tools", href: `${base}/tools` },
                    {
                      label: "Compare alternatives",
                      href: `${base}/formllc-vs-alternatives`,
                    },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between rounded-xl px-2 py-1.5 font-bold text-ink-700 transition hover:bg-cream-50 hover:text-crimson-700"
                      >
                        {link.label}

                        <span aria-hidden className="text-ink-400">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-soft-premium py-14 md:py-20">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <span className="badge">Related guides</span>

                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-950 md:text-4xl">
                  Keep reading.
                </h2>

                <p className="mt-3 text-base leading-7 text-ink-600">
                  More practical resources from the FormLLC compliance desk.
                </p>
              </div>

              <Link
                href={`${base}/blogs`}
                className="inline-flex h-11 items-center rounded-full border border-ink-200 bg-white px-5 text-sm font-extrabold text-ink-800 shadow-soft transition hover:-translate-y-0.5 hover:border-crimson-200 hover:text-crimson-700"
              >
                Browse all articles →
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} region={region} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter
        title="Don’t miss the next compliance update."
        description="One email a month. Annual-report deadlines, IRS updates, entity compliance reminders, and practical founder guidance from FormLLC."
      />
    </SitePage>
  );
}
