import { NextResponse } from "next/server";
import { DiscountLeadSchema } from "@/lib/validators";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendMail, escapeHtml } from "@/lib/mailer";
import { mailchimpUpsert, pushToSheets, metaCapiEvent } from "@/lib/integrations";
import { ticketId } from "@/lib/dupe";
import { clientIp, clientUa } from "@/lib/ip";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OFFER_CODE = "ANNIV25";
const OFFER_TITLE = "FormLLC 5th Anniversary";

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  if (body.company) return NextResponse.json({ ok: true, code: OFFER_CODE });

  const parsed = DiscountLeadSchema.safeParse(body);
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

  const ticket = ticketId("DSC");

  void mailchimpUpsert({
    email: input.email,
    name: input.name,
    contact_no: input.phone,
    country: input.country,
    subject: OFFER_TITLE,
  });

  await sendMail({
    to: env.admin.to,
    cc: env.admin.cc || undefined,
    replyTo: { email: input.email, name: input.name },
    subject: `[Discount Lead] ${input.name} — ${OFFER_TITLE}`,
    html: `<h3>${escapeHtml(OFFER_TITLE)}</h3>
      <p><strong>Name:</strong> ${escapeHtml(input.name)}<br>
      <strong>Email:</strong> ${escapeHtml(input.email)}<br>
      <strong>Phone:</strong> ${escapeHtml(input.phone ?? "")}<br>
      <strong>Country:</strong> ${escapeHtml(input.country ?? "")}<br>
      <strong>Source:</strong> ${escapeHtml(input.source ?? "popup")}</p>
      <p><strong>Ticket:</strong> ${escapeHtml(ticket)}</p>`,
  });

  void pushToSheets({
    ticket,
    type: "discount-lead",
    code: OFFER_CODE,
    name: input.name,
    email: input.email,
    phone: input.phone,
    country: input.country,
    source: input.source,
    ip,
    ua,
  });

  void metaCapiEvent({
    eventName: "Lead",
    eventId: ticket,
    email: input.email,
    phone: input.phone,
    ip,
    ua,
  });

  return NextResponse.json({ ok: true, ticket, code: OFFER_CODE, title: OFFER_TITLE });
}
