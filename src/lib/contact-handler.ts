/**
 * Shared contact handler used by both /api/contact (global) and /api/us/contact (US).
 * Mirrors the legacy PHP behavior:
 *   1. Honeypot
 *   2. reCAPTCHA verify
 *   3. Validation
 *   4. Dupe check (DB if available, file fallback)
 *   5. Insert into MySQL `contact_messages` (or `contact_messages_us`)
 *   6. Mailchimp upsert
 *   7. Send admin + client emails (PHPMailer → nodemailer)
 *   8. Push to Google Sheets
 *   9. Meta Conversions API "Lead"
 *  10. Return JSON { ok, ticket, redirect }
 */
import { NextResponse } from "next/server";
import { ContactSchema } from "./validators";
import { verifyRecaptcha } from "./recaptcha";
import { sendMail, escapeHtml } from "./mailer";
import { mailchimpUpsert, pushToSheets, metaCapiEvent } from "./integrations";
import { isDupeFile, submissionHash, ticketId } from "./dupe";
import { getPool } from "./db";
import { clientIp, clientUa } from "./ip";
import { env } from "./env";

export async function handleContactSubmission(req: Request, region: "global" | "us") {
  const body = await readJsonOrForm(req);

  // Honeypot — silently succeed
  if (body.company) {
    return NextResponse.json({ ok: true, redirect: region === "us" ? "/us/thank-you" : "/thank-you" });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      if (!errors[path]) errors[path] = issue.message;
    }
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }
  const input = parsed.data;
  const ip = await clientIp();
  const ua = await clientUa();

  // reCAPTCHA
  const captchaToken = input["g-recaptcha-response"] || input.captcha || "";
  const captcha = await verifyRecaptcha(captchaToken, ip);
  if (!captcha.ok) {
    return NextResponse.json({ ok: false, errors: { captcha: captcha.error ?? "Captcha failed." } }, { status: 422 });
  }

  // Dupe check (DB-aware → falls back to file)
  const hash = submissionHash([
    input.email,
    input.contact_no,
    input.subject,
    input.message,
  ]);

  const ticket = ticketId();
  const tableName = region === "us" ? "contact_messages_us" : "contact_messages";
  const pool = getPool(region);
  let insertId = 0;
  let dupBlocked = false;

  if (pool) {
    try {
      const conn = await pool.getConnection();
      try {
        const [rows] = await conn.query(
          `SELECT id FROM ${tableName} WHERE submission_hash = ? AND created_at >= (NOW() - INTERVAL ${env.duplicateBlockSeconds} SECOND) LIMIT 1`,
          [hash]
        );
        if (Array.isArray(rows) && rows.length > 0) {
          dupBlocked = true;
        }

        if (!dupBlocked) {
          const [result] = await conn.execute(
            `INSERT INTO ${tableName}
              (name, email, contact_no, whatsapp, country, entity, state, subject, message, ip, ua, submission_hash)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              input.name,
              input.email,
              input.contact_no,
              input.whatsapp ?? null,
              input.country ?? null,
              input.entity,
              input.state,
              input.subject,
              input.message ?? null,
              ip,
              ua,
              hash,
            ]
          );
          insertId = (result as { insertId?: number }).insertId ?? 0;
        }
      } finally {
        conn.release();
      }
    } catch (e) {
      console.error("[contact] DB error, falling back to file dupe cache:", e);
      dupBlocked = await isDupeFile(hash);
    }
  } else {
    dupBlocked = await isDupeFile(hash);
  }

  if (dupBlocked) {
    return NextResponse.json(
      { ok: false, errors: { duplicate: "You already submitted this message. Please wait a moment before trying again." } },
      { status: 422 }
    );
  }

  // Mailchimp (best-effort)
  void mailchimpUpsert({
    email: input.email,
    name: input.name,
    contact_no: input.contact_no,
    whatsapp: input.whatsapp,
    country: input.country,
    entity: input.entity,
    state: input.state,
    subject: input.subject,
  });

  // Email admin + client
  await Promise.all([
    sendMail({
      to: env.admin.to,
      cc: env.admin.cc || undefined,
      replyTo: { email: input.email, name: input.name },
      subject: `New Contact Message: ${input.subject}`,
      html: adminHtml(input, ticket),
      text: adminText(input, ticket),
    }),
    sendMail({
      to: input.email,
      replyTo: { email: env.admin.to, name: env.admin.name },
      subject: `We received your message — Ticket ${ticket}`,
      html: clientHtml(input.name, input.subject, input.message ?? "", ticket),
      text: clientText(input.name, input.subject, input.message ?? "", ticket),
    }),
  ]);

  // Sheets + Meta CAPI (best-effort)
  void pushToSheets({
    id: insertId,
    ticket,
    region,
    name: input.name,
    email: input.email,
    contact_no: input.contact_no,
    whatsapp: input.whatsapp,
    country: input.country,
    entity: input.entity,
    state: input.state,
    subject: input.subject,
    message: input.message,
    ip,
    ua,
    source: region === "us" ? "Website Contact Form (US)" : "Website Contact Form",
  });
  void metaCapiEvent({
    eventName: "Lead",
    eventId: ticket,
    email: input.email,
    phone: input.contact_no || input.whatsapp,
    ip,
    ua,
  });

  const base = region === "us" ? "/us" : "";
  const redirect = `${base}/thank-you?name=${encodeURIComponent(input.name)}&subject=${encodeURIComponent(input.subject)}&ticket=${encodeURIComponent(ticket)}`;

  return NextResponse.json({ ok: true, ticket, redirect });
}

async function readJsonOrForm(req: Request): Promise<Record<string, string>> {
  const ct = (req.headers.get("content-type") || "").toLowerCase();
  if (ct.includes("application/json")) {
    try {
      const obj = (await req.json()) as Record<string, unknown>;
      const out: Record<string, string> = {};
      for (const [k, v] of Object.entries(obj)) out[k] = String(v ?? "");
      return out;
    } catch {
      return {};
    }
  }
  if (ct.includes("multipart/form-data") || ct.includes("application/x-www-form-urlencoded")) {
    const fd = await req.formData();
    const out: Record<string, string> = {};
    fd.forEach((v, k) => (out[k] = typeof v === "string" ? v : ""));
    return out;
  }
  return {};
}

function adminHtml(input: { name: string; email: string; contact_no: string; whatsapp?: string; country?: string; state?: string; entity: string; subject: string; message: string }, ticket: string) {
  const e = escapeHtml;
  return `
    <h3>New Inquiry Received</h3>
    <p>
      <strong>Name:</strong> ${e(input.name)}<br>
      <strong>Email:</strong> ${e(input.email)}<br>
      <strong>Contact:</strong> ${e(input.contact_no)}<br>
      <strong>WhatsApp:</strong> ${e(input.whatsapp ?? "")}<br>
      <strong>Country:</strong> ${e(input.country ?? "")}<br>
      <strong>State:</strong> ${e(input.state ?? "")}<br>
      <strong>Entity:</strong> ${e(input.entity)}<br>
      <strong>Subject:</strong> ${e(input.subject)}<br>
      <strong>Message:</strong><br>${e(input.message).replace(/\n/g, "<br>")}
    </p>
    <p><strong>Ticket:</strong> ${e(ticket)}</p>
    <p><strong>Source:</strong> Website Contact Form</p>
  `;
}

function adminText(input: { name: string; email: string; contact_no: string; whatsapp?: string; country?: string; state?: string; entity: string; subject: string; message: string }, ticket: string) {
  return `New Inquiry Received

Name: ${input.name}
Email: ${input.email}
Contact: ${input.contact_no}
WhatsApp: ${input.whatsapp ?? ""}
Country: ${input.country ?? ""}
State: ${input.state ?? ""}
Entity: ${input.entity}
Subject: ${input.subject}
Message: ${input.message}

Ticket: ${ticket}
Source: Website Contact Form
`;
}

function clientHtml(name: string, subject: string, message: string, ticket: string) {
  const e = escapeHtml;
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h3>Hi ${e(name)} 👋</h3>
      <p>Thanks for contacting <strong>FormLLC</strong>. We've received your message and our team will reply within one business day.</p>
      <p><strong>Ticket:</strong> ${e(ticket)}<br><strong>Subject:</strong> ${e(subject)}</p>
      <div style="margin:16px 0;padding:12px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px">
        <strong>Your message:</strong><br>
        ${e(message).replace(/\n/g, "<br>")}
      </div>
      <p>If you want to add details, just reply to this email.</p>
      <p>— FormLLC Support</p>
    </div>
  `;
}

function clientText(name: string, subject: string, message: string, ticket: string) {
  return `Hi ${name},

Thanks for contacting FormLLC. We received your message and will reply within one business day.

Ticket: ${ticket}
Subject: ${subject}

Your message:
${message}

— FormLLC Support
`;
}
