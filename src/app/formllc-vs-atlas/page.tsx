import type { Metadata } from "next";
import ComparisonPage from "@/components/site/ComparisonPage";
import { COMPARISONS } from "@data/comparisons";

export const metadata: Metadata = {
  title: "FormLLC vs Stripe Atlas — Compared",
  description:
    "Stripe Atlas focuses on venture-ready Delaware C-Corps. Compare FormLLC's flexible LLC/C-Corp/S-Corp formation, banking, and tax services.",
  alternates: { canonical: "/formllc-vs-atlas" },
};

export default function Page() {
  return <ComparisonPage region="global" {...COMPARISONS.atlas} />;
}
