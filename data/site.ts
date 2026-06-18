export const SITE = {
  name: "FormLLC",
  shortName: "FormLLC",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://formllc.us",
  description:
    "FormLLC helps founders register an LLC or C-Corp in any U.S. state, get an EIN, file annual reports, and stay compliant — all in one place.",
  email: "contact@formllc.us",
  phone: "+1 (555) 000-0000",
  calendly: "https://calendly.com/contact-formllc/30min",
  account: "https://formllc.net/",
  socials: {
    twitter: "https://twitter.com/formllc",
    linkedin: "https://www.linkedin.com/company/formllc",
  },
  legal: {
    company: "FormLLC, Inc.",
    address: "Wyoming, United States",
  },
};

export type Region = "global" | "us";
