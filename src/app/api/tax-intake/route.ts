import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { TaxIntakeSchema } from "@/lib/validators";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendMail, escapeHtml } from "@/lib/mailer";
import { pushToSheets, metaCapiEvent } from "@/lib/integrations";
import { ticketId } from "@/lib/dupe";
import { clientIp, clientUa } from "@/lib/ip";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_FILE_BYTES = 12 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/zip",
  "application/x-zip-compressed",
]);

export async function POST(req: Request) {
  const ct = (req.headers.get("content-type") || "").toLowerCase();
  if (!ct.includes("multipart/form-data")) {
    return NextResponse.json({ ok: false, error: "Expected multipart/form-data" }, { status: 415 });
  }

  const fd = await req.formData();
  const fields: Record<string, string> = {};
  const files: File[] = [];
  for (const [k, v] of fd.entries()) {
    if (typeof v === "string") {
      fields[k] = v;
    } else if (v instanceof File && k === "files") {
      files.push(v);
    }
  }

  if (fields.company) return NextResponse.json({ ok: true, redirect: "/thank-you" });

  const parsed = TaxIntakeSchema.safeParse(fields);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[issue.path.join(".")] = issue.message;
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }
  const input = parsed.data;
  const ip = await clientIp();
  const ua = await clientUa();

  const captcha = await verifyRecaptcha(input["g-recaptcha-response"] ?? "", ip);
  if (!captcha.ok) {
    return NextResponse.json({ ok: false, errors: { captcha: captcha.error ?? "Captcha failed." } }, { status: 422 });
  }

  // Validate files
  for (const f of files) {
    if (f.size > MAX_FILE_BYTES) {
      return NextResponse.json({ ok: false, errors: { files: `${f.name} exceeds 12MB.` } }, { status: 422 });
    }
    if (f.type && !ALLOWED_MIME.has(f.type)) {
      return NextResponse.json({ ok: false, errors: { files: `${f.name}: file type not allowed.` } }, { status: 422 });
    }
  }

  const ticket = ticketId("TAX");

  // Save files locally; production deployments should swap this for S3/Cloudflare R2/etc.
  const uploadDir = path.resolve(process.cwd(), env.taxIntake.uploadDir);
  await fs.mkdir(uploadDir, { recursive: true });
  const savedFiles: { name: string; storedAs: string; size: number; signedUrl: string }[] = [];

  for (const f of files) {
    const safe = f.name.replace(/[^A-Za-z0-9._-]/g, "_");
    const stored = `${ticket}-${Date.now()}-${safe}`;
    const buf = Buffer.from(await f.arrayBuffer());
    await fs.writeFile(path.join(uploadDir, stored), buf);

    let signedUrl = "";
    if (env.taxIntake.downloadSecret) {
      const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 3600;
      const sig = crypto
        .createHmac("sha256", env.taxIntake.downloadSecret)
        .update(`${stored}|${exp}`)
        .digest("hex");
      signedUrl = `/api/download-tax-intake?file=${encodeURIComponent(stored)}&exp=${exp}&sig=${sig}&name=${encodeURIComponent(f.name)}`;
    }
    savedFiles.push({ name: f.name, storedAs: stored, size: f.size, signedUrl });
  }

  const fileRows = savedFiles
    .map((f) => `<li><strong>${escapeHtml(f.name)}</strong> (${(f.size / 1024).toFixed(1)} KB)${f.signedUrl ? ` — <a href="${env.siteUrl}${f.signedUrl}">download</a>` : ""}</li>`)
    .join("");

  await sendMail({
    to: env.admin.to,
    cc: env.admin.cc || undefined,
    replyTo: { email: input.email, name: input.name },
    subject: `[Tax Intake] ${input.name} — ${input.entity_type ?? "Entity"} (${input.tax_year ?? "year?"})`,
    html: `<h3>New Tax Intake</h3>
      <p><strong>Variant:</strong> ${escapeHtml(fields.variant ?? "tax-intake")}<br>
      <strong>Name:</strong> ${escapeHtml(input.name)}<br>
      <strong>Email:</strong> ${escapeHtml(input.email)}<br>
      <strong>Phone:</strong> ${escapeHtml(input.phone ?? "")}<br>
      <strong>Entity:</strong> ${escapeHtml(input.entity_name ?? "")} (${escapeHtml(input.entity_type ?? "")})<br>
      <strong>State:</strong> ${escapeHtml(input.state ?? "")}<br>
      <strong>EIN:</strong> ${escapeHtml(input.ein ?? "")}<br>
      <strong>Tax year:</strong> ${escapeHtml(input.tax_year ?? "")}</p>
      ${input.notes ? `<p><strong>Notes:</strong><br>${escapeHtml(input.notes).replace(/\n/g, "<br>")}</p>` : ""}
      ${fileRows ? `<h4>Files</h4><ul>${fileRows}</ul>` : "<p><em>No files uploaded.</em></p>"}
      <p><strong>Ticket:</strong> ${escapeHtml(ticket)}</p>`,
  });

  void pushToSheets({
    ticket,
    type: fields.variant ?? "tax-intake",
    ...input,
    files: savedFiles.map((f) => ({ name: f.name, storedAs: f.storedAs, size: f.size })),
    ip,
    ua,
  });
  void metaCapiEvent({ eventName: "Lead", eventId: ticket, email: input.email, phone: input.phone, ip, ua });

  return NextResponse.json({ ok: true, ticket, redirect: `/thank-you?ticket=${encodeURIComponent(ticket)}` });
}
