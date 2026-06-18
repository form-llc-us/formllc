import { env, logMissing } from "./env";

export async function verifyRecaptcha(
  token: string,
  ip?: string | null
): Promise<{ ok: boolean; error?: string }> {
  if (!env.recaptchaSecret) {
    logMissing("recaptcha", "RECAPTCHA_SECRET");
    // In dev with no secret, allow through; in prod reject explicitly.
    if (process.env.NODE_ENV !== "production") return { ok: true };
    return { ok: false, error: "reCAPTCHA not configured." };
  }
  if (!token) return { ok: false, error: "Captcha token missing." };

  const params = new URLSearchParams({ secret: env.recaptchaSecret, response: token });
  if (ip) params.set("remoteip", ip);

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      cache: "no-store",
    });
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
    if (!data || !data.success) return { ok: false, error: "Captcha verification failed." };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: "Captcha network error." };
  }
}
