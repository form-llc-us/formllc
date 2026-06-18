import { NextResponse } from "next/server";
import { GET as downloadFile } from "@/app/api/download-tax-intake/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const url = new URL(req.url);
  const hasSignedDownload =
    url.searchParams.has("file") &&
    url.searchParams.has("exp") &&
    url.searchParams.has("sig");

  if (!hasSignedDownload) {
    return NextResponse.redirect(new URL("/tax-intake", req.url), 307);
  }

  return downloadFile(req);
}
