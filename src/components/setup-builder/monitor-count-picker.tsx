"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { useSetupBuilderStore, type MonitorCount } from "@/store/setup-builder-store";

const COUNT_OPTIONS = [0, 1, 2, 3] as const satisfies readonly MonitorCount[];

export function MonitorCountPicker() {
  const t = useTranslations("SetupBuilder");
  const monitorCount = useSetupBuilderStore((state) => state.monitorCount);
  const setMonitorCount = useSetupBuilderStore((state) => state.setMonitorCount);

  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-medium">{t("monitorCount.label")}</legend>
      <div className="flex flex-wrap gap-2">
        {COUNT_OPTIONS.map((count) => {
          const isActive = monitorCount === count;
          return (
            <button
              key={count}
              type="button"
              aria-pressed={isActive}
              onClick={() => setMonitorCount(count)}
              className={cn(
                "min-w-14 rounded-xl border px-3 py-2 text-sm tabular-nums transition-colors",
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background hover:bg-muted/60",
              )}
            >
              {count === 0 ? t("monitorCount.none") : t("monitorCount.option", { count })}
            </button>
          );
        })}
      </div>
      <p className="text-muted-foreground text-xs">{t("monitorCount.hint")}</p>
    </fieldset>
  );
}
