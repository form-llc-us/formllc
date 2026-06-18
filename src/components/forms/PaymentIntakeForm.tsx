"use client";

import { useState } from "react";
import ReCaptcha from "./ReCaptcha";
import { Button } from "@/components/ui/Button";

export default function PaymentIntakeForm({ amount, service }: { amount: number; service?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setServerError(null);

    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = {};
    fd.forEach((v, k) => (payload[k] = String(v)));
    payload.amount = amount;
    payload.service = service ?? `Service ($${amount})`;
    payload["g-recaptcha-response"] = captcha;

    try {
      const res = await fetch("/api/payment-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: Record<string, string>;
        error?: string;
        redirect?: string;
        paypal_url?: string;
      };

      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        else setServerError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      if (data.paypal_url) {
        window.location.href = data.paypal_url;
        return;
      }
      window.location.href = data.redirect ?? "/thank-you";
    } catch {
      setServerError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
      <input type="text" name="company" autoComplete="off" tabIndex={-1} aria-hidden className="hidden" />

      <Field label="Full name" error={errors.name}>
        <input className="input" name="name" required />
      </Field>
      <Field label="Email" error={errors.email}>
        <input className="input" name="email" type="email" required />
      </Field>
      <Field label="Phone (with country code)" error={errors.phone}>
        <input className="input" name="phone" placeholder="+1..." />
      </Field>
      <Field label="Country">
        <input className="input" name="country" />
      </Field>
      <Field label="Notes (optional)" className="md:col-span-2">
        <textarea className="textarea" name="notes" rows={3} />
      </Field>

      <div className="md:col-span-2">
        <ReCaptcha onChange={setCaptcha} />
        {errors.captcha && <p className="mt-1 text-xs text-brand-700">{errors.captcha}</p>}
      </div>

      {serverError && <div className="md:col-span-2 rounded-2xl border border-crimson-300/30 bg-crimson-700/10 px-4 py-3 text-sm text-crimson-400">{serverError}</div>}

      <div className="flex flex-col items-stretch justify-between gap-3 pt-2 sm:flex-row sm:items-center md:col-span-2">
        <p className="text-sm text-ink-600">You'll be redirected to <strong>PayPal</strong> to complete payment securely.</p>
        <Button type="submit" size="lg" variant="primary" disabled={submitting}>
          {submitting ? "Processing…" : `Pay $${amount} via PayPal`}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, error, children, className = "" }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm font-bold text-cream-50">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1 block text-xs text-brand-700">{error}</span>}
    </label>
  );
}
