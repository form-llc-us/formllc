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
  title: "Contact FormLLC — U.S. Team",
  description:
    "Talk to FormLLC about U.S. company formation, bookkeeping, payroll, sales tax, annual reports, and federal or state tax filing.",
  alternates: regionalAlternates("us", "/contact-us"),
};

const CHANNELS = [
  {
    title: "Email support",
    line: SITE.email,
    href: `mailto:${SITE.email}`,
    helper:
      "Best for status updates, document questions, billing, and service support.",
    icon: <MailIcon />,
  },
  {
    title: "Book a consultation",
    line: "Free 30-minute call",
    href: SITE.calendly,
    helper:
      "Best for formation, tax, payroll, sales-tax, and multi-state questions.",
    icon: <CalendarIcon />,
  },
  {
    title: "Customer dashboard",
    line: "Access your account",
    href: SITE.account,
    helper: "Track orders, files, invoices, compliance tasks, and case updates.",
    icon: <UserIcon />,
  },
];

const SUPPORT_AREAS = [
  {
    title: "Company formation",
    description: "LLC and corporation setup across U.S. states.",
    icon: <BuildingIcon />,
  },
  {
    title: "Federal and state tax",
    description: "Federal filings, state filings, sales tax, and compliance.",
    icon: <FileIcon />,
  },
  {
    title: "Bookkeeping and payroll",
    description: "Operational support for U.S.-based founders and businesses.",
    icon: <WalletIcon />,
  },
  {
    title: "Multi-state compliance",
    description:
      "Foreign qualification, annual reports, and state-level filings.",
    icon: <MapIcon />,
  },
];

const FAQ_ITEMS = [
  {
    q: "How fast do you reply?",
    a: "We usually respond within one business day. Existing customers should use the dashboard when possible for faster case tracking.",
  },
  {
    q: "Can you handle multi-state filings?",
    a: "Yes. We can help with formation, foreign qualification, annual reports, and state-level compliance across U.S. states.",
  },
  {
    q: "Do you offer phone consultations?",
    a: "Yes. You can book a free 30-minute consultation or share your number in the contact form.",
  },
  {
    q: "Can you help with sales tax or payroll?",
    a: "Yes. We can guide U.S. founders on sales-tax registration, bookkeeping, payroll, and related compliance needs.",
  },
];

export default function Page() {
  return (
    <SitePage region="us">
      <section className="relative bg-soft-premium">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(190,18,60,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.10),transparent_30%)]"
        />

        <div className="container-x relative py-10 md:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
            <div>
              <span className="badge">Contact FormLLC U.S.</span>

              <h1 className="mt-4 font-display text-[2.15rem] font-extrabold leading-[1.05] tracking-tight text-ink-950 md:text-[3.15rem] lg:text-[3.5rem]">
                Talk to a team that understands{" "}
                <span className="gradient-text">U.S. compliance.</span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-ink-600 md:text-lg">
                Get support for company formation, bookkeeping, payroll, sales
                tax, annual reports, federal tax filing, and state compliance.
                We will help you identify the correct next step.
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
                U.S. support areas
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
              title="Tell us what your U.S. business needs."
              description="Share your state, entity type, service requirement, and timeline. We will guide you toward the correct filing or compliance path."
            />

            <div className="mt-10 rounded-[2rem] border border-ink-100 bg-white p-4 shadow-card md:p-6">
              <ContactForm region="us" />
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
                  "We review your company type, state, and requested service.",
                  "A specialist replies with filing requirements, next steps, or missing details.",
                  "If needed, we schedule a call to review formation, tax, payroll, or multi-state requirements.",
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
                We usually reply within one business day. Existing customers
                should use the dashboard for faster case-specific updates.
              </p>
            </div>

            <div className="rounded-[2rem] border border-ink-100 bg-white p-6 shadow-soft">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink-500">
                Best for
              </p>

              <p className="mt-4 text-sm leading-7 text-ink-600">
                Formation, annual reports, sales tax, payroll, bookkeeping,
                federal tax filing, state tax filing, and multi-state compliance
                support.
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
          description="Common questions from U.S.-based founders and business owners."
        />

        <div className="mt-12">
          <FAQ items={FAQ_ITEMS} title="" />
        </div>
      </Section>

      <Newsletter
        title="Stay ahead of U.S. compliance deadlines."
        description="Get practical reminders for formation, annual reports, sales tax, bookkeeping, payroll, and federal/state filing."
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

function WalletIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16v12H4V7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7 7V5h10v2M16 13h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17.5 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m9 18-5 2V6l5-2 6 2 5-2v14l-5 2-6-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 4v14M15 6v14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
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