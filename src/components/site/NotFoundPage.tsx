import Link from "next/link";
import SitePage from "@/components/site/SitePage";
import { LinkButton } from "@/components/ui/Button";
import type { Region } from "@data/site";

export default function NotFoundPage({ region = "global" }: { region?: Region }) {
  const base = region === "us" ? "/us" : "";

  return (
    <SitePage region={region}>
      <section className="flex min-h-[60vh] items-center bg-soft-premium">
        <div className="container-x mx-auto max-w-xl py-24 text-center">
          <span className="eyebrow">404</span>
          <h1 className="premium-heading mt-6 !text-[3.25rem] md:!text-[4.25rem]">
            Page <span className="gradient-text">not found.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">
            The page you are looking for moved, or never existed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href={base || "/"} variant="primary" size="lg">
              Back home
            </LinkButton>
            <LinkButton href={`${base}/blogs`} variant="ghost" size="lg">
              Read the blog
            </LinkButton>
          </div>
          <p className="mt-10 text-sm text-ink-500">
            Looking for something specific?{" "}
            <Link href={`${base}/contact-us`} className="link-pill !text-sm">
              Contact us -&gt;
            </Link>
          </p>
        </div>
      </section>
    </SitePage>
  );
}
