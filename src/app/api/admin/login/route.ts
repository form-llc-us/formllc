import { z } from "zod";
import { ADMIN_COOKIE, checkToken, isAdminTokenConfigured } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Schema = z.object({ token: z.string().min(1).max(512) });

export async function POST(req: Request) {
  if (!isAdminTokenConfigured()) {
    return Response.json(
      { error: "BLOG_ADMIN_TOKEN is not configured on the server." },
      { status: 503 },
    );
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Missing token" }, { status: 400 });
  }
  if (!checkToken(parsed.data.token)) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  const res = Response.json({ ok: true });
  const isSecure = req.headers.get("x-forwarded-proto") === "https" || req.url.startsWith("https://");
  const cookie = [
    `${ADMIN_COOKIE}=${encodeURIComponent(parsed.data.token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${60 * 60 * 12}`,
    isSecure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
  res.headers.append("Set-Cookie", cookie);
  return res;
}

export async function DELETE() {
  const res = Response.json({ ok: true });
  res.headers.append(
    "Set-Cookie",
    `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,
  );
  return res;
}
