import type { Metadata } from "next";
import SitePage from "@/components/site/SitePage";
import { LinkButton } from "@/components/ui/Button";
import { regionalAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Thank you",
  description: "We've received your message.",
  alternates: regionalAlternates("us", "/thank-you"),
  robots: { index: false, follow: true },
};

type Props = { searchParams?: Promise<Record<string, string | string[] | undefined>> };

export default async function Page({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const name = typeof sp.name === "string" ? sp.name : "";
  const ticket = typeof sp.ticket === "string" ? sp.ticket : "";

  return (
    <SitePage region="us">
      <section className="min-h-[60vh] flex items-center bg-soft-premium">
        <div className="container-x py-20 md:py-24 max-w-xl text-center mx-auto">
          <div
            aria-hidden
            className="mx-auto h-16 w-16 rounded-full bg-crimson-50 border border-crimson-100 flex items-center justify-center text-2xl text-crimson-700 shadow-glow"
          >
            ✓
          </div>
          <h1 className="premium-heading mt-7 !text-[2.5rem] md:!text-[3rem]">
            {name ? (
              <>
                Thanks, <span className="gradient-text">{name}</span>!
              </>
            ) : (
              <span className="gradient-text">Thanks!</span>
            )}
          </h1>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            We've received your message. A team member will reply within one business day.
          </p>
          {ticket && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white border border-ink-100 px-4 py-2 text-sm shadow-soft">
              <span className="text-ink-500">Ticket:</span>
              <span className="font-bold text-ink-900">{ticket}</span>
            </p>
          )}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <LinkButton href="/us" variant="ghost" size="lg">
              Back to U.S. home
            </LinkButton>
            <LinkButton href="/us/blogs" variant="primary" size="lg">
              Read the blog
            </LinkButton>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
