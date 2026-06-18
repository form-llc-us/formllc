import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing your use of FormLLC's website and services.",
  alternates: regionalAlternates("global", "/terms-conditions"),
};

export default function TermsPage() {
  return (
    <LegalPage region="global" title="Terms & Conditions" updatedAt="February 2026">
      <p>By using <a href="https://formllc.us">formllc.us</a> or any FormLLC service, you agree to these Terms & Conditions. Please read them carefully.</p>

      <h2>1. Services</h2>
      <p>FormLLC provides company formation, registered agent, EIN application support, banking introductions, annual report filings, bookkeeping, and U.S. tax preparation services. Specific deliverables and timelines are described on the relevant service or pricing page at the time of purchase.</p>

      <h2>2. No legal or tax advice</h2>
      <p>FormLLC is not a law firm and does not provide legal advice. Tax filings are prepared by IRS Enrolled Agents under separate engagement letters. For complex situations (M&A, multi-state taxation, IRS audit defense) we recommend you consult licensed counsel.</p>

      <h2>3. Customer obligations</h2>
      <p>You agree to (a) provide accurate and complete information; (b) not use our services for illegal or fraudulent purposes; (c) keep your account credentials secure; and (d) pay all fees when due.</p>

      <h2>4. Fees and payment</h2>
      <p>Service fees are due at the time of purchase. State filing fees are billed at cost and shown separately. We do not auto-renew without your consent.</p>

      <h2>5. Refunds</h2>
      <p>Refunds are governed by our <a href="/refund-policy">Refund Policy</a>.</p>

      <h2>6. Intellectual property</h2>
      <p>All content on this website (text, graphics, logos, software) is the property of FormLLC or its licensors and is protected by copyright and trademark law.</p>

      <h2>7. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, FormLLC's liability for any claim arising out of these terms or our services is limited to the fees you paid us in the 12 months preceding the claim.</p>

      <h2>8. Indemnification</h2>
      <p>You agree to indemnify and hold FormLLC harmless from any claim arising out of your breach of these terms or your misuse of the services.</p>

      <h2>9. Governing law</h2>
      <p>These terms are governed by the laws of the State of Wyoming, USA. Disputes will be resolved by binding arbitration in Wyoming.</p>

      <h2>10. Changes</h2>
      <p>We may update these Terms from time to time. Material changes will be communicated by email or via a notice on this page.</p>
    </LegalPage>
  );
}
