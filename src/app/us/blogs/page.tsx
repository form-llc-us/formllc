import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import { Section, SectionHeading } from "@/components/ui/Section";
import BlogIndex from "@/components/blog/BlogIndex";
import { getAllBlogsAsync } from "@/lib/blog";
import Newsletter from "@/components/site/Newsletter";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "U.S. Founder Compliance Guides — FormLLC",
  description:
    "Clear guides for U.S. founders covering LLC formation, annual reports, S-Corp elections, sales tax, federal filings, and state compliance.",
  alternates: regionalAlternates("us", "/blogs"),
};

export default async function Page() {
  const posts = await getAllBlogsAsync("us");

  return (
    <SitePage region="us">
      <section className="relative bg-soft-premium">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(190,18,60,0.11),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.10),transparent_32%)]"
        />

        <div className="container-x relative py-14 md:py-20">
          <div className="max-w-4xl">
            <span className="badge">FormLLC Blog</span>

            <h1 className="mt-5 font-display text-[2.45rem] font-extrabold leading-[1.04] tracking-tight text-ink-950 md:text-[4rem]">
              U.S. founder compliance guides.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-ink-600 md:text-lg">
              Practical, plain-English resources on LLC formation, annual
              reports, S-Corp elections, sales tax, federal filings, and state
              compliance for U.S.-based founders.
            </p>

            <div className="mt-8 grid gap-4 rounded-[2rem] border border-ink-100 bg-white/80 p-5 shadow-soft backdrop-blur md:grid-cols-3">
              <div>
                <p className="text-2xl font-extrabold text-ink-950">
                  {posts.length}+
                </p>
                <p className="mt-1 text-sm font-semibold text-ink-500">
                  Compliance resources
                </p>
              </div>

              <div>
                <p className="text-2xl font-extrabold text-ink-950">
                  State-by-state
                </p>
                <p className="mt-1 text-sm font-semibold text-ink-500">
                  Formation and filing guides
                </p>
              </div>

              <div>
                <p className="text-2xl font-extrabold text-ink-950">
                  Founder-focused
                </p>
                <p className="mt-1 text-sm font-semibold text-ink-500">
                  Written for practical decisions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Resource library"
          title="Search all U.S. founder guides."
          description="Use the search and filters below to find the exact guide you need."
        />

        <div className="mt-10">
          <BlogIndex posts={posts} region="us" />
        </div>
      </Section>

      <Newsletter
        title="Stay ahead of U.S. compliance deadlines."
        description="Get practical reminders and plain-English guides for LLC formation, annual reports, sales tax, and federal/state filings."
      />
    </SitePage>
  );
}