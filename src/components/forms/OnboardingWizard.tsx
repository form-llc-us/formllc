"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { US_STATES, STATE_FEE_MAP } from "@data/states";
import { PLANS, WIZARD_ADDONS, EIN_SPEED, type PlanKey } from "@data/pricing";
import ReCaptcha from "./ReCaptcha";
import { Button } from "@/components/ui/Button";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

type State = {
  account: { first_name: string; last_name: string; phone: string; email: string };
  country: string;
  intent: "new" | "existing" | "";
  entity_main: "LLC" | "C-Corp" | "";
  corp_tax: "C-Corp" | "S-Corp" | "";
  company_name: string;
  formation_state: string;
  plan_key: PlanKey;
  ein_speed: keyof typeof EIN_SPEED;
  addons: { website: boolean; seo: boolean };
  pay: { email: string; name: string; country: string; card_last4: string };
};

const initial: State = {
  account: { first_name: "", last_name: "", phone: "", email: "" },
  country: "United States",
  intent: "",
  entity_main: "",
  corp_tax: "",
  company_name: "",
  formation_state: "Wyoming",
  plan_key: "standard",
  ein_speed: "Standard",
  addons: { website: false, seo: false },
  pay: { email: "", name: "", country: "United States", card_last4: "" },
};

export default function OnboardingWizard({ initialPlan }: { initialPlan?: PlanKey }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<State>({ ...initial, plan_key: initialPlan ?? "standard" });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState("");

  const plan = PLANS.find((p) => p.key === data.plan_key)!;
  const stateFee = STATE_FEE_MAP[data.formation_state] ?? 100;
  const einPriority = data.ein_speed === "Priority" ? EIN_SPEED.Priority.price : 0;
  const addonTotal =
    (data.addons.website ? WIZARD_ADDONS.website.price : 0) + (data.addons.seo ? WIZARD_ADDONS.seo.price : 0);

  const total = useMemo(() => plan.basePrice + stateFee + einPriority + addonTotal,
    [plan.basePrice, stateFee, einPriority, addonTotal]);

  function next() { setStep((s) => (Math.min(6, s + 1) as Step)); }
  function back() { setStep((s) => (Math.max(1, s - 1) as Step)); }

  function update<K extends keyof State>(key: K, value: State[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function submit() {
    setSubmitting(true);
    setErrors({});
    setServerError(null);

    const payload = {
      ...data,
      "g-recaptcha-response": captcha,
      pricing: {
        plan_label: plan.label,
        plan_base: plan.basePrice,
        state_fee: stateFee,
        ein_priority: einPriority,
        addons_total: addonTotal,
        total_due_today: total,
      },
    };

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: Record<string, string>; error?: string; redirect?: string; ticket?: string };
      if (!res.ok || !out.ok) {
        if (out.errors) setErrors(out.errors);
        else setServerError(out.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      router.push(out.redirect ?? `/us/thank-you?ticket=${encodeURIComponent(out.ticket ?? "")}`);
    } catch {
      setServerError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="card mx-auto max-w-3xl p-6 md:p-8 lg:p-9">
      <ProgressBar step={step} />

      {step === 1 && (
        <Step title="Tell us about you" subtitle="Five quick details — we'll tailor the wizard from here.">
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <Field label="First name" error={errors["account.first_name"]}>
              <input className="input" value={data.account.first_name} onChange={(e) => update("account", { ...data.account, first_name: e.target.value })} />
            </Field>
            <Field label="Last name" error={errors["account.last_name"]}>
              <input className="input" value={data.account.last_name} onChange={(e) => update("account", { ...data.account, last_name: e.target.value })} />
            </Field>
            <Field label="Email" error={errors["account.email"]}>
              <input className="input" type="email" value={data.account.email} onChange={(e) => update("account", { ...data.account, email: e.target.value })} />
            </Field>
            <Field label="Phone (with country code)" error={errors["account.phone"]}>
              <input className="input" value={data.account.phone} placeholder="+1..." onChange={(e) => update("account", { ...data.account, phone: e.target.value })} />
            </Field>
            <Field label="Country" className="md:col-span-2">
              <input className="input" value={data.country} onChange={(e) => update("country", e.target.value)} />
            </Field>
          </div>
        </Step>
      )}

      {step === 2 && (
        <Step title="What are we doing?" subtitle="New formation or existing entity moving to FormLLC.">
          <div className="grid gap-4 md:grid-cols-2">
            {(["new", "existing"] as const).map((v) => (
              <button key={v} onClick={() => update("intent", v)} className={`text-left card p-5 border ${data.intent === v ? "ring-2 ring-brand-500 border-brand-300" : "border-ink-100"}`} type="button">
                <div className="text-lg font-semibold text-ink-900">{v === "new" ? "Start a new company" : "I already have a U.S. company"}</div>
                <p className="mt-1 text-sm text-ink-500">{v === "new" ? "Form an LLC, C-Corp, or S-Corp from scratch." : "Switch your registered agent, bookkeeping, or tax filing to FormLLC."}</p>
              </button>
            ))}
          </div>
        </Step>
      )}

      {step === 3 && (
        <Step title="Pick an entity" subtitle="If you're not sure, we'll cover this on your free consult.">
          <div className="grid gap-4 md:grid-cols-2">
            {(["LLC", "C-Corp"] as const).map((v) => (
              <button key={v} onClick={() => update("entity_main", v)} className={`text-left card p-5 border ${data.entity_main === v ? "ring-2 ring-brand-500 border-brand-300" : "border-ink-100"}`} type="button">
                <div className="text-lg font-semibold text-ink-900">{v}</div>
                <p className="mt-1 text-sm text-ink-500">{v === "LLC" ? "Pass-through taxation. Best for most founders." : "Double-tax + fundraising-friendly. Required for most VC rounds."}</p>
              </button>
            ))}
          </div>
          {data.entity_main === "LLC" && (
            <div className="mt-6">
              <Field label="Tax election (optional)">
                <div className="flex flex-wrap gap-2">
                  {(["", "C-Corp", "S-Corp"] as const).map((v) => (
                    <button key={v || "default"} onClick={() => update("corp_tax", v)} className={`h-10 rounded-full border px-4 text-sm font-semibold transition ${data.corp_tax === v ? "border-crimson-600 bg-crimson-600 text-white shadow-button" : "border-ink-200 bg-white text-ink-600 hover:border-crimson-300 hover:text-crimson-700"}`} type="button">
                      {v === "" ? "Default (disregarded / partnership)" : `Elect ${v}`}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          )}
        </Step>
      )}

      {step === 4 && (
        <Step title="Company details" subtitle="State of formation and proposed company name.">
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <Field label="State of formation">
              <select className="select" value={data.formation_state} onChange={(e) => update("formation_state", e.target.value)}>
                {US_STATES.map((s) => <option key={s.code}>{s.name}</option>)}
              </select>
            </Field>
            <Field label="Proposed company name" hint="We'll add LLC or Inc. automatically.">
              <input className="input" value={data.company_name} onChange={(e) => update("company_name", e.target.value)} />
            </Field>
          </div>
        </Step>
      )}

      {step === 5 && (
        <Step title="Pick your plan" subtitle="You can switch plans later — no penalty.">
          <div className="grid gap-4 md:grid-cols-3">
            {PLANS.map((p) => (
              <button key={p.key} onClick={() => update("plan_key", p.key)} className={`text-left card p-5 border h-full ${data.plan_key === p.key ? "ring-2 ring-brand-500 border-brand-300" : "border-ink-100"}`} type="button">
                {p.popular && <span className="badge mb-2">Most popular</span>}
                <div className="text-lg font-bold text-ink-900">{p.label}</div>
                <div className="mt-1 text-2xl font-extrabold text-brand-600">${p.basePrice}</div>
                <p className="mt-2 text-xs text-ink-500">{p.tagline}</p>
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
            <Field label="EIN speed">
              <select className="select" value={data.ein_speed} onChange={(e) => update("ein_speed", e.target.value as keyof typeof EIN_SPEED)}>
                <option value="Standard">Standard ({EIN_SPEED.Standard.eta}) — included</option>
                <option value="Priority">Priority ({EIN_SPEED.Priority.eta}) — +$99</option>
              </select>
            </Field>
            <Field label="Add-ons">
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={data.addons.website} onChange={(e) => update("addons", { ...data.addons, website: e.target.checked })} className="h-4 w-4 rounded text-brand-600" />
                  Custom website (+${WIZARD_ADDONS.website.price})
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={data.addons.seo} onChange={(e) => update("addons", { ...data.addons, seo: e.target.checked })} className="h-4 w-4 rounded text-brand-600" />
                  On-page SEO (+${WIZARD_ADDONS.seo.price})
                </label>
              </div>
            </Field>
          </div>
        </Step>
      )}

      {step === 6 && (
        <Step title="Review & confirm" subtitle="One last look. Pay nothing until you click submit.">
          <div className="card p-5 md:p-6">
            <Row label="Plan" value={`${plan.label} ($${plan.basePrice})`} />
            <Row label="Entity" value={`${data.entity_main || "—"}${data.corp_tax ? ` → ${data.corp_tax}` : ""}`} />
            <Row label="State of formation" value={`${data.formation_state} (state filing fee $${stateFee})`} />
            <Row label="Company name" value={data.company_name || "—"} />
            <Row label="EIN speed" value={`${data.ein_speed}${einPriority ? ` (+$${einPriority})` : ""}`} />
            {data.addons.website && <Row label="Add-on" value={`Custom website (+$${WIZARD_ADDONS.website.price})`} />}
            {data.addons.seo && <Row label="Add-on" value={`On-page SEO (+$${WIZARD_ADDONS.seo.price})`} />}
            <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-4">
              <span className="font-semibold text-ink-900">Total due today</span>
              <span className="text-2xl font-extrabold text-brand-600">${total}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-5">
            <Field label="Cardholder name">
              <input className="input" value={data.pay.name} onChange={(e) => update("pay", { ...data.pay, name: e.target.value })} />
            </Field>
            <Field label="Billing email">
              <input className="input" type="email" value={data.pay.email} onChange={(e) => update("pay", { ...data.pay, email: e.target.value })} />
            </Field>
            <Field label="Billing country">
              <input className="input" value={data.pay.country} onChange={(e) => update("pay", { ...data.pay, country: e.target.value })} />
            </Field>
            <Field label="Card last 4 (we'll charge via PayPal/Stripe on the next step)">
              <input className="input" maxLength={4} pattern="\d{4}" value={data.pay.card_last4} onChange={(e) => update("pay", { ...data.pay, card_last4: e.target.value.replace(/\D/g, "").slice(0, 4) })} />
            </Field>
          </div>

          <div className="mt-6">
            <ReCaptcha onChange={setCaptcha} />
          </div>

          {serverError && <div className="mt-4 rounded-2xl border border-crimson-300/30 bg-crimson-700/10 px-4 py-3 text-sm text-crimson-400">{serverError}</div>}
        </Step>
      )}

      <div className="mt-8 flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
        <Button variant="ghost" size="md" onClick={back} disabled={step === 1} type="button">← Back</Button>
        {step < 6 ? (
          <Button variant="primary" size="lg" onClick={next} type="button">Continue →</Button>
        ) : (
          <Button variant="primary" size="lg" onClick={submit} disabled={submitting} type="button">
            {submitting ? "Submitting…" : `Submit & pay $${total}`}
          </Button>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ step }: { step: Step }) {
  const labels = ["You", "Goal", "Entity", "Company", "Plan", "Review"];
  return (
    <div className="mb-8">
      <div className="flex items-center gap-1">
        {labels.map((label, i) => {
          const idx = i + 1;
          const done = idx < step;
          const current = idx === step;
          return (
            <div key={label} className="flex-1 flex items-center gap-1">
              <div className={`flex items-center gap-2 ${current ? "text-cream-50" : done ? "text-crimson-400" : "text-ink-500"}`}>
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${done ? "bg-crimson-600 text-white" : current ? "bg-crimson-700 text-white shadow-button" : "bg-cream-100 text-ink-500 border border-ink-200"}`}>{done ? "✓" : idx}</span>
                <span className="hidden md:inline text-xs font-semibold">{label}</span>
              </div>
              {idx < labels.length && <div className={`h-px flex-1 ${idx < step ? "bg-crimson-500" : "bg-ink-200"}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Step({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-ink-900">{title}</h2>
      {subtitle && <p className="mt-2 text-ink-500">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({ label, error, hint, children, className = "" }: { label: string; error?: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm font-bold text-cream-50">{label}</span>
      {hint && <span className="mt-0.5 block text-xs leading-5 text-ink-500">{hint}</span>}
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1 block text-xs text-brand-700">{error}</span>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm py-1.5">
      <span className="text-ink-500">{label}</span>
      <span className="font-medium text-ink-900">{value}</span>
    </div>
  );
}
