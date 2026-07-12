"use client";

import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { useSetupBuilderHydrated } from "@/hooks/use-setup-builder-hydrated";
import { Link } from "@/i18n/navigation";
import { formatUsd, getRentalTotal, getWeeklyTotal } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

export function SummaryBar() {
  const t = useTranslations("SetupBuilder");
  const hydrated = useSetupBuilderHydrated();
  const deskId = useSetupBuilderStore((state) => state.deskId);
  const chairId = useSetupBuilderStore((state) => state.chairId);
  const accessoryIds = useSetupBuilderStore((state) => state.accessoryIds);
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);
  const selectedIds = [deskId, chairId, ...accessoryIds];
  const weeklyTotal = getWeeklyTotal(selectedIds);
  const total = getRentalTotal(weeklyTotal, rentalWeeks);
  const itemCount = selectedIds.length;

  return (
    <div className="border-border bg-background/95 sticky bottom-0 z-30 border-t backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
        <div className="min-w-0 text-sm">
          {hydrated ? (
            <>
              <p className="font-medium">
                {t("summaryWeekly", {
                  weekly: formatUsd(weeklyTotal),
                  weeks: rentalWeeks,
                })}
              </p>
              <p className="text-muted-foreground">
                {t("summaryTotal", {
                  total: formatUsd(total),
                  count: itemCount,
                })}
              </p>
            </>
          ) : (
            <output className="text-muted-foreground">{t("loadingSummary")}</output>
          )}
        </div>
        <Link
          href="/checkout"
          className={cn(buttonVariants(), "h-10 w-full justify-center sm:h-8 sm:w-auto")}
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
