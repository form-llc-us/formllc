import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Refund Policy — U.S.",
  description: "FormLLC's refund policy for U.S. formation, bookkeeping, payroll, and tax services.",
  alternates: regionalAlternates("us", "/refund-policy"),
};

export default function Page() {
  return (
    <LegalPage region="us" title="Refund Policy (U.S.)" updatedAt="February 2026">
      <p>This Refund Policy applies to FormLLC's U.S. business unit and complements our <a href="/refund-policy">Global Refund Policy</a>.</p>

      <h2>U.S.-specific notes</h2>
      <ul>
        <li><strong>Bookkeeping</strong> — refundable for any unused months on a pro-rata basis.</li>
        <li><strong>Payroll setup</strong> — refundable in full if cancelled before the first payroll run.</li>
        <li><strong>Tax preparation</strong> — refundable until the engagement letter is signed and we've begun preparing your return.</li>
      </ul>

      <h2>How to request</h2>
      <p>Email <a href="mailto:contact@formllc.us">contact@formllc.us</a> with your order number. We respond within one business day.</p>
    </LegalPage>
  );
}
