import { Section, SectionHeading } from "@/components/ui/Section";

function MercuryLogo() {
  return (
    <svg
      viewBox="0 0 220 54"
      role="img"
      aria-label="Mercury"
      className="h-10 w-auto md:h-11"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="31" cy="27" r="13" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="31" cy="27" r="8" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M18 27h26M31 14c4 4 6 8 6 13s-2 9-6 13M31 14c-4 4-6 8-6 13s2 9 6 13"
        stroke="currentColor"
        strokeWidth="1.15"
        fill="none"
        strokeLinecap="round"
      />
      <text
        x="58"
        y="33"
        fill="currentColor"
        fontSize="17"
        fontWeight="800"
        letterSpacing="4"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        MERCURY
      </text>
    </svg>
  );
}

function StripeLogo() {
  return (
    <svg
      viewBox="0 0 220 54"
      role="img"
      aria-label="Stripe"
      className="h-11 w-auto md:h-12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="50%"
        y="37"
        textAnchor="middle"
        fill="#7B73FF"
        fontSize="38"
        fontWeight="900"
        letterSpacing="-2"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        stripe
      </text>
    </svg>
  );
}

function PayPalLogo() {
  return (
    <svg
      viewBox="0 0 240 54"
      role="img"
      aria-label="PayPal"
      className="h-12 w-auto md:h-[54px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35 11h15.5c8.8 0 13.5 4.5 12.2 12.1-1.4 8.9-8.3 14.4-18.2 14.4h-6.4l-2.1 9.8H24.5L35 11z"
        fill="#0070BA"
      />
      <path
        d="M43 17h15.1c8.6 0 13.2 4.4 12 11.8-1.4 8.8-8.1 14.1-17.8 14.1h-6.2L44 52H32.8l10.2-35z"
        fill="#00A8EA"
        opacity="0.95"
      />
      <text
        x="78"
        y="36"
        fill="#0070BA"
        fontSize="31"
        fontWeight="900"
        letterSpacing="-1.2"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        Pay
      </text>
      <text
        x="142"
        y="36"
        fill="#00A8EA"
        fontSize="31"
        fontWeight="900"
        letterSpacing="-1.2"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        Pal
      </text>
    </svg>
  );
}

function PayoneerLogo() {
  return (
    <svg
      viewBox="0 0 240 54"
      role="img"
      aria-label="Payoneer"
      className="h-12 w-auto md:h-[54px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="27" r="13" fill="none" stroke="#FF5A1F" strokeWidth="5" />
      <path
        d="M40 14a13 13 0 0 1 13 13"
        fill="none"
        stroke="#00B8F0"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <text
        x="70"
        y="36"
        fill="currentColor"
        fontSize="28"
        fontWeight="800"
        letterSpacing="-1"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        Payoneer
      </text>
    </svg>
  );
}

const PARTNERS = [
  { label: "Mercury",  logo: <MercuryLogo />,  logoClass: "text-ink-700" },
  { label: "Stripe",   logo: <StripeLogo />,   logoClass: "" },
  { label: "PayPal",   logo: <PayPalLogo />,   logoClass: "" },
  { label: "Payoneer", logo: <PayoneerLogo />, logoClass: "text-ink-700" },
];

export default function BankingPartners() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="Banking & payments"
        title="Get banking introductions on day one."
        description="We'll introduce you to U.S. business banking and payment-processor partners that work with non-U.S. founders."
      />

      <div className="mx-auto mt-12 grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {PARTNERS.map((p) => (
          <div
            key={p.label}
            aria-label={p.label}
            className="group flex min-h-[120px] items-center justify-center overflow-hidden rounded-[24px] border border-ink-200/60 bg-white px-5 py-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-300/50 hover:shadow-card-hover md:min-h-[132px] md:px-6 md:py-8"
          >
            <div
              className={`flex w-full items-center justify-center text-ink-700 ${p.logoClass}`}
            >
              {p.logo}
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-6 text-ink-500 md:text-base">
        We also guide founders toward platforms such as Wise, Relay, Brex, and
        Wise Business, depending on their business model, location, and approval
        requirements.
      </p>
    </Section>
  );
}