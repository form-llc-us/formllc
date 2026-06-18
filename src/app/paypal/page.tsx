import type { Metadata } from "next";
import Link from "next/link";
import SitePage from "@/components/site/SitePage";
import PageHero from "@/components/site/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";

const PAYMENT_AMOUNTS = [50, 100, 125, 150, 200, 225, 250, 300, 325, 350, 375, 399, 400, 575, 599, 1799];

export const metadata: Metadata = {
  title: "Secure PayPal Payments | FormLLC",
  description: "Complete a secure FormLLC service payment through PayPal.",
  robots: { index: false, follow: false },
};

export default function PayPalIndexPage() {
  return (
    <SitePage region="global">
      <PageHero
        eyebrow="Secure payment"
        title="Complete your FormLLC payment."
        description="Choose the payment amount provided by our team. You will enter your contact details before being redirected to PayPal."
        primary={{ label: "Contact support", href: "/contact-us" }}
        secondary={{ label: "View pricing", href: "/pricing" }}
      />

      <Section>
        <SectionHeading
          eyebrow="Payment links"
          title="Select your approved payment amount."
          description="These links preserve the legacy PayPal payment URLs while using the current secure payment intake flow."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAYMENT_AMOUNTS.map((amount) => (
            <Link
              key={amount}
              href={`/paypal/payment-${amount}`}
              className="card group flex min-h-[132px] flex-col justify-between p-5"
            >
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-ink-500">
                Payment amount
              </span>
              <span className="mt-4 font-display text-4xl leading-none tracking-[-0.04em] text-cream-50">
                ${amount}
              </span>
              <span className="mt-5 text-sm font-bold text-crimson-600 transition-colors group-hover:text-crimson-700">
                Continue -&gt;
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <LinkButton href="/paypal/payment-itin" variant="ghost" size="lg">
            ITIN application payment
          </LinkButton>
        </div>
      </Section>
    </SitePage>
  );
}
