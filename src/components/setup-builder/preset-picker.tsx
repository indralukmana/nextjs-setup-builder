"use client";

import { useTranslations } from "next-intl";

import { LabelWithHint } from "@/components/setup-builder/label-with-hint";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setupPresets, type SetupPresetId } from "@/data/presets";
import { useFormatMoney } from "@/hooks/use-format-money";
import { getWeeklyTotal } from "@/lib/pricing";
import { expandSetupLineIds, useSetupBuilderStore } from "@/store/setup-builder-store";

type Props = {
  /** Compact select for the catalog rail. */
  variant?: "default" | "rail";
};

export function PresetPicker({ variant = "default" }: Props) {
  const t = useTranslations("SetupBuilder.presets");
  const tSetup = useTranslations("SetupBuilder");
  const formatMoney = useFormatMoney();
  const applyPreset = useSetupBuilderStore((state) => state.applyPreset);
  const reset = useSetupBuilderStore((state) => state.reset);
  const selectedPresetId = useSetupBuilderStore((state) => state.selectedPresetId);
  const isRail = variant === "rail";

  const presetItems = setupPresets.map((preset) => {
    const weekly = getWeeklyTotal(expandSetupLineIds(preset));
    return {
      id: preset.id as SetupPresetId,
      label: `${t(`${preset.id}.name`)} · ${t("weekly", { amount: formatMoney(weekly) })}`,
      name: t(`${preset.id}.name`),
      weekly,
    };
  });

  if (isRail) {
    const items = presetItems.map((item) => ({ label: item.label, value: item.id }));
    const presetName = t(`${selectedPresetId}.name`);

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <LabelWithHint
            htmlFor="setup-preset"
            label={t("label")}
            hint={t("hint")}
            hintLabel={t("hintLabel")}
          />
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground h-7 shrink-0 px-2"
                />
              }
            >
              {tSetup("resetSetup")}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{tSetup("resetSetupConfirmTitle")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {tSetup("resetSetupConfirm", { preset: presetName })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tSetup("cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => {
                    reset();
                  }}
                >
                  {tSetup("resetSetup")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Select
          items={items}
          value={selectedPresetId}
          onValueChange={(value) => {
            if (!value) return;
            applyPreset(value as SetupPresetId);
          }}
        >
          <SelectTrigger id="setup-preset" className="bg-background w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} align="start">
            {presetItems.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium">{t("label")}</legend>
      <div className="flex flex-wrap gap-3">
        {presetItems.map((item) => (
          <div key={item.id} className="flex flex-col items-start gap-1">
            <Button type="button" variant="outline" size="sm" onClick={() => applyPreset(item.id)}>
              {item.name}
            </Button>
            <p className="text-muted-foreground px-0.5 text-xs tabular-nums">
              {t("weekly", { amount: formatMoney(item.weekly) })}
            </p>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
