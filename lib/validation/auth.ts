import { z } from "zod";

// Zod schemas for auth flows. Used on both client and server (B-10 mindset:
// never trust raw input — validate on the server before touching the DB).

export const loginSchema = z.object({
  email: z.string().email("Невалиден имейл адрес"),
  password: z.string().min(1, "Паролата е задължителна")
});

export const registerSchema = z.object({
  name: z.string().min(2, "Името трябва да е поне 2 символа").max(120),
  email: z.string().email("Невалиден имейл адрес"),
  phone: z
    .string()
    .min(6, "Невалиден телефон")
    .max(20)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  password: z
    .string()
    .min(8, "Паролата трябва да е поне 8 символа")
    .max(100, "Паролата е твърде дълга")
    .regex(/[a-z]/, "Поне една малка буква")
    .regex(/[A-Z]/, "Поне една главна буква")
    .regex(/[0-9]/, "Поне една цифра"),
  // B-08: GDPR consent is mandatory — registration fails without an explicit true.
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо е съгласие с обработката на лични данни" })
  })
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
