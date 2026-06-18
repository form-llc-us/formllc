import { NextResponse } from "next/server";
import { POST } from "@/app/api/contact/route";

export { POST };
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return NextResponse.redirect(new URL("/contact-us", req.url), 307);
}
