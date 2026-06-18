import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import { Section } from "@/components/ui/Section";
import TaxIntakeForm from "@/components/forms/TaxIntakeForm";
import PageHero from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Tax Intake — Upload Your Tax Documents",
  description:
    "Securely upload your tax documents (1099s, K-1s, prior returns, bookkeeping) and our IRS Enrolled Agents will prepare your federal return.",
  alternates: { canonical: "/tax-intake" },
};

export default function TaxIntakePage() {
  return (
    <SitePage region="global">
      <PageHero
        eyebrow="Tax intake"
        title={
          <>
            Upload your tax documents <span className="gradient-text">securely.</span>
          </>
        }
        description="Your files are encrypted in transit and at rest. Only the assigned Enrolled Agent on your engagement can access them."
      />

      <Section tone="muted">
        <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div>
            <TaxIntakeForm variant="tax-intake" />
          </div>
          <aside className="card p-7 md:p-8 lg:sticky lg:top-28">
            <p className="eyebrow">What to send</p>
            <ul className="mt-5 space-y-2.5 text-sm text-ink-700 leading-relaxed">
              {[
                "Last filed federal return (if any)",
                "1099s, K-1s, W-2s for the year",
                "Bookkeeping export or P&L",
                "Bank / Stripe / PayPal statements",
                "Articles of Organization, EIN letter",
                "Non-residents: Form W-7 / ITIN, passport copy",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 rounded-full bg-crimson-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 pt-6 border-t border-ink-100">
              <p className="eyebrow">Security</p>
              <p className="mt-4 text-sm text-ink-600 leading-relaxed">
                All uploads use TLS 1.3 in transit and AES-256 at rest. Files are stored on access-controlled servers and retained for 7 years per IRS rules.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </SitePage>
  );
}
