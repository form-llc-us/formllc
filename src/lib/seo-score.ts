import { isValidSlug } from "./slug";

export type SeoInput = {
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  contentType?: "html" | "markdown";
  metaTitle?: string | null;
  metaDescription?: string | null;
  featuredImage?: string | null;
  imageAlt?: string | null;
};

export type SeoWarning = {
  field: string;
  level: "warn" | "error";
  message: string;
};

export type SeoReport = {
  score: number;
  warnings: SeoWarning[];
  wordCount: number;
  readingMinutes: number;
  metaTitleLength: number;
  metaDescriptionLength: number;
  slugQuality: "good" | "okay" | "bad";
};

const META_TITLE_MIN = 30;
const META_TITLE_MAX = 60;
const META_DESC_MIN = 70;
const META_DESC_MAX = 160;
const THIN_CONTENT_THRESHOLD = 300; // words

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
}

export function plainTextFromContent(content: string, contentType: "html" | "markdown"): string {
  const raw =
    contentType === "markdown"
      ? content
          .replace(/```[\s\S]*?```/g, " ")
          .replace(/`[^`]*`/g, " ")
          .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
          .replace(/\[[^\]]*]\([^)]*\)/g, " ")
          .replace(/[#>*_~\-]/g, " ")
      : stripHtml(content);
  return raw.replace(/\s+/g, " ").trim();
}

export function wordCount(text: string): number {
  return text ? text.split(" ").filter(Boolean).length : 0;
}

export function readingMinutes(text: string): number {
  return Math.max(1, Math.round(wordCount(text) / 220));
}

function slugQuality(slug: string): SeoReport["slugQuality"] {
  if (!isValidSlug(slug)) return "bad";
  const tokens = slug.split("-").filter(Boolean);
  if (tokens.length === 0 || tokens.length > 8) return "okay";
  if (slug.length > 70) return "okay";
  return "good";
}

export function scoreSeo(input: SeoInput): SeoReport {
  const warnings: SeoWarning[] = [];
  const text = plainTextFromContent(input.content || "", input.contentType ?? "html");
  const words = wordCount(text);
  const minutes = readingMinutes(text);

  const metaTitle = (input.metaTitle ?? input.title ?? "").trim();
  const metaDescription = (input.metaDescription ?? input.excerpt ?? "").trim();
  const metaTitleLength = metaTitle.length;
  const metaDescriptionLength = metaDescription.length;

  let score = 100;

  if (!input.title?.trim()) {
    warnings.push({ field: "title", level: "error", message: "Title is required." });
    score -= 25;
  }

  if (!input.slug || !isValidSlug(input.slug)) {
    warnings.push({ field: "slug", level: "error", message: "Slug must be lowercase, hyphenated, and URL-safe." });
    score -= 15;
  }

  if (metaTitleLength === 0) {
    warnings.push({ field: "metaTitle", level: "warn", message: "Meta title is empty — falls back to the post title." });
    score -= 5;
  } else if (metaTitleLength < META_TITLE_MIN) {
    warnings.push({ field: "metaTitle", level: "warn", message: `Meta title is short (${metaTitleLength} chars). Aim for ${META_TITLE_MIN}–${META_TITLE_MAX}.` });
    score -= 5;
  } else if (metaTitleLength > META_TITLE_MAX) {
    warnings.push({ field: "metaTitle", level: "warn", message: `Meta title is long (${metaTitleLength} chars). Google truncates around ${META_TITLE_MAX}.` });
    score -= 5;
  }

  if (metaDescriptionLength === 0) {
    warnings.push({ field: "metaDescription", level: "warn", message: "Meta description is empty." });
    score -= 10;
  } else if (metaDescriptionLength < META_DESC_MIN) {
    warnings.push({ field: "metaDescription", level: "warn", message: `Meta description is short (${metaDescriptionLength} chars). Aim for ${META_DESC_MIN}–${META_DESC_MAX}.` });
    score -= 5;
  } else if (metaDescriptionLength > META_DESC_MAX) {
    warnings.push({ field: "metaDescription", level: "warn", message: `Meta description is long (${metaDescriptionLength} chars). Google truncates around ${META_DESC_MAX}.` });
    score -= 5;
  }

  if (!input.excerpt?.trim()) {
    warnings.push({ field: "excerpt", level: "warn", message: "Excerpt is empty — used in listings, RSS, and social cards." });
    score -= 5;
  }

  if (input.featuredImage && !input.imageAlt?.trim()) {
    warnings.push({ field: "imageAlt", level: "warn", message: "Featured image has no alt text." });
    score -= 5;
  }

  if (words < THIN_CONTENT_THRESHOLD) {
    warnings.push({ field: "content", level: "warn", message: `Content is thin (${words} words). Aim for at least ${THIN_CONTENT_THRESHOLD}+.` });
    score -= 10;
  }

  const sq = slugQuality(input.slug ?? "");
  if (sq === "bad") score -= 10;
  else if (sq === "okay") score -= 3;

  return {
    score: Math.max(0, Math.min(100, score)),
    warnings,
    wordCount: words,
    readingMinutes: minutes,
    metaTitleLength,
    metaDescriptionLength,
    slugQuality: sq,
  };
}
