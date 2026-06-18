import type { Metadata } from "next";
import NotFoundPage from "@/components/site/NotFoundPage";

export const metadata: Metadata = {
  title: "Page not found | FormLLC",
  robots: { index: false, follow: false },
};

export default function LegacyUs404Page() {
  return <NotFoundPage region="us" />;
}
