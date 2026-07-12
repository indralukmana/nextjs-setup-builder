"use client";

import { useMemo, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";

import { RentalDurationPicker } from "@/components/checkout/rental-duration-picker";
import { RentalPhoneField } from "@/components/checkout/rental-phone-field";
import { RentalTextField } from "@/components/checkout/rental-text-field";
import { RentalTotals } from "@/components/checkout/rental-totals";
import { useFormatMoney } from "@/hooks/use-format-money";
import { getRentalTotal, getWeeklyTotal } from "@/lib/pricing";
import {
  createRentalContactFormSchema,
  emptyRentalContactFormValues,
  fieldErrorText,
  toRentalContact,
} from "@/lib/rental-request";
import { expandSetupLineIds, useSetupBuilderStore } from "@/store/setup-builder-store";

type SubmitStatus = "idle" | "submitting";

type Props = {
  onSuccess: (result: { name: string; requestId: string }) => void;
};

export function RentalRequestPanel({ onSuccess }: Props) {
  const t = useTranslations("Checkout");
  const formatMoney = useFormatMoney();
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const monitorCount = useSetupBuilderStore((state) => state.monitorCount);
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);
  const setRentalWeeks = useSetupBuilderStore((state) => state.setRentalWeeks);

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedIds = expandSetupLineIds({ deskId, chairId, accessoryIds, monitorCount });
  const weeklyTotal = getWeeklyTotal(selectedIds);
  const total = getRentalTotal(weeklyTotal, rentalWeeks);

  const nameRequired = t("errors.nameRequired");
  const emailInvalid = t("errors.emailInvalid");
  const phoneInvalid = t("errors.phoneInvalid");
  const whatsappInvalid = t("errors.whatsappInvalid");
  const contactSchema = useMemo(
    () =>
      createRentalContactFormSchema({
        nameRequired,
        emailInvalid,
        phoneInvalid,
        whatsappInvalid,
      }),
    [nameRequired, emailInvalid, phoneInvalid, whatsappInvalid],
  );

  const form = useForm({
    defaultValues: emptyRentalContactFormValues,
    validators: {
      onSubmit: contactSchema,
      onBlur: contactSchema,
    },
    onSubmit: async ({ value }) => {
      const contact = toRentalContact(value);
      setStatus("submitting");
      setSubmitError(null);

      try {
        const response = await fetch("/api/rental-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...contact,
            deskId,
            chairId,
            accessoryIds,
            monitorCount,
            rentalWeeks,
          }),
        });
        if (!response.ok) {
          setStatus("idle");
          setSubmitError(t("errors.submitFailed"));
          return;
        }
        const payload = (await response.json()) as { requestId?: string };
        if (!payload.requestId) {
          setStatus("idle");
          setSubmitError(t("errors.submitFailed"));
          return;
        }
        onSuccess({ name: contact.name, requestId: payload.requestId });
      } catch {
        setStatus("idle");
        setSubmitError(t("errors.submitFailed"));
      }
    },
  });

  return (
    <form
      className="border-border/80 flex flex-col gap-6 rounded-xl border bg-background/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] sm:p-6"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg tracking-tight">{t("contactHeading")}</h2>

        <form.Field name="name">
          {(field) => (
            <RentalTextField
              id="rental-name"
              label={t("fields.name")}
              value={field.state.value}
              placeholder={t("fields.namePlaceholder")}
              autoComplete="name"
              required
              error={fieldErrorText(field.state.meta.errors)}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
            />
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <RentalTextField
              id="rental-email"
              label={t("fields.email")}
              type="email"
              value={field.state.value}
              placeholder={t("fields.emailPlaceholder")}
              autoComplete="email"
              required
              error={fieldErrorText(field.state.meta.errors)}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
            />
          )}
        </form.Field>

        <form.Field name="phone">
          {(field) => (
            <RentalPhoneField
              id="rental-phone"
              label={t("fields.phone")}
              value={field.state.value}
              placeholder={t("fields.phonePlaceholder")}
              required
              error={fieldErrorText(field.state.meta.errors)}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
            />
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.values.whatsappSameAsPhone, state.values.phone] as const}
        >
          {([whatsappSameAsPhone, phone]) => (
            <form.Field name="whatsapp">
              {(field) => (
                <RentalPhoneField
                  id="rental-whatsapp"
                  label={t("fields.whatsapp")}
                  value={whatsappSameAsPhone ? phone : field.state.value}
                  placeholder={t("fields.whatsappPlaceholder")}
                  disabled={whatsappSameAsPhone}
                  required={!whatsappSameAsPhone}
                  error={whatsappSameAsPhone ? undefined : fieldErrorText(field.state.meta.errors)}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  labelAction={
                    <form.Field name="whatsappSameAsPhone">
                      {(sameField) => (
                        <label className="text-muted-foreground flex cursor-pointer items-center gap-1.5 text-xs font-normal">
                          <input
                            id="rental-whatsapp-same"
                            type="checkbox"
                            checked={sameField.state.value}
                            onBlur={sameField.handleBlur}
                            onChange={(event) => sameField.handleChange(event.target.checked)}
                            className="border-input text-primary focus-visible:ring-ring/50 size-3.5 rounded border accent-current outline-none focus-visible:ring-3"
                          />
                          <span>{t("fields.whatsappSameAsPhone")}</span>
                        </label>
                      )}
                    </form.Field>
                  }
                />
              )}
            </form.Field>
          )}
        </form.Subscribe>
      </div>

      <RentalDurationPicker
        label={t("durationLabel")}
        value={rentalWeeks}
        formatOption={(weeks) => t("weeksOption", { count: weeks })}
        onChange={setRentalWeeks}
      />

      {submitError ? <p className="text-destructive text-sm">{submitError}</p> : null}

      <form.Subscribe
        selector={(state) =>
          [state.canSubmit, state.isSubmitting, state.submissionAttempts] as const
        }
      >
        {([canSubmit, isSubmitting, submissionAttempts]) => (
          <RentalTotals
            weeklyLabel={t("weekly", { amount: formatMoney(weeklyTotal) })}
            totalLabel={t("total", { amount: formatMoney(total) })}
            submitLabel={status === "submitting" || isSubmitting ? t("submitting") : t("submit")}
            canSubmit={
              status !== "submitting" && !isSubmitting && (submissionAttempts === 0 || canSubmit)
            }
          />
        )}
      </form.Subscribe>
    </form>
  );
}
