"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "formllc_offer_popup_closed_v2";
const SESSION_KEY = "formllc_offer_popup_seen_v1";

const HIDDEN_PREFIXES = [
  "/api",
  "/admin",
  "/dashboard",
  "/checkout",
  "/payment",
  "/paypal",
  "/tax-intake",
  "/us-tax-filing-intake",
  "/payment-intake",
  "/thank-you",
  "/us/thank-you",
];

export default function OfferPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const shouldHide = useMemo(() => {
    return HIDDEN_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    );
  }, [pathname]);

  const pricingHref = pathname?.startsWith("/us") ? "/us/pricing" : "/pricing";

  useEffect(() => {
    if (shouldHide) return;

    const closed = window.localStorage.getItem(STORAGE_KEY);
    if (closed === "1") return;
    const seen = window.sessionStorage.getItem(SESSION_KEY);
    if (seen === "1") return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    let shown = false;

    const showPopup = () => {
      if (shown) return;
      shown = true;
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(true);
    };

    const timer = window.setTimeout(showPopup, isMobile ? 12000 : 10000);

    const handleExitIntent = (event: MouseEvent) => {
      if (isMobile || event.relatedTarget || event.clientY > 24) return;
      window.clearTimeout(timer);
      showPopup();
    };

    if (!isMobile) {
      document.addEventListener("mouseout", handleExitIntent);
    }

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", handleExitIntent);
    };
  }, [shouldHide]);

  function closePopup() {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible || shouldHide) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-end justify-center bg-black/45 px-4 py-4 backdrop-blur-sm sm:items-center sm:px-6 sm:py-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="offer-popup-title"
    >
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-[28px] border border-white/10 bg-[#160808] text-cream-50 shadow-[0_28px_90px_rgba(0,0,0,0.42)] max-sm:max-h-[calc(100vh-1.5rem)] max-sm:overflow-y-auto">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-crimson-700/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-gold-400/12 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,18,48,0.18),transparent_42%),linear-gradient(135deg,rgba(31,10,10,0.94),rgba(13,5,5,0.88))]" />

        <button
          type="button"
          onClick={closePopup}
          aria-label="Close offer popup"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cream-50 shadow-sm transition hover:bg-white/10 hover:text-crimson-400"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative p-5 sm:p-6 md:p-7">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold-400 shadow-sm">
            Limited Offer
          </div>

          <h2
            id="offer-popup-title"
            className="font-display text-2xl leading-tight tracking-[-0.03em] text-cream-50 md:text-[1.75rem]"
          >
            Get $25 off your U.S. company setup
          </h2>

          <p className="mt-3 text-sm leading-6 text-ink-700">
            Start your LLC or C-Corp with FormLLC and use code{" "}
            <span className="rounded-md border border-crimson-300/30 bg-crimson-700/15 px-1.5 py-0.5 font-black text-crimson-400 shadow-sm">
              ANNIV25
            </span>{" "}
            at checkout or during consultation.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-sm">
              <div className="text-lg font-black text-ink-950">$25</div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-500">
                Discount
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-sm">
              <div className="text-lg font-black text-ink-950">50+</div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-500">
                States
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-sm">
              <div className="text-lg font-black text-ink-950">Online</div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-500">
                Process
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Link
              href={pricingHref}
              onClick={closePopup}
              className="btn btn-primary h-12 flex-1 rounded-full px-5 text-sm"
            >
              Claim $25 Off
            </Link>

            <button
              type="button"
              onClick={closePopup}
              className="btn btn-ghost h-12 flex-1 rounded-full px-5 text-sm"
            >
              Maybe Later
            </button>
          </div>

          <p className="mt-3 text-center text-[11px] leading-5 text-ink-500">
            Offer visibility is limited. Final eligibility may depend on selected service and state
            filing requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
