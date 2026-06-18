import type { Region } from "./site";

export type PlanKey = "starter" | "standard" | "rtr";

export type PlanFeature = {
  text: string;
  included: boolean;
  highlight?: boolean;
};

export type Plan = {
  key: PlanKey;
  label: string;
  tagline: string;
  basePrice: number;
  priceNote: string;
  popular?: boolean;
  features: PlanFeature[];
  cta: {
    label: string;
    href: string;
  };
  stateFeeMode?: boolean;
};

export type Addon = {
  key: string;
  label: string;
  price: string;
  description: string;
  chip: string;
  href: string;
};

export type ComparisonCell = boolean | "Add-on";

export type ComparisonGroup = {
  category: string;
  rows: {
    feature: string;
    values: [ComparisonCell, ComparisonCell, ComparisonCell];
  }[];
};

export const PLAN_LABELS = ["Starter", "Standard", "Registration-To-Revenue™"];

export const STATE_FEES: Record<string, number> = {
  Alabama: 200,
  Alaska: 250,
  Arizona: 50,
  Arkansas: 45,
  California: 70,
  Colorado: 50,
  Connecticut: 120,
  Delaware: 110,
  Florida: 125,
  Georgia: 100,
  Hawaii: 50,
  Idaho: 100,
  Illinois: 150,
  Indiana: 95,
  Iowa: 50,
  Kansas: 165,
  Kentucky: 40,
  Louisiana: 100,
  Maine: 175,
  Maryland: 100,
  Massachusetts: 500,
  Michigan: 50,
  Minnesota: 155,
  Mississippi: 50,
  Missouri: 50,
  Montana: 70,
  Nebraska: 100,
  Nevada: 75,
  "New Hampshire": 100,
  "New Jersey": 125,
  "New Mexico": 50,
  "New York": 200,
  "North Carolina": 125,
  "North Dakota": 135,
  Ohio: 99,
  Oklahoma: 100,
  Oregon: 100,
  Pennsylvania: 125,
  "Rhode Island": 150,
  "South Carolina": 110,
  "South Dakota": 150,
  Tennessee: 300,
  Texas: 300,
  Utah: 54,
  Vermont: 125,
  Virginia: 100,
  Washington: 200,
  "West Virginia": 100,
  Wisconsin: 130,
  Wyoming: 100,
  "Washington, DC": 99,
};

export const DEFAULT_STATE = "Wyoming";

const GLOBAL_PLANS: Plan[] = [
  {
    key: "starter",
    label: "Starter",
    tagline: "Budget-friendly U.S. LLC setup — Wyoming only.",
    basePrice: 399,
    priceNote: "All-Inclusive (Wyoming)",
    features: [
      { text: "Company Registration", included: true },
      { text: "EIN from IRS (No SSN Needed)", included: true },
      { text: "BOI Filing (FinCEN Compliant)", included: true },
      { text: "U.S. Business Address (1 Year)", included: true },
      { text: "Registered Agent Service (1 Year)", included: true },
      { text: "Operating Agreement", included: true },
      { text: "Company Certificate / Articles of Organization", included: true },
      { text: "Client Dashboard Access", included: true },
      { text: "Call, Email and WhatsApp Support", included: true },
    ],
    cta: { label: "Start Now", href: "/paypal/payment-399" },
  },
  {
    key: "standard",
    label: "Standard",
    tagline: "Everything in Starter, plus annual filing and bank setup support.",
    basePrice: 599,
    priceNote: "Starter + Compliance",
    features: [
      { text: "Company Registration (Wyoming)", included: true },
      { text: "EIN from IRS (No SSN Required)", included: true },
      { text: "BOI Filing (FinCEN Compliant)", included: true },
      { text: "Registered Agent + U.S. Address (1 Year)", included: true },
      { text: "Operating Agreement + Company Certificate", included: true },
      { text: "Annual Filing", included: true, highlight: true },
      { text: "Bank Account Setup Guidance", included: true },
      { text: "Client Dashboard Access", included: true },
      { text: "Call, Email and WhatsApp Support", included: true },
    ],
    cta: { label: "Start Now", href: "/paypal/payment-599" },
  },
  {
    key: "rtr",
    label: "Registration-To-Revenue™",
    tagline: "Everything you need — from registration to CPA tax filing.",
    basePrice: 1799,
    priceNote: "Everything + CPA Support",
    popular: true,
    features: [
      { text: "All Standard Features Included", included: true, highlight: true },
      { text: "CPA-Prepared Tax Filing (1120 & 5472)", included: true },
      { text: "IRS Notice Handling", included: true },
      { text: "BOI Re-filing Support if ownership changes", included: true },
      { text: "Business Bank Docs Pack", included: true },
      { text: "Priority Email & Filing Support", included: true },
      { text: "Compliance Review by U.S. CPA", included: true },
      { text: "Call, Email and WhatsApp Support", included: true },
    ],
    cta: { label: "Start Now", href: "/paypal/payment-1799" },
  },
];

const US_PLANS: Plan[] = [
  {
    key: "starter",
    label: "Starter",
    tagline: "Base $299 + state filing fees.",
    basePrice: 299,
    priceNote: "Base $299 + state fee",
    stateFeeMode: true,
    features: [
      { text: "Formation in 1–2 days", included: true },
      { text: "Expedited EIN from IRS in 24 hours", included: true },
      { text: "Operating Agreement", included: true },
      { text: "Articles of Organization and other documents", included: true },
      { text: "Registered Agent Service — 1 year", included: true },
      { text: "Virtual Mailing Address", included: true },
      { text: "Smart Dashboard — access docs and compliance", included: true },
      { text: "Compliance and taxation notifications", included: true },
      { text: "Free consultation on Google Meet", included: true },
    ],
    cta: { label: "Start Now", href: "/us/onboarding?plan=starter" },
  },
  {
    key: "standard",
    label: "Standard",
    tagline: "Base $1699 + state filing fees.",
    basePrice: 1699,
    priceNote: "Base $1699 + state fee",
    stateFeeMode: true,
    features: [
      { text: "Everything in Starter included", included: true, highlight: true },
      { text: "Annual State Filing", included: true },
      { text: "Free Dissolution", included: true },
      { text: "Bookkeeping dashboard", included: true },
      { text: "Track your transactions", included: true },
      { text: "Send invoices", included: true },
      { text: "Download financial reports", included: true },
      { text: "Connect multiple bank accounts", included: true },
    ],
    cta: { label: "Start Now", href: "/us/onboarding?plan=standard" },
  },
  {
    key: "rtr",
    label: "Registration-To-Revenue™",
    tagline: "Base $2499 + state filing fees.",
    basePrice: 2499,
    priceNote: "Base $2499 + state fee",
    popular: true,
    stateFeeMode: true,
    features: [
      { text: "All Standard Features Included", included: true, highlight: true },
      { text: "Annual State Tax Filing", included: true },
      { text: "Federal Tax Filing", included: true },
      { text: "Monthly / Quarterly Closing", included: true },
      { text: "Dedicated Bookkeeper", included: true },
      { text: "Priority Call and Email Support", included: true },
      { text: "Compliance Reviewed by a CPA", included: true },
    ],
    cta: { label: "Start Now", href: "/us/onboarding?plan=rtr" },
  },
];

export function getPlans(region: Region = "global") {
  return region === "us" ? US_PLANS : GLOBAL_PLANS;
}

export const GLOBAL_COMPARISON_ROWS: ComparisonGroup[] = [
  {
    category: "Company Formation",
    rows: [
      { feature: "LLC Registration", values: [true, true, true] },
      { feature: "EIN from IRS — No SSN Needed", values: [true, true, true] },
      { feature: "BOI Filing", values: [true, true, true] },
      { feature: "Operating Agreement + Certificate", values: [true, true, true] },
      { feature: "Client Dashboard", values: [true, true, true] },
    ],
  },
  {
    category: "Compliance & Legal",
    rows: [
      { feature: "Registered Agent — 1 Year", values: [true, true, true] },
      { feature: "U.S. Business Address — 1 Year", values: [true, true, true] },
      { feature: "Annual Filing", values: [false, true, true] },
      { feature: "Registered Agent Renewal", values: ["Add-on", true, true] },
    ],
  },
  {
    category: "Tax Filing",
    rows: [
      { feature: "IRS Tax Filing — 1120 & 5472", values: [false, false, true] },
      { feature: "CPA-Prepared Return", values: [false, false, true] },
      { feature: "IRS Notice Handling", values: [false, false, true] },
      { feature: "Penalty Avoidance Strategy", values: [false, true, true] },
    ],
  },
  {
    category: "Banking Support",
    rows: [
      { feature: "Bank Account Setup Guide", values: [true, true, true] },
      { feature: "Bank-Ready Document Pack", values: [false, true, true] },
      { feature: "Multi-currency Support", values: [false, true, true] },
    ],
  },
  {
    category: "Support & Add-ons",
    rows: [
      { feature: "Email Support", values: [true, true, true] },
      { feature: "Call / WhatsApp Support", values: [true, true, true] },
      { feature: "ITIN Application", values: ["Add-on", "Add-on", true] },
      { feature: "Annual Report Filing", values: ["Add-on", true, true] },
      { feature: "Sales Tax Permit", values: ["Add-on", "Add-on", true] },
    ],
  },
];

export const US_COMPARISON_ROWS: ComparisonGroup[] = [
  {
    category: "Company Formation",
    rows: [
      { feature: "Company formation in 1–2 days", values: [true, true, true] },
      { feature: "Expedited EIN in 24 hours", values: [true, true, true] },
      { feature: "Operating Agreement", values: [true, true, true] },
      { feature: "Membership & Validation Certificate", values: [true, true, true] },
      { feature: "Good Standing Certificate", values: [true, true, true] },
      { feature: "Registered Agent Service — 1 year", values: [true, true, true] },
    ],
  },
  {
    category: "Compliance & Legal",
    rows: [
      { feature: "Annual State Filing", values: [false, true, true] },
      { feature: "Federal Tax Filing", values: [false, false, true] },
      { feature: "Registered Agent Renewal", values: [false, true, true] },
      { feature: "BOI Report Filing", values: [true, true, true] },
      { feature: "Free Dissolution", values: [false, true, true] },
    ],
  },
  {
    category: "Tax Filing",
    rows: [
      { feature: "Federal Tax Filing Support", values: [false, false, true] },
      { feature: "CPA-Prepared Tax Return", values: [false, false, true] },
      { feature: "IRS Notice Handling", values: [false, false, true] },
      { feature: "State Government Notice Handling", values: [false, false, true] },
      { feature: "Licensed Tax Professional Consultation", values: [false, false, true] },
      { feature: "Compliance Reminders", values: [true, true, true] },
    ],
  },
  {
    category: "Bookkeeping & Analytics",
    rows: [
      { feature: "Track your transactions", values: [false, true, true] },
      { feature: "Invoice sending", values: [false, true, true] },
      { feature: "Financial report downloads", values: [false, true, true] },
      { feature: "Multiple bank account connection", values: [false, true, true] },
      { feature: "Monthly / quarterly closing", values: [false, false, true] },
      { feature: "Dedicated bookkeeper", values: [false, false, true] },
    ],
  },
  {
    category: "Support",
    rows: [
      { feature: "Email Support", values: [true, true, true] },
      { feature: "Call Support", values: [true, true, true] },
      { feature: "Free Online Consultation", values: [true, true, true] },
    ],
  },
];

export function getComparisonRows(region: Region = "global") {
  return region === "us" ? US_COMPARISON_ROWS : GLOBAL_COMPARISON_ROWS;
}

export const GLOBAL_ADDONS: Addon[] = [
  {
    key: "itin",
    label: "ITIN Application",
    price: "$250 Flat",
    chip: "Popular",
    href: "/paypal/payment-itin",
    description:
      "Includes CAA verification, passport processing, IRS submission, and international courier — all-inclusive and hassle-free.",
  },
  {
    key: "annual-report",
    label: "Annual Report Filing",
    price: "From $150",
    chip: "Compliance",
    href: "/paypal/payment-150",
    description:
      "Includes state report filing, compliance check, and official confirmation to keep your LLC in good standing.",
  },
  {
    key: "irs-tax-filing",
    label: "IRS Tax Filing (1120 & 5472)",
    price: "Starting From $200",
    chip: "Important",
    href: "/paypal/payment-200",
    description:
      "Annual federal return for foreign-owned LLCs. Includes both Form 1120 and 5472 preparation and filing.",
  },
  {
    key: "closure",
    label: "LLC Closure (Dissolution)",
    price: "From $150 + Penalty",
    chip: "Support",
    href: "/contact-us",
    description:
      "Close your LLC the right way to avoid ongoing state fees, penalties, and compliance issues.",
  },
  {
    key: "reinstatement",
    label: "LLC Reinstatement",
    price: "Custom Pricing",
    chip: "On Request",
    href: "/contact-us",
    description:
      "We assist in restoring LLCs that were suspended, inactive, or out of compliance — case-by-case support.",
  },
  {
    key: "sales-tax",
    label: "Sales Tax Permit",
    price: "From $100",
    chip: "Best for Ecommerce",
    href: "/paypal/payment-100",
    description:
      "Get your resale certificate and sales tax ID — essential for Amazon, Shopify, dropshipping, and retail sellers.",
  },
  {
    key: "registered-agent",
    label: "Registered Agent Renewal",
    price: "Starting From $50/year",
    chip: "Annual",
    href: "/paypal/payment-50",
    description:
      "Renews your Registered Agent service after the first free year to keep your LLC compliant with state laws.",
  },
];

export const US_ADDONS: Addon[] = [
  {
    key: "annual-report",
    label: "Annual Report Filing",
    price: "Start From $150",
    chip: "Compliance",
    href: "/paypal/payment-150",
    description:
      "Includes state report filing, compliance check, and official confirmation to keep your LLC in good standing.",
  },
  {
    key: "federal-tax",
    label: "Federal Tax Filing",
    price: "Start From $200",
    chip: "Important",
    href: "/paypal/payment-200",
    description:
      "Federal return preparation support based on your entity type and tax classification, with clear intake and CPA-ready documentation.",
  },
  {
    key: "dissolution",
    label: "LLC Dissolution",
    price: "From $150",
    chip: "Support",
    href: "/us/contact-us",
    description:
      "Close your company the right way to avoid ongoing state fees, penalties, and compliance issues.",
  },
  {
    key: "reinstatement",
    label: "LLC Reinstatement",
    price: "Custom Pricing",
    chip: "On Request",
    href: "/us/contact-us",
    description:
      "We assist in restoring LLCs that were suspended, inactive, or out of compliance — case-by-case support.",
  },
  {
    key: "sales-tax",
    label: "Sales Tax Permit",
    price: "From $100",
    chip: "Best for Ecommerce",
    href: "/paypal/payment-100",
    description:
      "Get your resale certificate and sales tax ID — essential for Amazon, Shopify, dropshipping, and retail sellers.",
  },
  {
    key: "registered-agent",
    label: "Registered Agent Renewal",
    price: "Starting From $50/year",
    chip: "Annual",
    href: "/paypal/payment-50",
    description:
      "Renews your Registered Agent service after the first free year to keep your LLC compliant with state laws.",
  },
];

export function getAddons(region: Region = "global") {
  return region === "us" ? US_ADDONS : GLOBAL_ADDONS;
}

export const PLANS = GLOBAL_PLANS;
export const ADDONS = GLOBAL_ADDONS;

/**
 * Wizard-specific pricing metadata.
 *
 * The onboarding wizard (src/components/forms/OnboardingWizard.tsx) and its
 * API route (src/app/api/onboarding/route.ts) compute the upsell total from
 * these maps rather than the public ADDONS array. Public marketing copy and
 * pricing pages continue to read from PLANS / ADDONS / STATE_FEES exactly as
 * before.
 *
 * NOTE: `website` and `seo` price values are intentionally 0 and must be set
 * by the business owner before exposing the corresponding add-on toggles to
 * customers. The wizard UI is unchanged.
 */
export const EIN_SPEED = {
  Standard: { eta: "4–8 weeks", price: 0 },
  Priority: { eta: "5–10 business days", price: 99 },
} as const;

export const WIZARD_ADDONS = {
  website: { label: "Custom website", price: 0 },
  seo: { label: "On-page SEO", price: 0 },
} as const;