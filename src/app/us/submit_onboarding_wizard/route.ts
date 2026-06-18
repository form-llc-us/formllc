import { NextResponse } from "next/server";
import { POST } from "@/app/api/onboarding/route";

export { POST };
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return NextResponse.redirect(new URL("/us/onboarding", req.url), 307);
}
