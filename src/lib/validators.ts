import { z } from "zod";

const phoneRegex = /^\+[0-9]{8,15}$/;

export const ContactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  contact_no: z.string().trim().regex(phoneRegex, "Use country code, e.g. +15550000000"),
  whatsapp: z.string().trim().regex(phoneRegex).optional().or(z.literal("")).transform((v) => (v === "" ? undefined : v)),
  country: z.string().trim().min(1),
  entity: z.string().trim().min(1),
  state: z.string().trim().min(1),
  subject: z.string().trim().min(1),
  message: z.string().trim().min(1),
  company: z.string().optional(), // honeypot
  "g-recaptcha-response": z.string().optional(),
  captcha: z.string().optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export const FaqQuoteSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(phoneRegex).optional().or(z.literal("")),
  country: z.string().trim().optional(),
  entity: z.string().trim().optional(),
  state: z.string().trim().optional(),
  question: z.string().trim().min(1),
  company: z.string().optional(),
  "g-recaptcha-response": z.string().optional(),
});

export const DiscountLeadSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(phoneRegex).optional().or(z.literal("")),
  country: z.string().trim().optional(),
  source: z.string().optional(),
  company: z.string().optional(),
  "g-recaptcha-response": z.string().optional(),
});

export const PaymentIntakeSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(phoneRegex).optional().or(z.literal("")),
  country: z.string().trim().optional(),
  amount: z.number().positive(),
  service: z.string().trim().min(1),
  notes: z.string().trim().optional(),
  company: z.string().optional(),
  "g-recaptcha-response": z.string().optional(),
});

export const TaxIntakeSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(phoneRegex).optional().or(z.literal("")),
  entity_name: z.string().trim().optional(),
  entity_type: z.string().trim().optional(),
  state: z.string().trim().optional(),
  ein: z.string().trim().optional(),
  tax_year: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  company: z.string().optional(),
  "g-recaptcha-response": z.string().optional(),
});

export const OnboardingSchema = z.object({
  account: z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    phone: z.string().regex(phoneRegex),
    email: z.string().email(),
  }),
  country: z.string().optional(),
  intent: z.enum(["new", "existing"]).optional(),
  entity_main: z.enum(["LLC", "C-Corp"]).optional(),
  corp_tax: z.enum(["C-Corp", "S-Corp"]).optional(),
  entity_display: z.string().optional(),
  company_name: z.string().optional(),
  formation_state: z.string().optional(),
  plan_key: z.enum(["starter", "standard", "rtr"]),
  plan_label: z.string().optional(),
  ein_speed: z.enum(["Standard", "Priority"]).optional(),
  addons: z.object({ website: z.boolean().optional(), seo: z.boolean().optional() }).optional(),
  pay: z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    country: z.string().optional(),
    card_last4: z.string().regex(/^\d{4}$/).optional(),
  }).optional(),
  "g-recaptcha-response": z.string().optional(),
});
