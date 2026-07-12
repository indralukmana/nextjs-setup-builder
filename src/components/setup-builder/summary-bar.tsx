"use client";

import { useTranslations } from "next-intl";

import { RentalDurationPicker } from "@/components/checkout/rental-duration-picker";
import { SummaryBarTotals } from "@/components/setup-builder/summary-bar-totals";
import { buttonVariants } from "@/components/ui/button";
import { useFormatMoney } from "@/hooks/use-format-money";
import { useSetupBuilderHydrated } from "@/hooks/use-setup-builder-hydrated";
import { Link } from "@/i18n/navigation";
import { getRentalTotal, getWeeklyTotal } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { expandSetupLineIds, useSetupBuilderStore } from "@/store/setup-builder-store";

type Props = {
  className?: string;
};

/** Compact totals row for under the 3D stage (scene column only). */
export function SummaryBar({ className }: Props) {
  const t = useTranslations("SetupBuilder");
  const formatMoney = useFormatMoney();
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
        "border-border bg-background/90 shrink-0 rounded-xl border px-3 py-2.5 backdrop-blur sm:py-3",
        className,
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <div className="relative min-w-0 flex-1 basis-[12rem]">
          <div
            className={cn(
              "transition-opacity duration-300 ease-out",
              hydrated ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
            )}
            aria-hidden={!hydrated}
          >
            <SummaryBarTotals
              total={formatMoney(total)}
              supportLine={t("summarySupport", {
                weekly: formatMoney(weeklyTotal),
                count: itemCount,
              })}
            />
          </div>
          <div
            className={cn(
              "transition-opacity duration-300 ease-out",
              hydrated ? "pointer-events-none absolute inset-0 opacity-0" : "opacity-100",
            )}
            aria-busy={!hydrated}
            aria-hidden={hydrated}
          >
            <div className="bg-muted h-7 w-28 animate-pulse rounded-md sm:h-8" />
            <div className="bg-muted mt-1.5 h-4 w-44 animate-pulse rounded-md" />
            <output className="sr-only">{t("loadingSummary")}</output>
          </div>
        </div>

        <div
          className={cn(
            "transition-opacity duration-300 ease-out",
            hydrated ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          aria-hidden={!hydrated}
        >
          <RentalDurationPicker
            id="builder-rental-weeks"
            inline
            compact
            label={t("durationLabel")}
            value={rentalWeeks}
            formatOption={(weeks) => t("weeksOption", { count: weeks })}
            onChange={setRentalWeeks}
          />
        </div>

        <Link
          href="/checkout"
          className={cn(buttonVariants(), "h-9 w-full shrink-0 justify-center px-4 sm:w-auto")}
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
