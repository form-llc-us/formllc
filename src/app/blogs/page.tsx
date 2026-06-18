import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import { Section, SectionHeading } from "@/components/ui/Section";
import BlogIndex from "@/components/blog/BlogIndex";
import { getAllBlogsAsync } from "@/lib/blog";
import Newsletter from "@/components/site/Newsletter";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "LLC, Tax & Compliance Guides — FormLLC",
  description:
    "Clear guides on U.S. LLC formation, annual reports, franchise tax, foreign LLC registration, dissolution, and U.S. tax compliance for founders.",
  alternates: regionalAlternates("global", "/blogs"),
};

export default async function BlogsPage() {
  const posts = await getAllBlogsAsync("global");

  return (
    <SitePage region="global">
      <section className="relative bg-soft-premium">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(190,18,60,0.11),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.10),transparent_32%)]"
        />

        <div className="container-x relative py-14 md:py-20">
          <div className="max-w-4xl">
            <span className="badge">FormLLC Blog</span>

            <h1 className="mt-5 font-display text-[2.45rem] font-extrabold leading-[1.04] tracking-tight text-ink-950 md:text-[4rem]">
              LLC, tax, and compliance guides for founders.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-ink-600 md:text-lg">
              Practical resources on U.S. company formation, annual reports,
              franchise tax, foreign LLC registration, dissolution, and tax
              compliance — written for founders who need clear filing guidance.
            </p>

            <div className="mt-8 grid gap-4 rounded-[2rem] border border-ink-100 bg-white/80 p-5 shadow-soft backdrop-blur md:grid-cols-3">
              <div>
                <p className="text-2xl font-extrabold text-ink-950">
                  {posts.length}+
                </p>
                <p className="mt-1 text-sm font-semibold text-ink-500">
                  Founder resources
                </p>
              </div>

              <div>
                <p className="text-2xl font-extrabold text-ink-950">
                  50 states
                </p>
                <p className="mt-1 text-sm font-semibold text-ink-500">
                  Formation and compliance coverage
                </p>
              </div>

              <div>
                <p className="text-2xl font-extrabold text-ink-950">
                  Plain English
                </p>
                <p className="mt-1 text-sm font-semibold text-ink-500">
                  Built for non-technical founders
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Resource library"
          title="Search all founder guides."
          description="Use the search and filters below to find state-specific guides, tax explainers, annual report help, and compliance walkthroughs."
        />

        <div className="mt-10">
          <BlogIndex posts={posts} region="global" />
        </div>
      </Section>

      <Newsletter
        title="Get the next compliance guide in your inbox."
        description="One practical email a month covering U.S. company formation, annual filings, state deadlines, and tax compliance."
      />
    </SitePage>
  );
}