"use client";

import { useReducer } from "react";
import { useLocale, useTranslations } from "next-intl";

import { RentalContactFields } from "@/components/checkout/rental-contact-fields";
import { RentalDurationPicker } from "@/components/checkout/rental-duration-picker";
import {
  canSubmitRentalForm,
  initialRentalFormState,
  rentalFormReducer,
} from "@/components/checkout/rental-form-reducer";
import { RentalSuccess } from "@/components/checkout/rental-success";
import { RentalTotals } from "@/components/checkout/rental-totals";
import { parseRentalContact } from "@/lib/rental-request";
import { formatMoney, getRentalTotal, getWeeklyTotal } from "@/lib/pricing";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

export function RentalRequestPanel() {
  const t = useTranslations("Checkout");
  const locale = useLocale();
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);
  const setRentalWeeks = useSetupBuilderStore((state) => state.setRentalWeeks);
  const [state, dispatch] = useReducer(rentalFormReducer, initialRentalFormState);

  const selectedIds = [deskId, chairId, ...accessoryIds];
  const weeklyTotal = getWeeklyTotal(selectedIds);
  const total = getRentalTotal(weeklyTotal, rentalWeeks);
  const validationMessages = {
    nameRequired: t("errors.nameRequired"),
    emailInvalid: t("errors.emailInvalid"),
    phoneInvalid: t("errors.phoneInvalid"),
  };

  if (state.status === "success" && state.result) {
    return (
      <RentalSuccess
        title={t("successTitle")}
        body={t("successBody", {
          name: state.result.name,
          weeks: rentalWeeks,
          total: formatMoney(total, locale),
        })}
        requestId={state.result.requestId}
        requestIdLabel={t("requestId", { id: state.result.requestId })}
        copyRequestIdLabel={t("copyRequestId")}
        copyRequestIdCopiedLabel={t("copyRequestIdCopied")}
        backHomeLabel={t("backHome")}
        editSetupLabel={t("editSetup")}
      />
    );
  }

  const canSubmit = canSubmitRentalForm(state, validationMessages);

  return (
    <form
      className="flex flex-col gap-6 rounded-2xl border bg-white/50 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const parsed = parseRentalContact(state.contact, validationMessages);
        if (!parsed.data) {
          dispatch({ type: "submitInvalid", errors: parsed.errors ?? {} });
          return;
        }

        dispatch({ type: "submitStart" });

        void (async () => {
          try {
            const response = await fetch("/api/rental-requests", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...parsed.data,
                deskId,
                chairId,
                accessoryIds,
                rentalWeeks,
              }),
            });
            if (!response.ok) {
              dispatch({ type: "submitFail", message: t("errors.submitFailed") });
              return;
            }
            const payload = (await response.json()) as { requestId?: string };
            if (!payload.requestId) {
              dispatch({ type: "submitFail", message: t("errors.submitFailed") });
              return;
            }
            dispatch({
              type: "submitSuccess",
              name: parsed.data.name,
              requestId: payload.requestId,
            });
          } catch {
            dispatch({ type: "submitFail", message: t("errors.submitFailed") });
          }
        })();
      }}
    >
      <RentalContactFields
        values={state.contact}
        errors={state.attempted ? state.errors : {}}
        labels={{
          name: t("fields.name"),
          email: t("fields.email"),
          phone: t("fields.phone"),
          namePlaceholder: t("fields.namePlaceholder"),
          emailPlaceholder: t("fields.emailPlaceholder"),
          phonePlaceholder: t("fields.phonePlaceholder"),
        }}
        onChange={(field, value) => {
          dispatch({ type: "fieldChange", field, value, messages: validationMessages });
        }}
      />
      <RentalDurationPicker
        label={t("durationLabel")}
        value={rentalWeeks}
        formatOption={(weeks) => t("weeksOption", { count: weeks })}
        onChange={setRentalWeeks}
      />
      {state.submitError ? <p className="text-destructive text-sm">{state.submitError}</p> : null}
      <RentalTotals
        weeklyLabel={t("weekly", { amount: formatMoney(weeklyTotal, locale) })}
        totalLabel={t("total", { amount: formatMoney(total, locale) })}
        submitLabel={state.status === "submitting" ? t("submitting") : t("submit")}
        canSubmit={canSubmit}
      />
    </form>
  );
}
