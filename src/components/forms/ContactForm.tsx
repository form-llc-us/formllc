"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { US_STATES } from "@data/states";
import ReCaptcha from "./ReCaptcha";
import { Button } from "@/components/ui/Button";

const ENTITY_OPTIONS = ["LLC", "C-Corp", "S-Corp", "Sole Proprietorship", "Partnership", "Other"];

const SUBJECT_OPTIONS = [
  "LLC Formation",
  "EIN / ITIN",
  "Annual Report",
  "Tax Filing",
  "Banking",
  "Foreign Qualification",
  "Other",
];

export default function ContactForm({ region = "global" }: { region?: "global" | "us" }) {
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
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => (payload[k] = String(v)));
    payload["g-recaptcha-response"] = captcha;

    try {
      const url = region === "us" ? "/api/us/contact" : "/api/contact";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

      const ticket = data.ticket ?? "";
      const name = encodeURIComponent(payload.name ?? "");
      const subject = encodeURIComponent(payload.subject ?? "");
      const target =
        data.redirect ??
        `${region === "us" ? "/us" : ""}/thank-you?name=${name}&subject=${subject}&ticket=${encodeURIComponent(ticket)}`;
      router.push(target);
    } catch (err) {
      setServerError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5" noValidate>
      <input type="text" name="company" autoComplete="off" tabIndex={-1} aria-hidden className="hidden" />

      <Field label="Full name" error={errors.name}>
        <input className="input" name="name" required autoComplete="name" />
      </Field>
      <Field label="Email" error={errors.email}>
        <input className="input" name="email" type="email" required autoComplete="email" />
      </Field>
      <Field label="Phone (with country code)" hint="e.g. +15550000000" error={errors.contact_no}>
        <input className="input" name="contact_no" required placeholder="+1..." autoComplete="tel" />
      </Field>
      <Field label="WhatsApp (optional)" error={errors.whatsapp}>
        <input className="input" name="whatsapp" placeholder="+91..." />
      </Field>
      <Field label="Country" error={errors.country}>
        <input className="input" name="country" required autoComplete="country-name" />
      </Field>
      <Field label="State of formation" error={errors.state}>
        <select className="select" name="state" required defaultValue="">
          <option value="" disabled>Select a state</option>
          {US_STATES.map((s) => (
            <option key={s.code} value={s.name}>{s.name}</option>
          ))}
        </select>
      </Field>
      <Field label="Entity type" error={errors.entity}>
        <select className="select" name="entity" required defaultValue="">
          <option value="" disabled>Select…</option>
          {ENTITY_OPTIONS.map((e) => (<option key={e}>{e}</option>))}
        </select>
      </Field>
      <Field label="Subject" error={errors.subject}>
        <select className="select" name="subject" required defaultValue="">
          <option value="" disabled>Select…</option>
          {SUBJECT_OPTIONS.map((s) => (<option key={s}>{s}</option>))}
        </select>
      </Field>
      <Field label="How can we help?" error={errors.message} className="md:col-span-2">
        <textarea className="textarea" name="message" rows={5} required />
      </Field>

      <div className="md:col-span-2">
        <ReCaptcha onChange={setCaptcha} />
        {errors.captcha && <p className="mt-1 text-xs text-brand-700">{errors.captcha}</p>}
        {errors.duplicate && <p className="mt-1 text-xs text-brand-700">{errors.duplicate}</p>}
      </div>

      {serverError && (
        <div className="md:col-span-2 rounded-2xl border border-crimson-300/30 bg-crimson-700/10 px-4 py-3 text-sm text-crimson-400">{serverError}</div>
      )}

      <div className="flex justify-end md:col-span-2">
        <Button type="submit" size="lg" variant="primary" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label, error, hint, children, className = "",
}: { label: string; error?: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm font-bold text-cream-50">{label}</span>
      {hint && <span className="mt-0.5 block text-xs leading-5 text-ink-500">{hint}</span>}
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1 block text-xs text-brand-700">{error}</span>}
    </label>
  );
}
