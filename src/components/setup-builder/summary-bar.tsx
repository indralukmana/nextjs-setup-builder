"use client";

import { useLocale, useTranslations } from "next-intl";

import { RentalDurationPicker } from "@/components/checkout/rental-duration-picker";
import { SummaryBarTotals } from "@/components/setup-builder/summary-bar-totals";
import { buttonVariants } from "@/components/ui/button";
import { useSetupBuilderHydrated } from "@/hooks/use-setup-builder-hydrated";
import { Link } from "@/i18n/navigation";
import { formatMoney, getRentalTotal, getWeeklyTotal } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { expandSetupLineIds, useSetupBuilderStore } from "@/store/setup-builder-store";

type Props = {
  className?: string;
};

/** Compact totals row for under the 3D stage (scene column only). */
export function SummaryBar({ className }: Props) {
  const t = useTranslations("SetupBuilder");
  const locale = useLocale();
  const hydrated = useSetupBuilderHydrated();
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const monitorCount = useSetupBuilderStore((state) => state.monitorCount);
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);
  const setRentalWeeks = useSetupBuilderStore((state) => state.setRentalWeeks);
  const selectedIds = expandSetupLineIds({ deskId, chairId, accessoryIds, monitorCount });
  const weeklyTotal = getWeeklyTotal(selectedIds);
  const total = getRentalTotal(weeklyTotal, rentalWeeks);
  const itemCount = selectedIds.length;

  return (
    <div
      className={cn(
        "border-border bg-background/90 shrink-0 rounded-2xl border px-3 py-3 backdrop-blur",
        className,
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
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
          {hydrated ? (
            <div className="mt-2 max-w-xs">
              <RentalDurationPicker
                id="builder-rental-weeks"
                compact
                label={t("durationLabel")}
                value={rentalWeeks}
                formatOption={(weeks) => t("weeksOption", { count: weeks })}
                onChange={setRentalWeeks}
              />
            </div>
          ) : null}
        </div>
        <Link
          href="/checkout"
          className={cn(
            buttonVariants(),
            "h-9 w-full shrink-0 justify-center px-4 sm:h-9 sm:w-auto",
          )}
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
      </div>
    </div>
  );
}
