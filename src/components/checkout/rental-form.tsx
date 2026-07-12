"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { RentalContactFields } from "@/components/checkout/rental-contact-fields";
import { RentalDurationPicker } from "@/components/checkout/rental-duration-picker";
import { RentalSuccess } from "@/components/checkout/rental-success";
import { RentalTotals } from "@/components/checkout/rental-totals";
import { SetupSummaryEmpty } from "@/components/checkout/setup-summary-empty";
import { StoreReady } from "@/components/setup-builder/store-ready";
import {
  parseRentalContact,
  type RentalContact,
  type RentalContactErrors,
} from "@/lib/rental-request";
import { formatMoney, getRentalTotal, getWeeklyTotal } from "@/lib/pricing";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

const emptyContact: RentalContact = {
  name: "",
  email: "",
  phone: "",
};

export function RentalForm() {
  const t = useTranslations("Checkout");

  return (
    <StoreReady className="min-h-56" label={t("loadingForm")}>
      <RentalFormContent />
    </StoreReady>
  );
}

function RentalFormContent() {
  const t = useTranslations("Checkout");
  const locale = useLocale();
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);
  const setRentalWeeks = useSetupBuilderStore((state) => state.setRentalWeeks);
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [contact, setContact] = useState<RentalContact>(emptyContact);
  const [errors, setErrors] = useState<RentalContactErrors>({});
  const [attempted, setAttempted] = useState(false);
  const selectedIds = [deskId, chairId, ...accessoryIds];

  const weeklyTotal = getWeeklyTotal(selectedIds);
  const total = getRentalTotal(weeklyTotal, rentalWeeks);
  const hasSetup = selectedIds.length > 0 && weeklyTotal > 0;
  const validationMessages = {
    nameRequired: t("errors.nameRequired"),
    emailInvalid: t("errors.emailInvalid"),
    phoneInvalid: t("errors.phoneInvalid"),
  };

  if (!hasSetup) {
    return <SetupSummaryEmpty emptyLabel={t("emptyForm")} editLabel={t("editSetup")} />;
  }

  if (submittedName) {
    return (
      <RentalSuccess
        title={t("successTitle")}
        body={t("successBody", {
          name: submittedName,
          weeks: rentalWeeks,
          total: formatMoney(total, locale),
        })}
        backHomeLabel={t("backHome")}
        editSetupLabel={t("editSetup")}
      />
    );
  }

  const canSubmit = !attempted || parseRentalContact(contact, validationMessages).data !== null;

  return (
    <form
      className="flex flex-col gap-6 rounded-2xl border bg-white/50 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setAttempted(true);
        const parsed = parseRentalContact(contact, validationMessages);
        if (!parsed.data) {
          setErrors(parsed.errors ?? {});
          return;
        }
        setErrors({});
        setSubmittedName(parsed.data.name);
      }}
    >
      <RentalContactFields
        values={contact}
        errors={attempted ? errors : {}}
        labels={{
          name: t("fields.name"),
          email: t("fields.email"),
          phone: t("fields.phone"),
          namePlaceholder: t("fields.namePlaceholder"),
          emailPlaceholder: t("fields.emailPlaceholder"),
          phonePlaceholder: t("fields.phonePlaceholder"),
        }}
        onChange={(field, value) => {
          const next = { ...contact, [field]: value };
          setContact(next);
          if (attempted) {
            const parsed = parseRentalContact(next, validationMessages);
            setErrors(parsed.errors ?? {});
          }
        }}
      />
      <RentalDurationPicker
        label={t("durationLabel")}
        value={rentalWeeks}
        formatOption={(weeks) => t("weeksOption", { count: weeks })}
        onChange={setRentalWeeks}
      />
      <RentalTotals
        weeklyLabel={t("weekly", { amount: formatMoney(weeklyTotal, locale) })}
        totalLabel={t("total", { amount: formatMoney(total, locale) })}
        submitLabel={t("submit")}
        canSubmit={canSubmit}
      />
    </form>
  );
}
