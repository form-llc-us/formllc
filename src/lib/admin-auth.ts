import "server-only";
import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";
import { env } from "./env";

export const ADMIN_COOKIE = "blog_admin_session";

function safeEqual(a: string, b: string): boolean {
  if (!a || !b) return false;
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function getAdminToken(): string {
  return env.blogAdminToken;
}

export function isAdminTokenConfigured(): boolean {
  return Boolean(env.blogAdminToken);
}

export function checkToken(value: string | undefined | null): boolean {
  const expected = env.blogAdminToken;
  if (!expected) return false;
  return safeEqual(String(value ?? ""), expected);
}

export async function isAdminFromCookies(): Promise<boolean> {
  const store = await cookies();
  return checkToken(store.get(ADMIN_COOKIE)?.value);
}

export function isAdminFromHeaders(req: Request): boolean {
  const header = req.headers.get("x-admin-token");
  if (header && checkToken(header)) return true;
  // Cookie via Request headers (for API routes called from same-origin admin UI).
  const cookieHeader = req.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_COOKIE}=`));
  if (!match) return false;
  const value = decodeURIComponent(match.slice(ADMIN_COOKIE.length + 1));
  return checkToken(value);
}

export function unauthorized(): Response {
  return new Response(JSON.stringify({ error: "unauthorized" }), {
    status: 401,
    headers: { "content-type": "application/json" },
  });
}

export function requireAdmin(req: Request): Response | null {
  if (!isAdminTokenConfigured()) {
    return new Response(
      JSON.stringify({ error: "BLOG_ADMIN_TOKEN is not configured on the server." }),
      { status: 503, headers: { "content-type": "application/json" } },
    );
  }
  return isAdminFromHeaders(req) ? null : unauthorized();
}
