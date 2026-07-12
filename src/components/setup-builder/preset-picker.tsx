"use client";

import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { setupPresets, type SetupPresetId } from "@/data/presets";
import { formatMoney, getWeeklyTotal } from "@/lib/pricing";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

export function PresetPicker() {
  const t = useTranslations("SetupBuilder.presets");
  const locale = useLocale();
  const applyPreset = useSetupBuilderStore((state) => state.applyPreset);

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium">{t("label")}</legend>
      <div className="flex flex-wrap gap-3">
        {setupPresets.map((preset) => {
          const weekly = getWeeklyTotal([preset.deskId, preset.chairId, ...preset.accessoryIds]);
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
