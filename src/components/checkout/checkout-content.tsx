"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { RentalForm } from "@/components/checkout/rental-form";
import { RentalSuccess } from "@/components/checkout/rental-success";
import { SetupSummary } from "@/components/checkout/setup-summary";
import { useFormatMoney } from "@/hooks/use-format-money";
import { getRentalTotal, getWeeklyTotal } from "@/lib/pricing";
import { expandSetupLineIds, useSetupBuilderStore } from "@/store/setup-builder-store";

type SuccessState = {
  name: string;
  requestId: string;
};

export function CheckoutContent() {
  const t = useTranslations("Checkout");
  const formatMoney = useFormatMoney();
  const [success, setSuccess] = useState<SuccessState | null>(null);

  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const monitorCount = useSetupBuilderStore((state) => state.monitorCount);
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);
  const selectedIds = expandSetupLineIds({ deskId, chairId, accessoryIds, monitorCount });
  const weeklyTotal = getWeeklyTotal(selectedIds);
  const total = getRentalTotal(weeklyTotal, rentalWeeks);

  if (success) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 md:py-24">
        <RentalSuccess
          title={t("successTitle")}
          body={t("successBody", {
            name: success.name,
            weeks: rentalWeeks,
            total: formatMoney(total),
          })}
          requestId={success.requestId}
          requestIdLabel={t("requestId", { id: success.requestId })}
          copyRequestIdLabel={t("copyRequestId")}
          copyRequestIdCopiedLabel={t("copyRequestIdCopied")}
          backHomeLabel={t("backHome")}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 md:py-10">
      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl tracking-tight md:text-4xl">{t("title")}</h1>
        <p className="text-muted-foreground mt-2 text-sm text-pretty md:text-base">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
        <div className="order-2 lg:order-1">
          <RentalForm onSuccess={setSuccess} />
        </div>
        <div className="order-1 lg:sticky lg:top-20 lg:order-2">
          <SetupSummary
            heading={t("summaryHeading")}
            editLabel={t("editSetup")}
            weeklyLabel={t("weeklyLabel")}
            emptyLabel={t("emptySummary")}
            deliveryTitle={t("delivery.title")}
            deliveryBody={t("delivery.body")}
          />
        </div>
      </div>
    </div>
  );
}
