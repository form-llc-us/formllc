/**
 * Lightweight env accessor. We don't crash on missing values — handlers degrade
 * gracefully and log a clear "missing X" message so you can see what's needed.
 */

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://formllc.us",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "FormLLC",

  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "",
  recaptchaSecret: process.env.RECAPTCHA_SECRET ?? "",

  smtp: {
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER ?? "",
    pass: (process.env.SMTP_PASS ?? "").replace(/\s+/g, ""),
    fromName: process.env.MAIL_FROM_NAME ?? "FormLLC",
  },

  admin: {
    to: process.env.ADMIN_TO ?? "contact@formllc.us",
    cc: process.env.ADMIN_CC ?? "",
    name: process.env.ADMIN_NAME ?? "FormLLC Support",
  },

  db: {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    name: process.env.DB_NAME ?? "",
    user: process.env.DB_USER ?? "",
    pass: process.env.DB_PASS ?? "",
  },

  usDb: {
    host: process.env.US_DB_HOST ?? "localhost",
    port: Number(process.env.US_DB_PORT ?? 3306),
    name: process.env.US_DB_NAME ?? "",
    user: process.env.US_DB_USER ?? "",
    pass: process.env.US_DB_PASS ?? "",
  },

  // Blog CMS — dedicated MySQL connection. Falls back to the global DB envs
  // when MYSQL_* are unset, so a single database can host both.
  blogDb: {
    host: process.env.MYSQL_HOST ?? process.env.DB_HOST ?? "localhost",
    port: Number(process.env.MYSQL_PORT ?? process.env.DB_PORT ?? 3306),
    name: process.env.MYSQL_DATABASE ?? process.env.DB_NAME ?? "",
    user: process.env.MYSQL_USER ?? process.env.DB_USER ?? "",
    pass: process.env.MYSQL_PASSWORD ?? process.env.DB_PASS ?? "",
  },

  blogAdminToken: process.env.BLOG_ADMIN_TOKEN ?? "",

  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY ?? "",
    listId: process.env.MAILCHIMP_LIST_ID ?? "",
    status: process.env.MAILCHIMP_STATUS ?? "subscribed",
  },

  sheets: {
    url: process.env.SHEETS_WEBAPP_URL ?? "",
    token: process.env.SHEETS_TOKEN ?? "",
  },

  meta: {
    pixelId: process.env.META_PIXEL_ID ?? "",
    accessToken: process.env.META_ACCESS_TOKEN ?? "",
    testCode: process.env.META_TEST_CODE ?? "",
  },

  paypal: {
    checkoutUrl:
      process.env.PAYPAL_CHECKOUT_URL ??
      "https://www.paypal.com/instantcommerce/checkout/EVHLN6X5YYQG4",
    clientId: process.env.PAYPAL_CLIENT_ID ?? "",
    clientSecret: process.env.PAYPAL_CLIENT_SECRET ?? "",
    envMode: process.env.PAYPAL_ENV ?? "live",
  },

  taxIntake: {
    downloadSecret: process.env.DOWNLOAD_SECRET ?? "",
    uploadDir: process.env.TAX_INTAKE_UPLOAD_DIR ?? "./public/uploads/tax-intake",
  },

  duplicateBlockSeconds: Number(process.env.DUPLICATE_BLOCK_WINDOW_SECONDS ?? 120),
};

export function logMissing(label: string, name: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[FormLLC] ${label}: missing env "${name}" — handler will use a no-op stub.`);
  }
}
