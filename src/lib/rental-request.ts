import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

import { getProductSync } from "@/lib/catalog-api";

function phoneNumberSchema(invalidMessage: string) {
  return z
    .string()
    .trim()
    .min(1, invalidMessage)
    .max(20, invalidMessage)
    .refine((value) => isValidPhoneNumber(value), { message: invalidMessage });
}

/** API / persisted contact payload (E.164). */
export const rentalContactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z
    .string()
    .trim()
    .min(1)
    .max(20)
    .refine((value) => isValidPhoneNumber(value)),
  whatsapp: z
    .string()
    .trim()
    .min(1)
    .max(20)
    .refine((value) => isValidPhoneNumber(value)),
});

export type RentalContact = z.infer<typeof rentalContactSchema>;

export type RentalContactErrors = Partial<Record<keyof RentalContact, string>>;

export type RentalContactFormValues = {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  whatsappSameAsPhone: boolean;
};

export type RentalContactValidationMessages = {
  nameRequired: string;
  emailInvalid: string;
  phoneInvalid: string;
  whatsappInvalid: string;
};

export const emptyRentalContactFormValues: RentalContactFormValues = {
  name: "",
  email: "",
  phone: "",
  whatsapp: "",
  whatsappSameAsPhone: true,
};

export function createRentalContactFormSchema(messages: RentalContactValidationMessages) {
  return z
    .object({
      name: z.string().trim().min(2, messages.nameRequired).max(80, messages.nameRequired),
      email: z.string().trim().email(messages.emailInvalid).max(120, messages.emailInvalid),
      phone: phoneNumberSchema(messages.phoneInvalid),
      whatsapp: z.string(),
      whatsappSameAsPhone: z.boolean(),
    })
    .superRefine((data, ctx) => {
      if (data.whatsappSameAsPhone) {
        return;
      }
      const result = phoneNumberSchema(messages.whatsappInvalid).safeParse(data.whatsapp);
      if (!result.success) {
        ctx.addIssue({
          code: "custom",
          path: ["whatsapp"],
          message: messages.whatsappInvalid,
        });
      }
    });
}

export function toRentalContact(values: RentalContactFormValues): RentalContact {
  const phone = values.phone.trim();
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    phone,
    whatsapp: (values.whatsappSameAsPhone ? phone : values.whatsapp).trim(),
  };
}

export const rentalRequestSchema = rentalContactSchema.extend({
  deskId: z.string().min(1),
  chairId: z.string().min(1),
  accessoryIds: z.array(z.string()).max(20),
  monitorCount: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  rentalWeeks: z.union([z.literal(1), z.literal(4), z.literal(12)]),
});

export type RentalRequestPayload = z.infer<typeof rentalRequestSchema>;

export function parseRentalContact(
  input: unknown,
  messages: RentalContactValidationMessages,
): { data: RentalContact; errors: null } | { data: null; errors: RentalContactErrors } {
  const result = rentalContactSchema.safeParse(input);
  if (result.success) {
    return { data: result.data, errors: null };
  }

  const errors: RentalContactErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (key === "name") {
      errors.name = messages.nameRequired;
    } else if (key === "email") {
      errors.email = messages.emailInvalid;
    } else if (key === "phone") {
      errors.phone = messages.phoneInvalid;
    } else if (key === "whatsapp") {
      errors.whatsapp = messages.whatsappInvalid;
    }
  }

  return { data: null, errors };
}

export function isValidRentalSetup(payload: {
  deskId: string;
  chairId: string;
  accessoryIds: string[];
  monitorCount: number;
}) {
  if (getProductSync(payload.deskId)?.category !== "desk") {
    return false;
  }
  if (getProductSync(payload.chairId)?.category !== "chair") {
    return false;
  }
  if (![0, 1, 2, 3].includes(payload.monitorCount)) {
    return false;
  }
  return payload.accessoryIds.every(
    (id) => getProductSync(id)?.category === "accessory" && getProductSync(id)?.layer !== "monitor",
  );
}

export function createRentalRequestId() {
  return `rq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function fieldErrorText(errors: unknown[]): string | undefined {
  const first = errors[0];
  if (first == null) return undefined;
  if (typeof first === "string") return first;
  if (typeof first === "object" && "message" in first && typeof first.message === "string") {
    return first.message;
  }
  return String(first);
}
