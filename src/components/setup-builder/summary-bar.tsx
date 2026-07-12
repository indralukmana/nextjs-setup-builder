"use client";

import { useLocale, useTranslations } from "next-intl";

import { RentalDurationPicker } from "@/components/checkout/rental-duration-picker";
import { SummaryBarTotals } from "@/components/setup-builder/summary-bar-totals";
import { buttonVariants } from "@/components/ui/button";
import { useSetupBuilderHydrated } from "@/hooks/use-setup-builder-hydrated";
import { Link } from "@/i18n/navigation";
import { formatMoney, getRentalTotal, getWeeklyTotal } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

export function SummaryBar() {
  const t = useTranslations("SetupBuilder");
  const locale = useLocale();
  const hydrated = useSetupBuilderHydrated();
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);
  const setRentalWeeks = useSetupBuilderStore((state) => state.setRentalWeeks);
  const selectedIds = [deskId, chairId, ...accessoryIds];
  const weeklyTotal = getWeeklyTotal(selectedIds);
  const total = getRentalTotal(weeklyTotal, rentalWeeks);
  const itemCount = selectedIds.length;

  const reviewLink = (
    <Link
      href="/checkout"
      className={cn(buttonVariants(), "h-9 shrink-0 justify-center px-4 sm:h-8 lg:self-end")}
      aria-disabled={!hydrated}
      tabIndex={hydrated ? undefined : -1}
      onClick={(event) => {
        if (!hydrated) {
          event.preventDefault();
        }
      }}
    >
      {t("reviewRental")}
    </Link>
  );

  return (
    <div className="border-border bg-background/95 sticky bottom-0 z-30 border-t backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-2.5 sm:gap-3 sm:px-6 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          {hydrated ? (
            <SummaryBarTotals
              weeklyLine={t("summaryWeekly", {
                weekly: formatMoney(weeklyTotal, locale),
                weeks: rentalWeeks,
              })}
              totalLine={t("summaryTotal", {
                total: formatMoney(total, locale),
                count: itemCount,
              })}
            />
          ) : (
            <output className="text-muted-foreground text-sm">{t("loadingSummary")}</output>
          )}
          <div className="hidden sm:block">{reviewLink}</div>
        </div>
        {hydrated ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div className="w-full sm:max-w-xs">
              <RentalDurationPicker
                id="builder-rental-weeks"
                compact
                label={t("durationLabel")}
                value={rentalWeeks}
                formatOption={(weeks) => t("weeksOption", { count: weeks })}
                onChange={setRentalWeeks}
              />
            </div>
            <div className="sm:hidden">{reviewLink}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
