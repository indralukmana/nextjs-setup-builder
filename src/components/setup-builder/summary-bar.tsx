"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { formatUsd, getRentalTotal, getWeeklyTotal } from "@/lib/pricing";
import { selectSelectedIds, useSetupBuilderStore } from "@/store/setup-builder-store";

export function SummaryBar() {
  const selectedIds = useSetupBuilderStore(selectSelectedIds);
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);
  const weeklyTotal = getWeeklyTotal(selectedIds);
  const total = getRentalTotal(weeklyTotal, rentalWeeks);

  return (
    <div className="border-border bg-background/95 sticky bottom-0 z-30 border-t backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <div className="text-sm">
          <p className="font-medium">
            {formatUsd(weeklyTotal)}/week · {rentalWeeks} weeks
          </p>
          <p className="text-muted-foreground">
            Total {formatUsd(total)} · {selectedIds.length} items
          </p>
        </div>
        <Button render={<Link href="/checkout" />}>Review rental</Button>
      </div>
    </div>
  );
}
