"use client";

import { useTranslations } from "next-intl";

import { RentalRequestPanel } from "@/components/checkout/rental-request-panel";
import { SetupSummaryEmpty } from "@/components/checkout/setup-summary-empty";
import { StoreReady } from "@/components/setup-builder/store-ready";
import { getWeeklyTotal } from "@/lib/pricing";
import { expandSetupLineIds, useSetupBuilderStore } from "@/store/setup-builder-store";

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
  const monitorCount = useSetupBuilderStore((state) => state.monitorCount);
  const selectedIds = expandSetupLineIds({ deskId, chairId, accessoryIds, monitorCount });
  const weeklyTotal = getWeeklyTotal(selectedIds);
  const hasSetup = selectedIds.length > 0 && weeklyTotal > 0;

  if (!hasSetup) {
    return <SetupSummaryEmpty emptyLabel={t("emptyForm")} editLabel={t("editSetup")} />;
  }

  return <RentalRequestPanel />;
}
