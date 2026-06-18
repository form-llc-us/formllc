import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SitePage from "@/components/site/SitePage";
import PageHero from "@/components/site/PageHero";
import { Section } from "@/components/ui/Section";
import PaymentIntakeForm from "@/components/forms/PaymentIntakeForm";

type Params = Promise<{ amount: string }>;

const ITIN_AMOUNT = 399;
const KNOWN_AMOUNTS = new Set([50, 100, 125, 150, 200, 225, 250, 300, 325, 350, 375, 399, 400, 575, 599, 1799]);

export const metadata: Metadata = {
  title: "Secure Payment | FormLLC",
  description: "Complete your secure FormLLC payment through PayPal.",
  robots: { index: false, follow: false },
};

function parsePayment(raw: string) {
  const token = raw.trim().toLowerCase().replace(/^payment-/, "");

  if (token === "itin") {
    return {
      amount: ITIN_AMOUNT,
      label: "ITIN application payment",
      description: "Complete your ITIN application payment securely through PayPal.",
    };
  }

  const amount = Number(token);
  if (!Number.isInteger(amount) || amount <= 0) notFound();

  return {
    amount,
    label: KNOWN_AMOUNTS.has(amount) ? `FormLLC service payment - $${amount}` : `Custom FormLLC payment - $${amount}`,
    description: "Complete the payment amount provided by our team. You will be redirected to PayPal after submitting this secure form.",
  };
}

export default async function PayPalAmountPage({ params }: { params: Params }) {
  const { amount: rawAmount } = await params;
  const payment = parsePayment(rawAmount);

  return (
    <SitePage region="global">
      <PageHero
        eyebrow="Secure PayPal checkout"
        title={`Pay $${payment.amount} securely.`}
        description={payment.description}
        secondary={{ label: "Need help?", href: "/contact-us" }}
      />

      <Section tight>
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <aside className="premium-card">
            <span className="eyebrow">Payment summary</span>
            <h2 className="mt-5 font-display text-4xl leading-none tracking-[-0.04em] text-cream-50">
              ${payment.amount}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              {payment.label}
            </p>
            <div className="luxury-divider my-6" />
            <p className="text-sm leading-relaxed text-ink-500">
              Payments are processed through PayPal. This page only collects the details needed to match your payment with your FormLLC request.
            </p>
          </aside>

          <div className="premium-card">
            <PaymentIntakeForm amount={payment.amount} service={payment.label} />
          </div>
        </div>
      </Section>
    </SitePage>
  );
}
