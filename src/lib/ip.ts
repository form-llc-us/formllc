import { headers } from "next/headers";

export async function clientIp(): Promise<string | null> {
  const h = await headers();
  const candidates = [
    h.get("cf-connecting-ip"),
    h.get("x-forwarded-for"),
    h.get("x-real-ip"),
    h.get("x-client-ip"),
  ];
  for (const c of candidates) {
    if (c) {
      const first = c.split(",")[0]?.trim();
      if (first) return first;
    }
  }
  return null;
}

export async function clientUa(): Promise<string> {
  const h = await headers();
  return (h.get("user-agent") ?? "").slice(0, 255);
}
