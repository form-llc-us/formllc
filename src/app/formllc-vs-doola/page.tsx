import type { Metadata } from "next";
import ComparisonPage from "@/components/site/ComparisonPage";
import { COMPARISONS } from "@data/comparisons";

export const metadata: Metadata = {
  title: "FormLLC vs Doola — Compared",
  description:
    "FormLLC and Doola both serve non-resident founders forming a U.S. LLC. Compare features, pricing, EIN, banking, and federal tax filing side by side.",
  alternates: { canonical: "/formllc-vs-doola" },
};

export default function Page() {
  return <ComparisonPage region="global" {...COMPARISONS.doola} />;
}
