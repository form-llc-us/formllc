import type { Metadata } from "next";
import ComparisonPage from "@/components/site/ComparisonPage";
import { COMPARISONS } from "@data/comparisons";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FormLLC vs Alternatives — Doola, Bizee, Atlas, ZenBusiness",
  description:
    "How FormLLC compares to Doola, Bizee, Stripe Atlas, and ZenBusiness — feature-by-feature and across the entire post-formation lifecycle.",
  alternates: regionalAlternates("global", "/formllc-vs-alternatives"),
};

export default function Page() {
  return <ComparisonPage region="global" {...COMPARISONS.alternatives} />;
}
