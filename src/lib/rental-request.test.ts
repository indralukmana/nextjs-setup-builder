import { describe, expect, it } from "vitest";

import {
  createRentalContactFormSchema,
  isValidRentalSetup,
  parseRentalContact,
  rentalContactSchema,
  rentalRequestSchema,
  toRentalContact,
} from "@/lib/rental-request";

const messages = {
  nameRequired: "Enter your name",
  emailInvalid: "Enter a valid email",
  phoneInvalid: "Enter a valid phone",
  whatsappInvalid: "Enter a valid WhatsApp",
};

describe("rental-request", () => {
  it("accepts a valid E.164 contact payload", () => {
    const parsed = rentalContactSchema.parse({
      name: "Indra",
      email: "indra@example.com",
      phone: "+6281234567890",
      whatsapp: "+6281234567890",
    });

    expect(parsed.name).toBe("Indra");
    expect(parsed.phone).toBe("+6281234567890");
  });

  it("rejects invalid phone numbers", () => {
    const result = parseRentalContact(
      { name: "Indra", email: "indra@example.com", phone: "+6212", whatsapp: "+6212" },
      messages,
    );

    expect(result.data).toBeNull();
    expect(result.errors?.phone).toBe(messages.phoneInvalid);
    expect(result.errors?.whatsapp).toBe(messages.whatsappInvalid);
  });

  it("maps validation failures to field messages", () => {
    const result = parseRentalContact(
      { name: "A", email: "nope", phone: "12", whatsapp: "12" },
      messages,
    );

    expect(result.data).toBeNull();
    expect(result.errors?.name).toBe(messages.nameRequired);
    expect(result.errors?.email).toBe(messages.emailInvalid);
    expect(result.errors?.phone).toBe(messages.phoneInvalid);
  });

  it("copies phone into whatsapp when same-as-phone is enabled", () => {
    expect(
      toRentalContact({
        name: "Indra",
        email: "indra@example.com",
        phone: "+6281234567890",
        whatsapp: "",
        whatsappSameAsPhone: true,
      }),
    ).toEqual({
      name: "Indra",
      email: "indra@example.com",
      phone: "+6281234567890",
      whatsapp: "+6281234567890",
    });
  });

  it("validates form values with a separate whatsapp number", () => {
    const schema = createRentalContactFormSchema(messages);
    const parsed = schema.parse({
      name: "Indra",
      email: "indra@example.com",
      phone: "+6281211111111",
      whatsapp: "+6281222222222",
      whatsappSameAsPhone: false,
    });

    expect(parsed.whatsapp).toBe("+6281222222222");
  });

  it("skips whatsapp field validation when same-as-phone is enabled", () => {
    const schema = createRentalContactFormSchema(messages);
    expect(() =>
      schema.parse({
        name: "Indra",
        email: "indra@example.com",
        phone: "+6281234567890",
        whatsapp: "",
        whatsappSameAsPhone: true,
      }),
    ).not.toThrow();
  });

  it("accepts a full rental request payload with a valid setup", () => {
    const parsed = rentalRequestSchema.parse({
      name: "Indra",
      email: "indra@example.com",
      phone: "+6281234567890",
      whatsapp: "+6281299990000",
      deskId: "desk-bollsidan",
      chairId: "chair-alefjall",
      accessoryIds: ["lamp-nymane"],
      monitorCount: 1,
      rentalWeeks: 4,
    });

    expect(isValidRentalSetup(parsed)).toBe(true);
  });

  it("rejects invalid setup product ids", () => {
    expect(
      isValidRentalSetup({
        deskId: "not-a-desk",
        chairId: "chair-alefjall",
        accessoryIds: [],
        monitorCount: 1,
      }),
    ).toBe(false);
  });
});
