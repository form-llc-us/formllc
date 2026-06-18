import type { ReactNode } from "react";
import SitePage from "./SitePage";
import type { Region } from "@data/site";

export default function LegalPage({
  region = "global",
  title,
  updatedAt,
  children,
}: {
  region?: Region;
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <SitePage region={region}>
      <section className="bg-soft-premium">
        <div className="container-x py-14 md:py-20 max-w-3xl">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-5 text-3xl md:text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.025em] text-ink-900">
            {title}
          </h1>
          <p className="mt-4 text-sm text-ink-500">
            Last updated:{" "}
            <span className="font-semibold text-ink-700">{updatedAt}</span>
          </p>
          <div className="mt-8 luxury-divider" />
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container-x max-w-3xl prose-blog">{children}</div>
      </section>
    </SitePage>
  );
}
