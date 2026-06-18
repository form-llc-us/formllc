import type { ReactNode } from "react";
import Link from "next/link";
import { SITE, type Region } from "@data/site";
import { getFooterNav } from "@data/nav";

type FooterLink = {
  label: string;
  href: string;
};

export default function Footer({ region = "global" }: { region?: Region }) {
  const nav = getFooterNav(region);
  const year = new Date().getFullYear();
  const base = region === "us" ? "/us" : "";

  const pages: FooterLink[] = [
    { label: "Home", href: region === "us" ? "/us" : "/" },
    { label: "About FormLLC", href: `${base}/about-us` },
    { label: "Services", href: `${base}/services` },
    { label: "Pricing", href: `${base}/pricing` },
    { label: "Tools", href: `${base}/tools` },
    { label: "Blogs", href: `${base}/blogs` },
    { label: "Contact Us", href: `${base}/contact-us` },
  ];

  const comparisons: FooterLink[] =
    region === "us"
      ? [
          { label: "FormLLC vs Alternatives", href: "/us/formllc-vs-alternatives" },
          { label: "FormLLC vs doola", href: "/us/formllc-vs-doola" },
          { label: "FormLLC vs Bizee", href: "/us/formllc-vs-bizee" },
          { label: "FormLLC vs Stripe Atlas", href: "/us/formllc-vs-atlas" },
          { label: "FormLLC vs ZenBusiness", href: "/us/formllc-vs-zenbusiness" },
        ]
      : [
          { label: "FormLLC vs Alternatives", href: "/formllc-vs-alternatives" },
          { label: "FormLLC vs doola", href: "/formllc-vs-doola" },
          { label: "FormLLC vs Bizee", href: "/formllc-vs-bizee" },
          { label: "FormLLC vs Stripe Atlas", href: "/formllc-vs-atlas" },
          { label: "FormLLC vs ZenBusiness", href: "/formllc-vs-zenbusiness" },
        ];

  const resources: FooterLink[] = [
    ...(nav.resources || []),
    { label: "Secure Payments", href: "/paypal" },
  ];

  const legal: FooterLink[] = nav.legal || [];

  return (
    <footer
      className="brand-gradient relative overflow-hidden border-t border-white/10 text-white"
      aria-label="Site footer"
    >

      <div className="container-x relative pt-10 pb-16 md:pt-12 md:pb-0">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-9 lg:grid-cols-[0.95fr_2.05fr] lg:items-start lg:gap-12">
            {/* Brand */}
            <div className="max-w-md">
              <Link
                href={region === "us" ? "/us" : "/"}
                className="inline-flex items-baseline font-display text-[1.75rem] font-extrabold tracking-[-0.04em]"
                aria-label="FormLLC"
              >
                <span className="text-white">Form</span>
                <span className="text-[#ff4d5a]">LLC</span>
              </Link>

              <p className="mt-4 max-w-sm text-[14px] font-medium leading-6 text-white/68">
                Register your LLC or C-Corp, get an EIN, manage compliance, and launch your
                U.S. business with confidence.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                <h3 className="text-[14px] font-bold leading-5 tracking-[-0.01em] text-white">
                  Contact
                </h3>

                <div className="mt-4 space-y-3.5">
                  <FooterContactItem label="Email">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="break-words font-semibold text-white/88 transition hover:text-[#ffb3b8]"
                    >
                      {SITE.email}
                    </a>
                  </FooterContactItem>

                  <FooterContactItem label="Account">
                    <a
                      href={SITE.account}
                      className="break-words font-semibold text-white/88 transition hover:text-[#ffb3b8]"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {SITE.account.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  </FooterContactItem>

                  <FooterContactItem label="Office">
                    <span className="font-semibold leading-5 text-white/88">
                      {SITE.legal.address}
                    </span>
                  </FooterContactItem>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-x-7 gap-y-8 sm:grid-cols-2 md:grid-cols-4 lg:pt-1 xl:gap-x-10">
              <FooterColumn title="Pages" links={pages} />
              <FooterColumn title="Comparison" links={comparisons} />
              <FooterColumn title="Resources" links={resources} />
              <FooterColumn title="Legal" links={legal} />
            </div>
          </div>

          <div className="mt-7 border-t border-white/10 py-3">
            <div className="flex flex-col gap-2 text-[12.5px] font-medium leading-none text-white/55 md:flex-row md:items-center md:justify-between">
              <p>
                © {year} {SITE.legal.company}. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span>Built for founders launching in the U.S.</span>
                <span className="hidden h-1 w-1 rounded-full bg-white/25 md:inline-flex" />
                <Link
                  href={`${base}/contact-us`}
                  className="font-semibold text-white/80 transition hover:text-[#ffb3b8]"
                >
                  Get support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="text-[14px] font-bold leading-5 tracking-[-0.01em] text-white">
        {title}
      </h3>

      <ul className="mt-3.5 space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="inline-flex max-w-full text-[13.5px] font-medium leading-5 text-white/62 transition hover:translate-x-0.5 hover:text-[#ffb3b8]"
            >
              <span className="min-w-0">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterContactItem({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[76px_minmax(0,1fr)] sm:gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#ff7b88]">
        {label}
      </span>
      <div className="min-w-0 text-[13px] leading-5 text-white/80">{children}</div>
    </div>
  );
}
