"use client";

import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { setupPresets, type SetupPresetId } from "@/data/presets";
import { formatMoney, getWeeklyTotal } from "@/lib/pricing";
import { expandSetupLineIds, useSetupBuilderStore } from "@/store/setup-builder-store";

type Props = {
  /** Compact native select for the catalog rail. */
  variant?: "default" | "rail";
};

export function PresetPicker({ variant = "default" }: Props) {
  const t = useTranslations("SetupBuilder.presets");
  const locale = useLocale();
  const applyPreset = useSetupBuilderStore((state) => state.applyPreset);
  const isRail = variant === "rail";

  if (isRail) {
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor="setup-preset" className="text-sm font-medium">
          {t("label")}
        </label>
        <select
          id="setup-preset"
          className="border-input bg-background h-9 w-full rounded-lg border px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3"
          defaultValue=""
          onChange={(event) => {
            const id = event.target.value;
            if (!id) return;
            applyPreset(id as SetupPresetId);
            event.target.value = "";
          }}
        >
          <option value="" disabled>
            {t("placeholder")}
          </option>
          {setupPresets.map((preset) => {
            const weekly = getWeeklyTotal(expandSetupLineIds(preset));
            return (
              <option key={preset.id} value={preset.id}>
                {t(`${preset.id}.name`)} · {formatMoney(weekly, locale)}/wk
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium">{t("label")}</legend>
      <div className="flex flex-wrap gap-3">
        {setupPresets.map((preset) => {
          const weekly = getWeeklyTotal(expandSetupLineIds(preset));
          return (
            <div key={preset.id} className="flex flex-col items-start gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset.id as SetupPresetId)}
              >
                {t(`${preset.id}.name`)}
              </Button>
              <p className="text-muted-foreground px-0.5 text-xs tabular-nums">
                {t("weekly", { amount: formatMoney(weekly, locale) })}
              </p>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
