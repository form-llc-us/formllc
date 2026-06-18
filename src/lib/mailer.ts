import nodemailer from "nodemailer";
import { env, logMissing } from "./env";

export type MailMessage = {
  to: string | string[];
  cc?: string | string[];
  replyTo?: { email: string; name?: string };
  subject: string;
  html: string;
  text?: string;
};

let transporter: nodemailer.Transporter | null = null;

function getTransport() {
  if (transporter) return transporter;
  if (!env.smtp.user || !env.smtp.pass) {
    logMissing("mailer", "SMTP_USER/SMTP_PASS");
    return null;
  }
  transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465 ? true : env.smtp.secure,
    auth: { user: env.smtp.user, pass: env.smtp.pass },
  });
  return transporter;
}

export async function sendMail(msg: MailMessage): Promise<{ ok: boolean; error?: string }> {
  const t = getTransport();
  if (!t) return { ok: false, error: "Mailer not configured" };

  try {
    await t.sendMail({
      from: { name: env.smtp.fromName, address: env.smtp.user },
      to: msg.to,
      cc: msg.cc,
      replyTo: msg.replyTo ? { name: msg.replyTo.name ?? "", address: msg.replyTo.email } : undefined,
      subject: msg.subject,
      html: msg.html,
      text: msg.text,
    });
    return { ok: true };
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    console.error("[mailer] send failed:", error);
    return { ok: false, error };
  }
}

export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
