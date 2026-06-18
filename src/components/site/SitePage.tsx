import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import type { Region } from "@data/site";

/**
 * Standard public-page shell. Geolocation handling lives in `middleware.ts`
 * (server-side redirect using the `site_locale` cookie) and the floating
 * `<RegionToggle />` is mounted globally in the root layout, so this shell
 * just wraps the page in <Header> + <main id="main-content"> + <Footer>.
 */
export default function SitePage({
  region = "global",
  children,
}: {
  region?: Region;
  children: ReactNode;
}) {
  return (
    <>
      <Header region={region} />
      <main id="main-content" className="min-h-[60vh]">
        {children}
      </main>
      <Footer region={region} />
    </>
  );
}
