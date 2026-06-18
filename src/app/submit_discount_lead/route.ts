import { NextResponse } from "next/server";
import { POST } from "@/app/api/discount-lead/route";

export { POST };
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return NextResponse.redirect(new URL("/pricing", req.url), 307);
}
