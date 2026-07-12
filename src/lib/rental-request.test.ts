import { describe, expect, it } from "vitest";

import {
  isValidRentalSetup,
  parseRentalContact,
  rentalContactSchema,
  rentalRequestSchema,
} from "@/lib/rental-request";

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

  it("accepts a full rental request payload with a valid setup", () => {
    const parsed = rentalRequestSchema.parse({
      name: "Indra",
      email: "indra@example.com",
      phone: "+62 812 3456 7890",
      deskId: "desk-electric",
      chairId: "chair-ergonomic",
      accessoryIds: ["lamp-led"],
      rentalWeeks: 4,
    });

    expect(isValidRentalSetup(parsed)).toBe(true);
  });

  it("rejects invalid setup product ids", () => {
    expect(
      isValidRentalSetup({
        deskId: "not-a-desk",
        chairId: "chair-ergonomic",
        accessoryIds: [],
      }),
    ).toBe(false);
  });
});
