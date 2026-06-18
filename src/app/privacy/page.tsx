import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How FormLLC collects, uses, and protects your personal information.",
  alternates: regionalAlternates("global", "/privacy"),
};

export default function PrivacyPage() {
  return (
    <LegalPage region="global" title="Privacy Policy" updatedAt="February 2026">
      <p>
        FormLLC, Inc. (“FormLLC,” “we,” “our,” or “us”) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at <a href="https://formllc.us">formllc.us</a> or use our services.
      </p>

      <h2>1. Information we collect</h2>
      <p>We collect information you provide directly (name, email, phone, address, business details, payment information) and information collected automatically (IP address, browser, pages visited, referring URL).</p>

      <h2>2. How we use information</h2>
      <ul>
        <li>To deliver and personalize the services you request.</li>
        <li>To communicate with you about your account, filings, and renewals.</li>
        <li>To prevent fraud and comply with legal obligations.</li>
        <li>To improve our website, marketing, and customer support.</li>
      </ul>

      <h2>3. Sharing your information</h2>
      <p>We share information with service providers (registered agents, banking partners, IRS, state agencies) only to deliver the services you've engaged us for. We never sell your personal information.</p>

      <h2>4. Cookies and analytics</h2>
      <p>We use first-party and third-party cookies for analytics (Google Analytics) and conversion tracking (Meta Pixel). You can control cookies through your browser settings.</p>

      <h2>5. Data retention</h2>
      <p>We retain your information for as long as necessary to deliver our services and comply with tax, audit, and legal obligations — typically 7 years for tax-related records.</p>

      <h2>6. Your rights</h2>
      <p>You may request access to, correction of, or deletion of your personal information by emailing <a href="mailto:contact@formllc.us">contact@formllc.us</a>.</p>

      <h2>7. Security</h2>
      <p>We use TLS encryption in transit and AES-256 at rest. Tax documents are stored on encrypted, access-controlled servers and accessed only by personnel processing your filing.</p>

      <h2>8. Children</h2>
      <p>Our services are not directed to children under 18 and we do not knowingly collect personal information from minors.</p>

      <h2>9. Changes</h2>
      <p>We will post any updates to this Privacy Policy on this page with a revised “Last updated” date.</p>

      <h2>10. Contact</h2>
      <p>Questions about this Privacy Policy? Email <a href="mailto:contact@formllc.us">contact@formllc.us</a>.</p>
    </LegalPage>
  );
}
