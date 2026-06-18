import type { Metadata } from "next";
import Link from "next/link";
import SitePage from "@/components/site/SitePage";
import { Section, SectionHeading } from "@/components/ui/Section";
import ContactForm from "@/components/forms/ContactForm";
import { SITE } from "@data/site";
import FAQ from "@/components/site/FAQ";
import Newsletter from "@/components/site/Newsletter";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact FormLLC",
  description:
    "Have a question about LLC formation, EIN, banking, or U.S. tax filing? Contact FormLLC or book a free consultation.",
  alternates: regionalAlternates("global", "/contact-us"),
};

const CHANNELS = [
  {
    title: "Email support",
    line: SITE.email,
    href: `mailto:${SITE.email}`,
    helper:
      "Best for document questions, billing, order status, and general support.",
    icon: <MailIcon />,
  },
  {
    title: "Book a consultation",
    line: "Free 30-minute call",
    href: SITE.calendly,
    helper:
      "Best for formation strategy, EIN, banking guidance, and tax setup.",
    icon: <CalendarIcon />,
  },
  {
    title: "Customer portal",
    line: "Access your account",
    href: SITE.account,
    helper: "Check files, invoices, order status, and case progress.",
    icon: <UserIcon />,
  },
];

const SUPPORT_AREAS = [
  {
    title: "LLC formation",
    description: "Wyoming, Delaware, Texas, and other U.S. state formations.",
    icon: <BuildingIcon />,
  },
  {
    title: "EIN and IRS support",
    description: "EIN guidance, IRS letters, and tax documentation.",
    icon: <FileIcon />,
  },
  {
    title: "Banking guidance",
    description: "Document preparation and step-by-step application support.",
    icon: <BankIcon />,
  },
  {
    title: "Annual compliance",
    description:
      "Annual reports, Registered Agent renewals, BOI, and tax filings.",
    icon: <ShieldIcon />,
  },
];

const CONTACT_FAQ = [
  {
    q: "How fast do you reply?",
    a: "We usually respond within one business day. Existing customers should use the account portal for faster case tracking.",
  },
  {
    q: "Do you offer free consultations?",
    a: "Yes. You can book a free 30-minute consultation to discuss formation, EIN, banking, and tax setup options.",
  },
  {
    q: "Can you open a bank account for me?",
    a: "No. Banks require the owner to complete KYC, identity verification, and sometimes video verification directly. We can guide you and help prepare the required documents.",
  },
  {
    q: "Can I contact you if I am outside the U.S.?",
    a: "Yes. FormLLC works with founders from many countries who want to form and maintain a U.S. company.",
  },
];

export default function ContactPage() {
  return (
    <SitePage region="global">
      <section className="relative bg-soft-premium">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(190,18,60,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.10),transparent_30%)]"
        />

        <div className="container-x relative py-10 md:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
            <div>
              <span className="badge">Contact FormLLC</span>

              <h1 className="mt-4 font-display text-[2.15rem] font-extrabold leading-[1.05] tracking-tight text-ink-950 md:text-[3.15rem] lg:text-[3.5rem]">
                Get clear answers before your next{" "}
                <span className="gradient-text">U.S. business step.</span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-ink-600 md:text-lg">
                Ask us about LLC formation, EIN, banking documentation, BOI,
                annual reports, Registered Agent service, and U.S. tax filing.
                Our team will point you to the right next step.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-full bg-crimson-700 px-5 text-sm font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-crimson-800"
                >
                  Book Free Consultation
                </Link>

                <Link
                  href={`mailto:${SITE.email}`}
                  className="inline-flex h-11 items-center rounded-full border border-ink-200 bg-white px-5 text-sm font-extrabold text-ink-800 shadow-soft transition hover:-translate-y-0.5 hover:border-crimson-200 hover:text-crimson-700"
                >
                  Email Support
                </Link>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-ink-100 bg-white/85 p-5 shadow-card backdrop-blur md:p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-crimson-700">
                Common support areas
              </p>

              <div className="mt-5 grid gap-3">
                {SUPPORT_AREAS.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-3 rounded-[1.25rem] border border-ink-100 bg-cream-50 p-3.5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-crimson-700 shadow-soft">
                      {item.icon}
                    </span>

                    <div>
                      <h3 className="text-sm font-extrabold text-ink-950">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-ink-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section tone="white">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Send a message"
              title="Tell us what you need help with."
              description="Share your company status, state, service requirement, and timeline. The more context you provide, the faster we can guide you."
            />

            <div className="mt-10 rounded-[2rem] border border-ink-100 bg-white p-4 shadow-card md:p-6">
              <ContactForm region="global" />
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-[2rem] border border-crimson-100 bg-soft-crimson p-6 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-crimson-700 shadow-soft">
                <ClockIcon />
              </span>

              <h3 className="mt-5 text-xl font-extrabold text-ink-950">
                What happens next?
              </h3>

              <ol className="mt-5 space-y-4 text-sm leading-6 text-ink-700">
                {[
                  "We review your message and identify the relevant formation, EIN, banking, or tax context.",
                  "A specialist replies with clear next steps or a request for missing details.",
                  "If a call is better, we will share a consultation link or confirm your preferred time.",
                ].map((line, index) => (
                  <li key={line} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-crimson-100 bg-white text-xs font-extrabold text-crimson-700">
                      {index + 1}
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[2rem] border border-ink-100 bg-white p-6 shadow-soft">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink-500">
                Response time
              </p>

              <p className="mt-4 text-sm leading-7 text-ink-600">
                We usually reply within one business day. Existing customer
                requests are best handled through the account portal for faster
                status tracking.
              </p>
            </div>

            <div className="rounded-[2rem] border border-ink-100 bg-white p-6 shadow-soft">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink-500">
                Important note
              </p>

              <p className="mt-4 text-sm leading-7 text-ink-600">
                We can guide you through banking and payment gateway setup, but
                the owner must complete identity verification directly with the
                bank or provider.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="muted" tight>
        <div className="grid gap-4 md:grid-cols-3">
          {CHANNELS.map((channel) => (
            <a
              key={channel.title}
              href={channel.href}
              target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                channel.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="group rounded-[2rem] border border-ink-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-crimson-100 hover:shadow-card md:p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-crimson-50 text-crimson-700 transition group-hover:bg-crimson-700 group-hover:text-white">
                {channel.icon}
              </span>

              <h3 className="mt-5 text-lg font-extrabold text-ink-950">
                {channel.title}
              </h3>

              <p className="mt-1 text-sm font-extrabold text-crimson-700">
                {channel.line}
              </p>

              <p className="mt-3 text-sm leading-6 text-ink-600">
                {channel.helper}
              </p>
            </a>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Quick answers"
          title="Before you contact us."
          description="A few common questions we receive from founders."
        />

        <div className="mt-12">
          <FAQ items={CONTACT_FAQ} title="" />
        </div>
      </Section>

      <Newsletter
        title="Stay updated on U.S. company compliance."
        description="Get practical updates on formation, EIN, annual reports, BOI, banking documents, and U.S. tax filing."
      />
    </SitePage>
  );
}

function MailIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16v12H4V6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 5h14v15H5V5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 3v4M16 3v4M5 10h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 21c1.4-4.2 4.2-6.3 8-6.3s6.6 2.1 8 6.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 21V7l8-4 8 4v14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 21v-7h6v7M8 9h.01M12 9h.01M16 9h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 3h8l4 4v14H6V3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v5h5M9 13h6M9 17h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10h16M6 10v8M10 10v8M14 10v8M18 10v8M4 18h16M3 21h18M12 3l8 4H4l8-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 19 6v5c0 4.5-2.8 8.3-7 10-4.2-1.7-7-5.5-7-10V6l7-3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}