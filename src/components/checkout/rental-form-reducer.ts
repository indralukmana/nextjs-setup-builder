import {
  parseRentalContact,
  type RentalContact,
  type RentalContactErrors,
} from "@/lib/rental-request";

export type RentalValidationMessages = {
  nameRequired: string;
  emailInvalid: string;
  phoneInvalid: string;
};

export type RentalFormState = {
  contact: RentalContact;
  errors: RentalContactErrors;
  attempted: boolean;
  status: "idle" | "submitting" | "success";
  submitError: string | null;
  result: { name: string; requestId: string } | null;
};

export type RentalFormAction =
  | {
      type: "fieldChange";
      field: keyof RentalContact;
      value: string;
      messages: RentalValidationMessages;
    }
  | { type: "submitInvalid"; errors: RentalContactErrors }
  | { type: "submitStart" }
  | { type: "submitFail"; message: string }
  | { type: "submitSuccess"; name: string; requestId: string };

export const emptyContact: RentalContact = {
  name: "",
  email: "",
  phone: "",
};

export const initialRentalFormState: RentalFormState = {
  contact: emptyContact,
  errors: {},
  attempted: false,
  status: "idle",
  submitError: null,
  result: null,
};

export function rentalFormReducer(
  state: RentalFormState,
  action: RentalFormAction,
): RentalFormState {
  switch (action.type) {
    case "fieldChange": {
      const contact = { ...state.contact, [action.field]: action.value };
      if (!state.attempted) {
        return { ...state, contact };
      }
      const parsed = parseRentalContact(contact, action.messages);
      return {
        ...state,
        contact,
        errors: parsed.errors ?? {},
        submitError: null,
      };
    }
    case "submitInvalid":
      return {
        ...state,
        attempted: true,
        status: "idle",
        errors: action.errors,
        submitError: null,
        result: null,
      };
    case "submitStart":
      return {
        ...state,
        attempted: true,
        status: "submitting",
        errors: {},
        submitError: null,
      };
    case "submitFail":
      return {
        ...state,
        status: "idle",
        submitError: action.message,
      };
    case "submitSuccess":
      return {
        ...state,
        status: "success",
        submitError: null,
        result: { name: action.name, requestId: action.requestId },
      };
    default:
      return state;
  }
}

export function canSubmitRentalForm(state: RentalFormState, messages: RentalValidationMessages) {
  if (state.status === "submitting") {
    return false;
  }
  if (!state.attempted) {
    return true;
  }
  return parseRentalContact(state.contact, messages).data !== null;
}
