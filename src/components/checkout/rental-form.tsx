"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formatUsd, getRentalTotal, getWeeklyTotal } from "@/lib/pricing";
import { selectSelectedIds, useSetupBuilderStore } from "@/store/setup-builder-store";

const WEEK_OPTIONS = ["1", "4", "12"] as const;

export function RentalForm() {
  const selectedIds = useSetupBuilderStore(selectSelectedIds);
  const rentalWeeks = useSetupBuilderStore((state) => state.rentalWeeks);
  const setRentalWeeks = useSetupBuilderStore((state) => state.setRentalWeeks);
  const [submitted, setSubmitted] = useState(false);

  const weeklyTotal = getWeeklyTotal(selectedIds);
  const total = getRentalTotal(weeklyTotal, rentalWeeks);

  if (submitted) {
    return (
      <div className="rounded-xl border px-4 py-6 text-sm">
        <p className="font-medium">Rental request sent</p>
        <p className="text-muted-foreground mt-1">
          We&apos;ll confirm delivery for your {rentalWeeks}-week setup ({formatUsd(total)}).
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4 rounded-xl border p-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="rental-weeks">
          Rental duration
        </label>
        <ToggleGroup
          id="rental-weeks"
          value={[String(rentalWeeks)]}
          onValueChange={(values) => {
            const next = values[0];
            if (next) {
              setRentalWeeks(Number(next));
            }
          }}
          variant="outline"
        >
          {WEEK_OPTIONS.map((weeks) => (
            <ToggleGroupItem key={weeks} value={weeks}>
              {weeks} wk
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <p className="text-sm">
        Weekly {formatUsd(weeklyTotal)} · Total{" "}
        <span className="font-medium">{formatUsd(total)}</span>
      </p>
      <Button type="submit">Request rental</Button>
    </form>
  );
}
