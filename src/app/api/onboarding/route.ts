import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { OnboardingSchema } from "@/lib/validators";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendMail, escapeHtml } from "@/lib/mailer";
import { pushToSheets, metaCapiEvent } from "@/lib/integrations";
import { ticketId } from "@/lib/dupe";
import { clientIp, clientUa } from "@/lib/ip";
import { getPool } from "@/lib/db";
import { env } from "@/lib/env";
import { PLANS, WIZARD_ADDONS, EIN_SPEED } from "@data/pricing";
import { STATE_FEE_MAP } from "@data/states";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Onboarding wizard handler — mirrors /us/submit_onboarding_wizard.php.
 * Recomputes pricing server-side (anti-tamper), upserts an onboarding_accounts
 * row, then writes a wizard submission. Sends admin + client confirmation.
 */
export async function POST(req: Request) {
  let body: unknown = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const parsed = OnboardingSchema.safeParse(body);
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

  // Recompute pricing server-side.
  const plan = PLANS.find((p) => p.key === input.plan_key);
  if (!plan) {
    return NextResponse.json({ ok: false, errors: { plan_key: "Invalid plan." } }, { status: 422 });
  }
  const stateFee = STATE_FEE_MAP[input.formation_state ?? "Wyoming"] ?? 100;
  const einPriority = input.ein_speed === "Priority" ? EIN_SPEED.Priority.price : 0;
  const addonsTotal =
    (input.addons?.website ? WIZARD_ADDONS.website.price : 0) +
    (input.addons?.seo ? WIZARD_ADDONS.seo.price : 0);
  const totalDue = plan.basePrice + stateFee + einPriority + addonsTotal;

  const ticket = ticketId("ONB");
  const submissionHash = crypto
    .createHash("sha256")
    .update(JSON.stringify({ email: input.account.email, plan: plan.key, total: totalDue, t: Math.floor(Date.now() / 60000) }))
    .digest("hex");

  let accountId: number | null = null;
  let submissionId = 0;

  const pool = getPool("us");
  if (pool) {
    try {
      const conn = await pool.getConnection();
      try {
        // Upsert account
        const [acctResult] = await conn.execute(
          `INSERT INTO onboarding_accounts (first_name, last_name, phone, email, must_set_password)
           VALUES (?, ?, ?, ?, 1)
           ON DUPLICATE KEY UPDATE first_name=VALUES(first_name), last_name=VALUES(last_name), phone=VALUES(phone), updated_at=NOW()`,
          [input.account.first_name, input.account.last_name, input.account.phone, input.account.email]
        );
        accountId = (acctResult as { insertId?: number }).insertId ?? null;
        if (!accountId) {
          const [rows] = await conn.query(`SELECT id FROM onboarding_accounts WHERE email = ? LIMIT 1`, [input.account.email]);
          if (Array.isArray(rows) && rows.length > 0) accountId = (rows[0] as { id: number }).id;
        }

        const [subResult] = await conn.execute(
          `INSERT INTO onboarding_wizard_submissions
            (account_id, country, intent, entity_main, corp_tax, entity_display, company_name, formation_state,
             plan_key, plan_label, ein_speed, addons_json, pricing_json, total_due_today, currency,
             pay_email, pay_name, pay_country, card_last4, submission_hash, status, ip, ua, raw_payload)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'USD',
                    ?, ?, ?, ?, ?, 'new', ?, ?, ?)`,
          [
            accountId,
            input.country ?? null,
            input.intent ?? null,
            input.entity_main ?? null,
            input.corp_tax ?? null,
            input.entity_display ?? null,
            input.company_name ?? null,
            input.formation_state ?? null,
            input.plan_key,
            plan.label,
            input.ein_speed ?? "Standard",
            JSON.stringify(input.addons ?? {}),
            JSON.stringify({
              plan_base: plan.basePrice,
              state_fee: stateFee,
              ein_priority: einPriority,
              addons_total: addonsTotal,
              total_due_today: totalDue,
            }),
            totalDue,
            input.pay?.email ?? null,
            input.pay?.name ?? null,
            input.pay?.country ?? null,
            input.pay?.card_last4 ?? null,
            submissionHash,
            ip,
            ua,
            JSON.stringify(input),
          ]
        );
        submissionId = (subResult as { insertId?: number }).insertId ?? 0;
      } finally {
        conn.release();
      }
    } catch (e) {
      console.error("[onboarding] DB error:", e);
    }
  }

  // Email admin + client
  const e = escapeHtml;
  const adminBody = `
    <h3>New Onboarding Submission</h3>
    <p>
      <strong>Account:</strong> ${e(input.account.first_name)} ${e(input.account.last_name)} — ${e(input.account.email)}, ${e(input.account.phone)}<br>
      <strong>Country:</strong> ${e(input.country ?? "")}<br>
      <strong>Intent:</strong> ${e(input.intent ?? "")}<br>
      <strong>Entity:</strong> ${e(input.entity_main ?? "")}${input.corp_tax ? ` → ${e(input.corp_tax)}` : ""}<br>
      <strong>Company name:</strong> ${e(input.company_name ?? "")}<br>
      <strong>State:</strong> ${e(input.formation_state ?? "")} (filing fee $${stateFee})<br>
      <strong>Plan:</strong> ${e(plan.label)} ($${plan.basePrice})<br>
      <strong>EIN speed:</strong> ${e(input.ein_speed ?? "Standard")}${einPriority ? ` (+$${einPriority})` : ""}<br>
      <strong>Add-ons:</strong> website=${input.addons?.website ? "yes" : "no"}, seo=${input.addons?.seo ? "yes" : "no"} (total $${addonsTotal})<br>
      <strong>Total due:</strong> $${totalDue}
    </p>
    <p><strong>Ticket:</strong> ${e(ticket)} | <strong>Submission ID:</strong> ${submissionId} | <strong>Account ID:</strong> ${accountId ?? "n/a"}</p>
  `;

  await Promise.all([
    sendMail({
      to: env.admin.to,
      cc: env.admin.cc || undefined,
      replyTo: { email: input.account.email, name: `${input.account.first_name} ${input.account.last_name}` },
      subject: `[Onboarding] ${input.account.first_name} ${input.account.last_name} — ${plan.label} ($${totalDue})`,
      html: adminBody,
    }),
    sendMail({
      to: input.account.email,
      replyTo: { email: env.admin.to, name: env.admin.name },
      subject: `Welcome to FormLLC — ${plan.label} order received (${ticket})`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>Hi ${e(input.account.first_name)} 👋</h2>
        <p>Thanks for choosing FormLLC. We've received your onboarding for the <strong>${e(plan.label)}</strong> plan.</p>
        <p><strong>Order summary</strong></p>
        <ul>
          <li>Plan: ${e(plan.label)} — $${plan.basePrice}</li>
          <li>State filing fee (${e(input.formation_state ?? "Wyoming")}): $${stateFee}</li>
          <li>EIN: ${e(input.ein_speed ?? "Standard")}${einPriority ? ` (+$${einPriority})` : ""}</li>
          ${input.addons?.website ? `<li>Custom website: +$${WIZARD_ADDONS.website.price}</li>` : ""}
          ${input.addons?.seo ? `<li>On-page SEO: +$${WIZARD_ADDONS.seo.price}</li>` : ""}
          <li><strong>Total: $${totalDue}</strong></li>
        </ul>
        <p>Your onboarding ticket is <strong>${e(ticket)}</strong>. Our team will follow up within 1 business day with payment instructions and next steps.</p>
        <p>— FormLLC</p>
      </div>`,
    }),
  ]);

  void pushToSheets({
    ticket,
    type: "onboarding",
    account_id: accountId,
    submission_id: submissionId,
    plan_key: plan.key,
    plan_label: plan.label,
    total_due: totalDue,
    state_fee: stateFee,
    ...input.account,
    formation_state: input.formation_state,
    company_name: input.company_name,
    ip,
    ua,
  });
  void metaCapiEvent({
    eventName: "InitiateCheckout",
    eventId: ticket,
    email: input.account.email,
    phone: input.account.phone,
    ip,
    ua,
    value: totalDue,
    currency: "USD",
  });

  return NextResponse.json({
    ok: true,
    ticket,
    submission_id: submissionId,
    account_id: accountId,
    redirect: `/us/thank-you?ticket=${encodeURIComponent(ticket)}&name=${encodeURIComponent(input.account.first_name)}`,
  });
}
