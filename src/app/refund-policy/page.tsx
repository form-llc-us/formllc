import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "FormLLC's refund policy for formation, EIN, registered agent, and tax services.",
  alternates: regionalAlternates("global", "/refund-policy"),
};

export default function RefundPage() {
  return (
    <LegalPage region="global" title="Refund Policy" updatedAt="February 2026">
      <p>We want you to be completely satisfied with FormLLC. This policy explains what's refundable and what isn't.</p>

      <h2>Full refund</h2>
      <ul>
        <li>If we have not yet started filing or processing your order — you'll receive a 100% refund of our service fee.</li>
        <li>If we cannot deliver the service for reasons within our control.</li>
      </ul>

      <h2>Partial refund</h2>
      <ul>
        <li>If we have started — but not completed — your filing, you'll receive a refund of the unused portion of your service fee.</li>
      </ul>

      <h2>Non-refundable</h2>
      <ul>
        <li><strong>State filing fees</strong> — once submitted to a state, the state's fee is non-refundable. We pass these through at cost.</li>
        <li><strong>Completed services</strong> — once an EIN is obtained, an annual report is filed, or a tax return is signed and submitted, the corresponding service fee is non-refundable.</li>
        <li><strong>Registered agent</strong> — refundable on a pro-rata basis if cancelled before the second year.</li>
      </ul>

      <h2>How to request a refund</h2>
      <p>Email <a href="mailto:contact@formllc.us">contact@formllc.us</a> with your order number and we'll respond within one business day. Refunds are processed back to your original payment method within 7–10 business days.</p>
    </LegalPage>
  );
}
