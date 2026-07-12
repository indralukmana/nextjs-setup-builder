"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { setupPresets, type SetupPresetId } from "@/data/presets";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

export function PresetPicker() {
  const t = useTranslations("SetupBuilder.presets");
  const applyPreset = useSetupBuilderStore((state) => state.applyPreset);

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium">{t("label")}</legend>
      <div className="flex flex-wrap gap-2">
        {setupPresets.map((preset) => (
          <Button
            key={preset.id}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => applyPreset(preset.id as SetupPresetId)}
          >
            {t(`${preset.id}.name`)}
          </Button>
        ))}
      </div>
    </fieldset>
  );
}
