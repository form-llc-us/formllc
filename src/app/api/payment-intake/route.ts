import { NextResponse } from "next/server";
import { PaymentIntakeSchema } from "@/lib/validators";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendMail, escapeHtml } from "@/lib/mailer";
import { pushToSheets, metaCapiEvent } from "@/lib/integrations";
import { ticketId } from "@/lib/dupe";
import { clientIp, clientUa } from "@/lib/ip";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }
  if (body.company) return NextResponse.json({ ok: true, redirect: "/thank-you" });

  const parsed = PaymentIntakeSchema.safeParse(body);
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

  const ticket = ticketId("PAY");

  await sendMail({
    to: env.admin.to,
    cc: env.admin.cc || undefined,
    replyTo: { email: input.email, name: input.name },
    subject: `[Payment Intake] ${input.name} — $${input.amount} (${input.service})`,
    html: `<h3>New Payment Intake</h3>
      <p><strong>Service:</strong> ${escapeHtml(input.service)}<br>
      <strong>Amount:</strong> $${input.amount}<br>
      <strong>Name:</strong> ${escapeHtml(input.name)}<br>
      <strong>Email:</strong> ${escapeHtml(input.email)}<br>
      <strong>Phone:</strong> ${escapeHtml(input.phone ?? "")}<br>
      <strong>Country:</strong> ${escapeHtml(input.country ?? "")}<br>
      <strong>Notes:</strong> ${escapeHtml(input.notes ?? "")}</p>
      <p><strong>Ticket:</strong> ${escapeHtml(ticket)}</p>`,
  });

  void pushToSheets({ ticket, type: "payment-intake", ...input, ip, ua });
  void metaCapiEvent({
    eventName: "InitiateCheckout",
    eventId: ticket,
    email: input.email,
    phone: input.phone,
    ip,
    ua,
    value: input.amount,
    currency: "USD",
  });

  // TODO: replace static PayPal URL with PayPal Orders API:
  //   POST /v2/checkout/orders → return order.links.find(rel="approve").href
  //   Requires PAYPAL_CLIENT_ID + PAYPAL_CLIENT_SECRET in env.
  const paypal_url = env.paypal.checkoutUrl;

  return NextResponse.json({
    ok: true,
    ticket,
    paypal_url,
    redirect: `/thank-you?ticket=${encodeURIComponent(ticket)}`,
  });
}
