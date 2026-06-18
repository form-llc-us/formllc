import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy — U.S.",
  description: "How FormLLC's U.S. business unit collects, uses, and protects your personal information.",
  alternates: regionalAlternates("us", "/privacy"),
};

export default function Page() {
  return (
    <LegalPage region="us" title="Privacy Policy (U.S.)" updatedAt="February 2026">
      <p>This Privacy Policy applies to FormLLC's U.S. business unit and complements our <a href="/privacy">Global Privacy Policy</a>. The U.S. unit additionally complies with the California Consumer Privacy Act (CCPA) and Colorado Privacy Act (CPA) for residents of those states.</p>

      <h2>CCPA / CPA rights</h2>
      <p>If you are a California or Colorado resident, you have the right to (1) know what personal information we collect, (2) request a copy, (3) request deletion, (4) opt out of any "sale" of personal information (we do not sell data), and (5) be free from discrimination for exercising these rights.</p>

      <h2>To exercise your rights</h2>
      <p>Email <a href="mailto:contact@formllc.us">contact@formllc.us</a> with the subject "Privacy Request" and we'll respond within 45 days.</p>

      <h2>Other terms</h2>
      <p>All other terms of our <a href="/privacy">Global Privacy Policy</a> apply.</p>
    </LegalPage>
  );
}
