import type { Metadata } from "next";
import ComparisonPage from "@/components/site/ComparisonPage";
import { COMPARISONS } from "@data/comparisons";

export const metadata: Metadata = {
  title: "FormLLC vs Bizee (Incfile) — Compared",
  description:
    "Bizee (formerly Incfile) is one of the cheapest formation services. Compare it against FormLLC for EIN, registered agent, taxes, and lifetime cost.",
  alternates: { canonical: "/formllc-vs-bizee" },
};

export default function Page() {
  return <ComparisonPage region="global" {...COMPARISONS.bizee} />;
}
