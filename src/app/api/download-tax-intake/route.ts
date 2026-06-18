import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FUTURE_SECONDS = 8 * 24 * 3600;

function deny(status: number, msg: string) {
  return new NextResponse(msg, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function GET(req: Request) {
  if (!env.taxIntake.downloadSecret) {
    return deny(500, "Download not configured.");
  }

  const url = new URL(req.url);
  const file = (url.searchParams.get("file") ?? "").trim();
  const exp = Number(url.searchParams.get("exp") ?? 0);
  const sig = (url.searchParams.get("sig") ?? "").trim();
  const downloadName = (url.searchParams.get("name") ?? "").trim();

  if (!file || exp <= 0 || !sig) return deny(400, "Bad request");

  const now = Math.floor(Date.now() / 1000);
  if (now > exp) return deny(410, "Link expired");
  if (exp - now > MAX_FUTURE_SECONDS) return deny(400, "Invalid expiry");

  const safe = path.basename(file);
  if (!safe || safe.includes("..") || safe.includes("/") || safe.includes("\\")) {
    return deny(400, "Invalid file");
  }

  const expected = crypto
    .createHmac("sha256", env.taxIntake.downloadSecret)
    .update(`${safe}|${exp}`)
    .digest("hex");

  if (!crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(sig, "hex"))) {
    return deny(403, "Invalid signature");
  }

  const filePath = path.join(path.resolve(process.cwd(), env.taxIntake.uploadDir), safe);
  let buf: Buffer;
  try {
    buf = await fs.readFile(filePath);
  } catch {
    return deny(404, "Not found");
  }

  const cleanName = (downloadName || safe).replace(/[^A-Za-z0-9._ -]/g, "_");

  return new NextResponse(new Uint8Array(buf), {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": buf.length.toString(),
      "Content-Disposition": `attachment; filename="${cleanName}"`,
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'; sandbox",
      "Referrer-Policy": "no-referrer",
      "Cache-Control": "private, max-age=0, no-store, no-cache, must-revalidate",
    },
  });
}
