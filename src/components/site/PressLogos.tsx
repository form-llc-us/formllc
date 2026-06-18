import { Section } from "@/components/ui/Section";

const LOGOS = [
  {
    src: "/Assets/PR_As_Seen_Logo_1.png",
    alt: "Featured in Associated Press",
    href: "https://apnews.com/press-release/marketersmedia/formllc-announces-simplified-u-s-business-formation-and-compliance-services-6535fb0d409959686ae6de02ae1beefd",
  },
  {
    src: "/Assets/streetinsider.png",
    alt: "Featured in Street Insider",
    href: "https://www.streetinsider.com/Press%2BReleases/FormLLC%2BAnnounces%2BSimplified%2BU.S.%2BBusiness%2BFormation%2Band%2BCompliance%2BServices/26024543.html",
  },
  {
    src: "/Assets/dailyhunt.svg",
    alt: "Featured in Daily Hunt",
    href: "https://m.dailyhunt.in/news/india/english/allads-epaper-dh02a77427fa6647f1827a48343df856c0/-newsid-dh02a77427fa6647f1827a48343df856c0_483f7cf1b4fc44778a49a7b951327eff?sm=Y",
  },
  {
    src: "/Assets/wikigenuine.png",
    alt: "Featured in Wiki Genuine",
    href: "https://wikigenuine.org/index.php/FormLLC",
  },
  {
    src: "/Assets/kova-logo.png",
    alt: "Featured on KVOA",
    href: "https://kvoa.marketminute.com/article/marketersmedia-2026-2-19-formllc-announces-simplified-us-business-formation-and-compliance-services",
  },
  {
    src: "/Assets/wbng-logo.svg",
    alt: "Featured on WBNG",
    href: "https://wbng.marketminute.com/article/marketersmedia-2026-2-19-formllc-announces-simplified-us-business-formation-and-compliance-services",
  },
];

export default function PressLogos({
  tone = "white",
}: {
  tone?: "white" | "muted";
}) {
  return (
    <Section tone={tone} tight className="!py-14 md:!py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center text-center">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-ink-500">
          Featured in
        </p>

        <div className="mx-auto mt-2 luxury-divider w-full max-w-xs" aria-hidden />

        <div className="mx-auto mt-9 grid w-full grid-cols-2 place-items-center justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-5 lg:gap-6">
          {LOGOS.map((logo) => (
            <a
              key={logo.src}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={logo.alt}
              style={{
                backgroundColor: "#ffffff",
                borderColor: "rgba(196, 18, 48, 0.28)",
              }}
              className="group mx-auto flex h-24 w-full max-w-[180px] items-center justify-center rounded-2xl border px-4 py-4 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:border-crimson-300/40 focus:outline-none focus:ring-2 focus:ring-crimson-400/60 focus:ring-offset-2 focus:ring-offset-white"
            >
              <span className="mx-auto flex h-12 w-full items-center justify-center text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto block max-h-10 max-w-[135px] object-contain opacity-100 brightness-100 contrast-125 transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
