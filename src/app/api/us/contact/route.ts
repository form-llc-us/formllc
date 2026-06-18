import { handleContactSubmission } from "@/lib/contact-handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  return handleContactSubmission(req, "us");
}
