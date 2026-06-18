"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      render: (el: HTMLElement, opts: { sitekey: string; callback: (t: string) => void; "expired-callback"?: () => void }) => number;
      reset: (id?: number) => void;
      ready: (cb: () => void) => void;
    };
    onRecaptchaLoad?: () => void;
  }
}

let scriptLoaded = false;
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (scriptLoaded) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve) => {
    const existing = document.querySelector('script[src*="recaptcha/api.js"]');
    if (existing) {
      scriptLoaded = true;
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export default function ReCaptcha({
  onChange,
}: {
  onChange: (token: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<number | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  useEffect(() => {
    if (!siteKey || !ref.current) return;

    let mounted = true;
    loadScript().then(() => {
      if (!mounted || !ref.current || !window.grecaptcha) return;
      window.grecaptcha.ready(() => {
        if (!ref.current || widgetId.current !== null) return;
        widgetId.current = window.grecaptcha!.render(ref.current, {
          sitekey: siteKey,
          callback: onChange,
          "expired-callback": () => onChange(""),
        });
      });
    });

    return () => {
      mounted = false;
    };
  }, [siteKey, onChange]);

  if (!siteKey) {
    return (
      <p className="text-xs text-ink-400">
        reCAPTCHA disabled (set <code>NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code>)
      </p>
    );
  }

  return <div ref={ref} className="g-recaptcha" />;
}
