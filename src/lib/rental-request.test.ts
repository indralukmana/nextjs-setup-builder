import { describe, expect, it } from "vitest";

import { parseRentalContact, rentalContactSchema } from "@/lib/rental-request";

const messages = {
  nameRequired: "Enter your name",
  emailInvalid: "Enter a valid email",
  phoneInvalid: "Enter a valid phone",
};

describe("rental-request", () => {
  it("accepts a valid contact payload", () => {
    const parsed = rentalContactSchema.parse({
      name: "Indra",
      email: "indra@example.com",
      phone: "+62 812 3456 7890",
    });

    expect(parsed.name).toBe("Indra");
  });

  it("maps validation failures to field messages", () => {
    const result = parseRentalContact({ name: "A", email: "nope", phone: "12" }, messages);

    expect(result.data).toBeNull();
    expect(result.errors?.name).toBe(messages.nameRequired);
    expect(result.errors?.email).toBe(messages.emailInvalid);
    expect(result.errors?.phone).toBe(messages.phoneInvalid);
  });
});
