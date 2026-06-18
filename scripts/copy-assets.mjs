#!/usr/bin/env node
/**
 * Copies Assets, favicon_io, and BingSiteAuth.xml from the legacy site into ./public.
 * Override the legacy path with FORMLLC_SOURCE.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";

const SOURCE = process.env.FORMLLC_SOURCE ?? path.resolve(process.cwd(), "..", "formllc-us");
const PUBLIC = path.resolve(process.cwd(), "public");

async function copyDir(src, dst) {
  if (!existsSync(src)) return false;
  await fs.mkdir(dst, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      await copyDir(s, d);
    } else if (entry.isFile()) {
      await fs.copyFile(s, d);
    }
  }
  return true;
}

async function copyFile(src, dst) {
  if (!existsSync(src)) return false;
  await fs.mkdir(path.dirname(dst), { recursive: true });
  await fs.copyFile(src, dst);
  return true;
}

async function main() {
  if (!existsSync(SOURCE)) {
    console.warn(`[assets] Source dir not found: ${SOURCE}`);
    return;
  }

  const dirs = [
    ["Assets", path.join(PUBLIC, "Assets")],
    ["favicon_io", path.join(PUBLIC, "favicon_io")],
  ];
  for (const [name, dst] of dirs) {
    const src = path.join(SOURCE, name);
    const ok = await copyDir(src, dst);
    console.log(`[assets] ${ok ? "copied" : "skipped"} ${name}`);
  }

  await copyFile(path.join(SOURCE, "BingSiteAuth.xml"), path.join(PUBLIC, "BingSiteAuth.xml"));
  console.log("[assets] copied BingSiteAuth.xml");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
