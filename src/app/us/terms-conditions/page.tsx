import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions — U.S.",
  description: "Terms governing your use of FormLLC's U.S. services.",
  alternates: regionalAlternates("us", "/terms-conditions"),
};

export default function Page() {
  return (
    <LegalPage region="us" title="Terms & Conditions (U.S.)" updatedAt="February 2026">
      <p>These Terms apply specifically to U.S. residents using FormLLC's U.S. business unit. They complement our <a href="/terms-conditions">Global Terms & Conditions</a>.</p>

      <h2>Engagement letters</h2>
      <p>Tax preparation services are provided under a separate engagement letter signed prior to commencing work. The engagement letter will identify the responsible IRS Enrolled Agent or CPA, scope of work, and fees.</p>

      <h2>Governing law</h2>
      <p>For U.S. customers, these Terms are governed by the laws of the State of Delaware. Disputes will be resolved by binding arbitration in Wilmington, Delaware.</p>

      <h2>Other terms</h2>
      <p>All other terms of our <a href="/terms-conditions">Global Terms & Conditions</a> apply.</p>
    </LegalPage>
  );
}
