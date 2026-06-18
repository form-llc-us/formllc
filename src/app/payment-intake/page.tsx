import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import { Section } from "@/components/ui/Section";
import PaymentIntakeForm from "@/components/forms/PaymentIntakeForm";
import PageHero from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Payment Intake",
  description: "Securely submit your payment details and complete checkout via PayPal.",
  alternates: { canonical: "/payment-intake" },
  robots: { index: false, follow: false },
};

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PaymentIntakePage({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const amount = Number(typeof sp.amount === "string" ? sp.amount : "299");
  const service = typeof sp.service === "string" ? sp.service : undefined;

  return (
    <SitePage region="global">
      <PageHero
        eyebrow="Checkout"
        title={
          <>
            Confirm your details — pay{" "}
            <span className="gradient-text">${amount}</span> via PayPal.
          </>
        }
        description="Your payment is processed securely by PayPal. We'll send a confirmation email and your dedicated specialist will reach out within one business day."
      />

      <Section tone="muted">
        <div className="max-w-2xl mx-auto">
          <div className="card p-7 md:p-8">
            <PaymentIntakeForm amount={amount} service={service} />
          </div>
        </div>
      </Section>
    </SitePage>
  );
}
