import { describe, expect, it } from "vitest";

import {
  canSubmitRentalForm,
  initialRentalFormState,
  rentalFormReducer,
  type RentalValidationMessages,
} from "@/components/checkout/rental-form-reducer";

const messages: RentalValidationMessages = {
  nameRequired: "Enter your name",
  emailInvalid: "Enter a valid email",
  phoneInvalid: "Enter a valid phone",
};

describe("rentalFormReducer", () => {
  it("updates contact without validating before the first attempt", () => {
    const next = rentalFormReducer(initialRentalFormState, {
      type: "fieldChange",
      field: "name",
      value: "A",
      messages,
    });

    expect(next.contact.name).toBe("A");
    expect(next.errors).toEqual({});
    expect(next.attempted).toBe(false);
  });

  it("revalidates on field change after an invalid submit", () => {
    const invalid = rentalFormReducer(initialRentalFormState, {
      type: "submitInvalid",
      errors: { name: messages.nameRequired },
    });

    expect(invalid.attempted).toBe(true);
    expect(invalid.errors.name).toBe(messages.nameRequired);

    const next = rentalFormReducer(invalid, {
      type: "fieldChange",
      field: "name",
      value: "Indra",
      messages,
    });

    expect(next.contact.name).toBe("Indra");
    expect(next.errors.name).toBeUndefined();
  });

  it("moves through submit start, fail, and success", () => {
    const started = rentalFormReducer(initialRentalFormState, { type: "submitStart" });
    expect(started.status).toBe("submitting");
    expect(canSubmitRentalForm(started, messages)).toBe(false);

    const failed = rentalFormReducer(started, {
      type: "submitFail",
      message: "Could not send",
    });
    expect(failed.status).toBe("idle");
    expect(failed.submitError).toBe("Could not send");
    expect(canSubmitRentalForm(failed, messages)).toBe(false);

    const success = rentalFormReducer(started, {
      type: "submitSuccess",
      name: "Indra",
      requestId: "rq_test",
    });
    expect(success.status).toBe("success");
    expect(success.result).toEqual({ name: "Indra", requestId: "rq_test" });
  });
});
