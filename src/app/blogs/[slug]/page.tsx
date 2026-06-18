import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostBody from "@/components/blog/BlogPostBody";
import { getBlogAsync, getBlogSlugsAsync } from "@/lib/blog";
import { regionalAlternates } from "@/lib/seo";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogSlugsAsync("global");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogAsync(slug, "global");

  if (!post) {
    return {
      title: "Blog Not Found — FormLLC",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.description,
    alternates: regionalAlternates("global", `/blogs/${slug}`),
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.description,
      type: "article",
      url: `/blogs/${slug}`,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogAsync(slug, "global");

  if (!post) {
    notFound();
  }

  return <BlogPostBody slug={slug} region="global" post={post} />;
}
