import type { Region } from "./site";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export function getNav(region: Region): NavItem[] {
  const base = region === "us" ? "/us" : "";
  return [
    { label: "Home", href: `${base}/` },
    { label: "Services", href: `${base}/services` },
    { label: "Pricing", href: `${base}/pricing` },
    {
      label: "Comparison",
      href: "#",
      children:
        region === "us"
          ? [{ label: "FormLLC vs Alternatives", href: "/us/formllc-vs-alternatives" }]
          : [
              { label: "FormLLC vs Doola", href: "/formllc-vs-doola" },
              { label: "FormLLC vs Bizee", href: "/formllc-vs-bizee" },
              { label: "FormLLC vs Atlas", href: "/formllc-vs-atlas" },
              { label: "FormLLC vs ZenBusiness", href: "/formllc-vs-zenbusiness" },
              { label: "FormLLC vs Alternatives", href: "/formllc-vs-alternatives" },
            ],
    },
    { label: "About", href: `${base}/about-us` },
    {
      label: "Resources",
      href: "#",
      children: [
        { label: "Blog", href: `${base}/blogs` },
        { label: "Tools", href: `${base}/tools` },
      ],
    },
    { label: "Contact", href: `${base}/contact-us` },
  ];
}

export function getFooterNav(region: Region) {
  const base = region === "us" ? "/us" : "";
  return {
    company: [
      { label: "About", href: `${base}/about-us` },
      { label: "Services", href: `${base}/services` },
      { label: "Pricing", href: `${base}/pricing` },
      { label: "Tools", href: `${base}/tools` },
      { label: "Contact", href: `${base}/contact-us` },
    ],
    resources: [
      { label: "Blog", href: `${base}/blogs` },
      region === "us"
        ? { label: "Onboarding Wizard", href: "/us/onboarding" }
        : { label: "Tax Intake", href: "/tax-intake" },
      { label: "U.S. Tax Filing Intake", href: "/us-tax-filing-intake" },
      { label: "FormLLC vs Alternatives", href: `${base}/formllc-vs-alternatives` },
    ],
    legal: [
      { label: "Privacy Policy", href: `${base}/privacy` },
      { label: "Terms & Conditions", href: `${base}/terms-conditions` },
      { label: "Refund Policy", href: `${base}/refund-policy` },
    ],
  };
}
