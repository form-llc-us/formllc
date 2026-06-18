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
  const slugs = await getBlogSlugsAsync("us");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogAsync(slug, "us");

  if (!post) {
    return {
      title: "Blog Not Found — FormLLC",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.description,
    alternates: regionalAlternates("us", `/blogs/${slug}`),
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.description,
      type: "article",
      url: `/us/blogs/${slug}`,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function USBlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogAsync(slug, "us");

  if (!post) {
    notFound();
  }

  return <BlogPostBody slug={slug} region="us" post={post} />;
}
