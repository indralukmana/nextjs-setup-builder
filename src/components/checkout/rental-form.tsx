"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button, buttonVariants } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Link } from "@/i18n/navigation";
import { formatUsd, getRentalTotal, getWeeklyTotal } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

const WEEK_OPTIONS = ["1", "4", "12"] as const;

export function RentalForm() {
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

  if (submitted) {
    return (
      <div className="flex flex-col gap-5 rounded-2xl border bg-[linear-gradient(160deg,rgba(220,235,205,0.55),rgba(255,255,255,0.7))] px-5 py-7">
        <div className="bg-primary/15 size-2.5 rounded-full" aria-hidden />
        <div>
          <p className="font-heading text-xl tracking-tight">{t("successTitle")}</p>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty">
            {t("successBody", { weeks: rentalWeeks, total: formatUsd(total) })}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
            {t("backHome")}
          </Link>
          <Link href="/setup-builder" className={cn(buttonVariants({ variant: "ghost" }))}>
            {t("editSetup")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-6 rounded-2xl border bg-white/50 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium" htmlFor="rental-weeks">
          {t("durationLabel")}
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
          className="!grid w-full grid-cols-3 gap-2"
        >
          {WEEK_OPTIONS.map((weeks) => (
            <ToggleGroupItem key={weeks} value={weeks} className="h-11">
              {t("weeksOption", { count: Number(weeks) })}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="border-border/70 flex items-end justify-between gap-4 border-t pt-4">
        <div className="text-sm">
          <p className="text-muted-foreground">{t("weekly", { amount: formatUsd(weeklyTotal) })}</p>
          <p className="font-heading mt-1 text-2xl tracking-tight">
            {t("total", { amount: formatUsd(total) })}
          </p>
        </div>
        <Button type="submit" size="lg" className="h-11 px-5">
          {t("submit")}
        </Button>
      </div>
    </form>
  );
}
