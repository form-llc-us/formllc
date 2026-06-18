"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReCaptcha from "./ReCaptcha";
import { Button } from "@/components/ui/Button";

const ENTITY_TYPES = ["LLC (single-member)", "LLC (multi-member)", "C-Corp", "S-Corp", "Partnership", "Sole Proprietorship"];
const TAX_YEARS = ["2025", "2024", "2023", "2022", "Other"];

export default function TaxIntakeForm({ variant = "tax-intake" }: { variant?: "tax-intake" | "us-tax-filing" }) {
  const router = useRouter();
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
    fd.set("g-recaptcha-response", captcha);
    fd.set("variant", variant);

    try {
      const res = await fetch("/api/tax-intake", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: Record<string, string>;
        error?: string;
        redirect?: string;
        ticket?: string;
      };
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        else setServerError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      router.push(data.redirect ?? `/thank-you?ticket=${encodeURIComponent(data.ticket ?? "")}`);
    } catch {
      setServerError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5" encType="multipart/form-data">
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
      <Field label="Entity name">
        <input className="input" name="entity_name" />
      </Field>
      <Field label="Entity type">
        <select className="select" name="entity_type" defaultValue="">
          <option value="" disabled>Select…</option>
          {ENTITY_TYPES.map((e) => <option key={e}>{e}</option>)}
        </select>
      </Field>
      <Field label="State of formation">
        <input className="input" name="state" placeholder="e.g. Wyoming" />
      </Field>
      <Field label="EIN (if you have one)">
        <input className="input" name="ein" placeholder="XX-XXXXXXX" />
      </Field>
      <Field label="Tax year">
        <select className="select" name="tax_year" defaultValue="">
          <option value="" disabled>Select…</option>
          {TAX_YEARS.map((y) => <option key={y}>{y}</option>)}
        </select>
      </Field>
      <Field label="Notes (optional)" className="md:col-span-2">
        <textarea className="textarea" name="notes" rows={4} />
      </Field>
      <Field label="Upload tax documents (PDF, JPG, PNG, ZIP up to 12MB each)" className="md:col-span-2">
        <input className="input !h-auto !py-2.5" type="file" name="files" multiple accept=".pdf,.jpg,.jpeg,.png,.zip" />
      </Field>

      <div className="md:col-span-2">
        <ReCaptcha onChange={setCaptcha} />
        {errors.captcha && <p className="mt-1 text-xs text-brand-700">{errors.captcha}</p>}
      </div>

      {serverError && <div className="md:col-span-2 rounded-2xl border border-crimson-300/30 bg-crimson-700/10 px-4 py-3 text-sm text-crimson-400">{serverError}</div>}

      <div className="flex justify-end md:col-span-2">
        <Button type="submit" size="lg" variant="primary" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit intake"}
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
