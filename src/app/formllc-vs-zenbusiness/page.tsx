import type { Metadata } from "next";
import ComparisonPage from "@/components/site/ComparisonPage";
import { COMPARISONS } from "@data/comparisons";

export const metadata: Metadata = {
  title: "FormLLC vs ZenBusiness — Compared",
  description:
    "ZenBusiness is a subscription-based formation service for U.S. small businesses. Compare features, banking, and tax support against FormLLC.",
  alternates: { canonical: "/formllc-vs-zenbusiness" },
};

export default function Page() {
  return <ComparisonPage region="global" {...COMPARISONS.zenbusiness} />;
}
