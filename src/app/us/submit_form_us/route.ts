import { NextResponse } from "next/server";
import { POST } from "@/app/api/us/contact/route";

export { POST };
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return NextResponse.redirect(new URL("/us/contact-us", req.url), 307);
}
