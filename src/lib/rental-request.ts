import { z } from "zod";

export const rentalContactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^[+\d][\d\s()-]{7,19}$/),
});

export type RentalContact = z.infer<typeof rentalContactSchema>;

export type RentalContactErrors = Partial<Record<keyof RentalContact, string>>;

export function parseRentalContact(
  input: unknown,
  messages: {
    nameRequired: string;
    emailInvalid: string;
    phoneInvalid: string;
  },
): { data: RentalContact; errors: null } | { data: null; errors: RentalContactErrors } {
  const result = rentalContactSchema.safeParse(input);
  if (result.success) {
    return { data: result.data, errors: null };
  }

  const errors: RentalContactErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (key === "name" || key === "email" || key === "phone") {
      if (key === "name") {
        errors.name = messages.nameRequired;
      } else if (key === "email") {
        errors.email = messages.emailInvalid;
      } else {
        errors.phone = messages.phoneInvalid;
      }
    }
  }

  return { data: null, errors };
}
