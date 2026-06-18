import type { ComparisonProps } from "@/components/site/ComparisonPage";

type CommonOpts = {
  startingPrice: string;
  ein: boolean | string;
  agent: boolean | string;
  banking: boolean | string;
  annualReport?: boolean | string;
  federalTax?: boolean | string;
  bookkeeping?: boolean | string;
  successManager?: boolean | string;
  replySpeed?: boolean | string;
  states?: boolean | string;
  guarantee?: boolean | string;
  bestFor?: string;
};

const COMMON_ROWS = (_competitor: string, opts: CommonOpts) => [
  {
    feature: "Starting price",
    formllc: "$299 + state fee",
    competitor: opts.startingPrice,
    note: "Compare total first-year and renewal cost, not only the headline formation price.",
  },
  {
    feature: "Best for",
    formllc: "Non-U.S. founders who want formation, EIN, banking guidance, compliance, and tax support in one place",
    competitor: opts.bestFor ?? "General business formation",
  },
  {
    feature: "EIN support",
    formllc: true,
    competitor: opts.ein,
    note: "FormLLC supports non-U.S. founders with SS-4/EIN guidance where online EIN is not available.",
  },
  {
    feature: "Registered agent (1st year)",
    formllc: true,
    competitor: opts.agent,
  },
  {
    feature: "Banking and payment guidance",
    formllc: true,
    competitor: opts.banking,
    note: "Guidance for Mercury, Relay, Stripe, PayPal, Wise, Payoneer and similar platforms. Account approval depends on the provider’s KYC review.",
  },
  {
    feature: "Annual report filing support",
    formllc: true,
    competitor: opts.annualReport ?? "Available / extra",
  },
  {
    feature: "Federal tax filing support",
    formllc: "Available for 1120, 5472, 1065 and related filings",
    competitor: opts.federalTax ?? "Usually separate or plan-dependent",
    note: "Useful for foreign-owned LLCs that need U.S. informational filings after formation.",
  },
  {
    feature: "Bookkeeping",
    formllc: "Optional add-on",
    competitor: opts.bookkeeping ?? "Plan-dependent / extra",
  },
  {
    feature: "Dedicated success manager",
    formllc: true,
    competitor: opts.successManager ?? "Plan-dependent",
  },
  {
    feature: "Human support for non-resident cases",
    formllc: true,
    competitor: opts.replySpeed ?? "Standard support",
    note: "FormLLC is positioned around founder-by-founder guidance instead of only self-service checkout.",
  },
  {
    feature: "All 50 states + DC",
    formllc: true,
    competitor: opts.states ?? true,
  },
  {
    feature: "Refund / guarantee terms",
    formllc: "Money-back guarantee available under FormLLC policy",
    competitor: opts.guarantee ?? "Provider-specific terms apply",
    note: "Always check each provider’s refund policy before ordering.",
  },
];

export const COMPARISONS: Record<string, ComparisonProps> = {
  doola: {
    competitorName: "Doola",
    competitorTagline: "A popular U.S. company formation platform for global founders.",
    intro:
      "Doola is one of the better-known options for non-U.S. founders and its Starter plan publicly includes formation, EIN, bank account guidance, business address, and registered agent service. The difference is positioning: FormLLC is built for founders who want a more hands-on team for formation, EIN, banking/payment guidance, annual compliance, and U.S. federal tax filing support together.",
    rows: COMMON_ROWS("Doola", {
      startingPrice: "$297/year + state fee",
      ein: true,
      agent: true,
      banking: "Bank account guidance",
      annualReport: "Not in Starter / compliance plan-dependent",
      federalTax: "Plan-dependent / separate compliance service",
      bookkeeping: "Available in higher plans / add-on",
      successManager: "Plan-dependent",
      replySpeed: "Standard platform support",
      states: true,
      guarantee: "Formation guarantee advertised",
      bestFor: "Founders who want a subscription-style formation and compliance platform",
    }),
    verdict:
      "Doola is a strong competitor, especially for founders who want a subscription-style platform. FormLLC is the better fit when you want a more hands-on, founder-led service with formation, EIN guidance, banking/payment introductions, annual compliance, and federal tax filing support handled by one team.",
  },

  bizee: {
    competitorName: "Bizee",
    competitorTagline: "Formerly Incfile — a high-volume, low-cost business formation provider.",
    intro:
      "Bizee is one of the lowest-cost formation services, with public packages starting at $0 + state fee and first-year registered agent service included. That makes it attractive for budget-conscious U.S. founders. FormLLC is positioned differently: we are not trying to be the cheapest checkout; we are focused on global founders who need EIN guidance, banking/payment setup guidance, annual compliance, and tax filing support after formation.",
    rows: COMMON_ROWS("Bizee", {
      startingPrice: "$0–$299 + state fee",
      ein: "$70 service / package-dependent",
      agent: true,
      banking: "Basic banking documents / limited guidance",
      annualReport: "Available / extra",
      federalTax: "Not core formation package",
      bookkeeping: "Not core formation package",
      successManager: false,
      replySpeed: "Business-hours support",
      states: true,
      guarantee: "Provider-specific cancellation/refund terms",
      bestFor: "Budget-conscious founders who mainly need low-cost filing",
    }),
    verdict:
      "Bizee is useful if the main goal is the lowest possible filing cost. FormLLC is stronger for non-U.S. founders who want guided setup beyond the articles of organization — especially EIN, banking/payment readiness, annual compliance, and federal tax filing support.",
  },

  atlas: {
    competitorName: "Stripe Atlas",
    competitorTagline: "Stripe’s Delaware startup incorporation product.",
    intro:
      "Stripe Atlas is excellent for venture-style Delaware startups. Its public offer includes Delaware incorporation, EIN, founder equity issuance, 83(b) election support, Stripe credits, partner discounts, and first-year registered agent service for a $500 one-time setup fee. FormLLC is better when the founder needs more flexibility: LLC or corporation, any state, non-resident EIN handling, broader banking/payment guidance, and ongoing compliance support beyond the Stripe ecosystem.",
    rows: COMMON_ROWS("Stripe Atlas", {
      startingPrice: "$500 one-time",
      ein: true,
      agent: true,
      banking: "Stripe ecosystem / startup banking path",
      annualReport: "Ongoing maintenance separate",
      federalTax: "Not included as full tax filing service",
      bookkeeping: "Not core package",
      successManager: "Platform-led support",
      replySpeed: "Standard Stripe/Atlas support",
      states: "Delaware-focused",
      guarantee: "Provider-specific terms apply",
      bestFor: "Delaware C-Corp startups preparing for funding and Stripe use",
    }),
    verdict:
      "Pick Stripe Atlas if you specifically want a Delaware startup structure, founder equity workflow, 83(b), Stripe credits, and venture-style documentation. Pick FormLLC if you want state/entity flexibility, LLC support, global-founder EIN guidance, banking/payment introductions, and ongoing compliance/tax support.",
  },

  zenbusiness: {
    competitorName: "ZenBusiness",
    competitorTagline: "A U.S.-focused formation and compliance platform for small businesses.",
    intro:
      "ZenBusiness is a polished platform for U.S. small businesses, with plans starting at $0 + state fee and paid plans that add EIN, operating agreement, compliance tools, and registered agent service depending on the package. FormLLC is more focused on international founders who need practical help with U.S. formation, EIN, banking/payment readiness, annual reports, and federal tax filing support.",
    rows: COMMON_ROWS("ZenBusiness", {
      startingPrice: "$0–$399 + state fee",
      ein: "Included from Pro plan",
      agent: "Included in Premium / separate registered agent service",
      banking: "Banking documents / general support",
      annualReport: "Compliance service / package-dependent",
      federalTax: "Not core formation package",
      bookkeeping: "Money tools / add-ons, not full tax filing focus",
      successManager: "Platform support",
      replySpeed: "Standard support",
      states: true,
      guarantee: "60-day money-back guarantee advertised",
      bestFor: "U.S. small-business owners who want a platform-style formation bundle",
    }),
    verdict:
      "ZenBusiness is a good option for U.S. residents who want a simple platform and subscription-style compliance tools. FormLLC is the stronger fit for global founders who want practical, human support across formation, EIN, banking/payment guidance, annual compliance, and U.S. federal tax filing.",
  },

  alternatives: {
    competitorName: "Other Alternatives",
    competitorTagline: "FormLLC vs Doola, Bizee, Stripe Atlas, and ZenBusiness — at a glance.",
    intro:
      "Each competitor is strong in a different lane: Doola for subscription-style non-resident formation, Bizee for low-cost filing, Stripe Atlas for Delaware startup incorporation, and ZenBusiness for U.S. small-business formation. FormLLC is positioned for global founders who want one hands-on team across formation, EIN, banking/payment guidance, annual compliance, and federal tax filing support.",
    rows: [
      {
        feature: "Best for",
        formllc: "Global founders who want one guided team",
        competitor: "Different audience each",
      },
      {
        feature: "Formation pricing",
        formllc: "$299 + state fee",
        competitor: "$0–$500+ depending on provider, plan, state, and renewal model",
      },
      {
        feature: "EIN support",
        formllc: "Included / guided for non-U.S. founders",
        competitor: "Included, paid, or plan-dependent",
      },
      {
        feature: "Registered agent (1st year)",
        formllc: true,
        competitor: "Often included, but renewal terms vary",
      },
      {
        feature: "Banking and payment guidance",
        formllc: "Mercury, Relay, Stripe, PayPal, Wise, Payoneer guidance",
        competitor: "Provider-specific and usually narrower",
      },
      {
        feature: "Federal tax filing support",
        formllc: "Available for 1120, 5472, 1065 and related filings",
        competitor: "Usually separate, plan-dependent, or outside the core package",
      },
      {
        feature: "Annual compliance support",
        formllc: true,
        competitor: "Usually extra, subscription-based, or provider-specific",
      },
      {
        feature: "Human support for global founders",
        formllc: true,
        competitor: "Mostly platform-led or plan-dependent",
      },
      {
        feature: "Entity/state flexibility",
        formllc: "LLC, C-Corp, S-Corp support across states",
        competitor: "Some providers are state/entity specific",
      },
      {
        feature: "Refund / guarantee terms",
        formllc: "Money-back guarantee available under FormLLC policy",
        competitor: "Varies by provider",
        note: "Always verify refund terms before ordering because state filing fees are often non-refundable once submitted.",
      },
    ],
    verdict:
      "The smart comparison is not only day-one formation price. Compare what you will need over the next 12 months: EIN, bank/payment readiness, registered agent renewal, annual report, tax filing, and real support. FormLLC is built to keep those pieces under one guided, global-founder-friendly service.",
  },
};