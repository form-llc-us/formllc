import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { env } from "./env";

const FALLBACK_FILE = path.join(process.cwd(), ".cache", "dupe-cache.json");

export function submissionHash(parts: string[]): string {
  return crypto.createHash("sha256").update(parts.map((p) => p.toLowerCase().trim()).join("|")).digest("hex");
}

/**
 * File-based dupe cache used when DB isn't available. Mirrors the legacy PHP
 * fallback. Returns true if the hash was seen within the block window.
 */
export async function isDupeFile(hash: string): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  const window = env.duplicateBlockSeconds;

  try {
    await fs.mkdir(path.dirname(FALLBACK_FILE), { recursive: true });
  } catch {}

  let data: Record<string, number> = {};
  try {
    const raw = await fs.readFile(FALLBACK_FILE, "utf8");
    data = JSON.parse(raw) as Record<string, number>;
  } catch {
    data = {};
  }

  for (const [h, ts] of Object.entries(data)) {
    if (now - ts > window) delete data[h];
  }

  if (data[hash]) {
    await fs.writeFile(FALLBACK_FILE, JSON.stringify(data));
    return true;
  }
  data[hash] = now;
  await fs.writeFile(FALLBACK_FILE, JSON.stringify(data));
  return false;
}

export function ticketId(prefix = "FLC"): string {
  const d = new Date();
  const stamp = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}-${String(d.getUTCHours()).padStart(2, "0")}${String(d.getUTCMinutes()).padStart(2, "0")}${String(d.getUTCSeconds()).padStart(2, "0")}`;
  const rand = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${stamp}-${rand}`;
}
