"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { RentalDurationPicker } from "@/components/checkout/rental-duration-picker";
import { RentalSuccess } from "@/components/checkout/rental-success";
import { RentalTotals } from "@/components/checkout/rental-totals";
import { StoreReady } from "@/components/setup-builder/store-ready";
import { formatUsd, getRentalTotal, getWeeklyTotal } from "@/lib/pricing";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

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
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);
  const setRentalWeeks = useSetupBuilderStore((state) => state.setRentalWeeks);
  const [submitted, setSubmitted] = useState(false);
  const selectedIds = [deskId, chairId, ...accessoryIds];

  const weeklyTotal = getWeeklyTotal(selectedIds);
  const total = getRentalTotal(weeklyTotal, rentalWeeks);
  const canSubmit = selectedIds.length > 0 && weeklyTotal > 0;

  if (submitted) {
    return (
      <RentalSuccess
        title={t("successTitle")}
        body={t("successBody", { weeks: rentalWeeks, total: formatUsd(total) })}
        backHomeLabel={t("backHome")}
        editSetupLabel={t("editSetup")}
      />
    );
  }

  return (
    <form
      className="flex flex-col gap-6 rounded-2xl border bg-white/50 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
      onSubmit={(event) => {
        event.preventDefault();
        if (!canSubmit) {
          return;
        }
        setSubmitted(true);
      }}
    >
      <RentalDurationPicker
        label={t("durationLabel")}
        value={rentalWeeks}
        formatOption={(weeks) => t("weeksOption", { count: weeks })}
        onChange={setRentalWeeks}
      />
      <RentalTotals
        weeklyLabel={t("weekly", { amount: formatUsd(weeklyTotal) })}
        totalLabel={t("total", { amount: formatUsd(total) })}
        submitLabel={t("submit")}
        canSubmit={canSubmit}
      />
    </form>
  );
}
