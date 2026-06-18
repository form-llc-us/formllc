import type { Metadata } from "next";
import ComparisonPage from "@/components/site/ComparisonPage";
import { COMPARISONS } from "@data/comparisons";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FormLLC vs Alternatives — for U.S. Founders",
  description: "How FormLLC compares against Doola, Bizee, Atlas, and ZenBusiness — through the lens of a U.S.-based founder.",
  alternates: regionalAlternates("us", "/formllc-vs-alternatives"),
};

export default function Page() {
  return <ComparisonPage region="us" {...COMPARISONS.alternatives} />;
}
