import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import { Section } from "@/components/ui/Section";
import OnboardingWizard from "@/components/forms/OnboardingWizard";
import type { PlanKey } from "@data/pricing";

export const metadata: Metadata = {
  title: "Onboarding Wizard",
  description: "Build your FormLLC plan in 5 minutes. Pick your entity, state, plan, and add-ons.",
  alternates: { canonical: "/us/onboarding" },
};

type Props = { searchParams?: Promise<Record<string, string | string[] | undefined>> };

export default async function Page({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const planParam = typeof sp.plan === "string" ? sp.plan : undefined;
  const initialPlan: PlanKey | undefined =
    planParam === "starter" || planParam === "standard" || planParam === "rtr" ? planParam : undefined;

  return (
    <SitePage region="us">
      <section className="bg-soft-premium">
        <div className="container-x py-14 md:py-16 max-w-3xl">
          <span className="eyebrow">Onboarding</span>
          <h1 className="premium-heading mt-6 !text-[2.5rem] md:!text-[3rem]">
            Build your plan in <span className="gradient-text">5 minutes.</span>
          </h1>
          <p className="premium-subtitle mt-5">
            Tell us about your entity, state of formation, plan, and add-ons. We'll handle filing, EIN, banking, and tax setup from there.
          </p>
        </div>
      </section>

      <Section tone="muted">
        <OnboardingWizard initialPlan={initialPlan} />
      </Section>
    </SitePage>
  );
}
