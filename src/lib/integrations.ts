import crypto from "node:crypto";
import { env, logMissing } from "./env";

/**
 * Mailchimp upsert for a contact. Mirrors the legacy PHP behavior:
 * - Hashes lowercase email for member ID
 * - Maps merge tags: NAME, PHONE, WHATSAPP, COUNTRY, ENTITY, STATE, SUBJECT
 * - Tags with "Website Lead" + entity + country
 */
export async function mailchimpUpsert(input: {
  email: string;
  name?: string;
  contact_no?: string;
  whatsapp?: string;
  country?: string;
  entity?: string;
  state?: string;
  subject?: string;
}): Promise<void> {
  if (!env.mailchimp.apiKey || !env.mailchimp.listId) {
    logMissing("mailchimp", "MAILCHIMP_API_KEY/MAILCHIMP_LIST_ID");
    return;
  }
  const dc = env.mailchimp.apiKey.split("-").pop() ?? "";
  if (!dc) return;

  const email = input.email.trim().toLowerCase();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;

  const memberHash = crypto.createHash("md5").update(email).digest("hex");
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${env.mailchimp.listId}/members/${memberHash}`;

  const tags = ["Website Lead"];
  if (input.entity) tags.push(input.entity);
  if (input.country) tags.push(input.country);

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`anystring:${env.mailchimp.apiKey}`).toString("base64"),
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: env.mailchimp.status,
        status: env.mailchimp.status,
        merge_fields: {
          NAME: input.name ?? "",
          PHONE: input.contact_no ?? "",
          WHATSAPP: input.whatsapp ?? "",
          COUNTRY: input.country ?? "",
          ENTITY: input.entity ?? "",
          STATE: input.state ?? "",
          SUBJECT: input.subject ?? "",
        },
        tags,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[mailchimp] upsert failed:", res.status, body);
    }
  } catch (e) {
    console.error("[mailchimp] upsert error:", e);
  }
}

/**
 * Forward a payload to your Google Sheets Apps Script webhook.
 */
export async function pushToSheets(payload: Record<string, unknown>): Promise<void> {
  if (!env.sheets.url || !env.sheets.token) {
    logMissing("sheets", "SHEETS_WEBAPP_URL/SHEETS_TOKEN");
    return;
  }
  try {
    await fetch(env.sheets.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, token: env.sheets.token }),
    });
  } catch (e) {
    console.error("[sheets] push error:", e);
  }
}

/**
 * Send a Lead/Purchase event to Meta Conversions API.
 */
export async function metaCapiEvent(opts: {
  eventName: "Lead" | "Purchase" | "InitiateCheckout" | "Contact";
  eventId: string;
  email?: string;
  phone?: string;
  ip?: string | null;
  ua?: string;
  value?: number;
  currency?: string;
}): Promise<void> {
  if (!env.meta.pixelId || !env.meta.accessToken) {
    logMissing("meta-capi", "META_PIXEL_ID/META_ACCESS_TOKEN");
    return;
  }
  const sha = (s: string) => crypto.createHash("sha256").update(s.trim().toLowerCase()).digest("hex");
  const phoneRaw = (opts.phone ?? "").replace(/[^0-9]/g, "");
  const userData: Record<string, unknown> = {};
  if (opts.email) userData.em = [sha(opts.email)];
  if (phoneRaw) userData.ph = [sha(phoneRaw)];
  if (opts.ua) userData.client_user_agent = opts.ua;
  if (opts.ip) userData.client_ip_address = opts.ip;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: opts.eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_id: opts.eventId,
        user_data: userData,
        custom_data: { currency: opts.currency ?? "USD", value: opts.value ?? 0 },
      },
    ],
  };
  if (env.meta.testCode) payload.test_event_code = env.meta.testCode;

  try {
    const url = `https://graph.facebook.com/v19.0/${env.meta.pixelId}/events?access_token=${env.meta.accessToken}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("[meta-capi] failed:", res.status, await res.text());
    }
  } catch (e) {
    console.error("[meta-capi] error:", e);
  }
}
