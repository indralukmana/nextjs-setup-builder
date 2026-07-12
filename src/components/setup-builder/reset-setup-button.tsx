"use client";

import { useTranslations } from "next-intl";

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
import { useSetupBuilderStore } from "@/store/setup-builder-store";

type Props = {
  className?: string;
  onDone?: () => void;
};

export function ResetSetupButton({ className, onDone }: Props) {
  const t = useTranslations("SetupBuilder");
  const tPresets = useTranslations("SetupBuilder.presets");
  const reset = useSetupBuilderStore((state) => state.reset);
  const selectedPresetId = useSetupBuilderStore((state) => state.selectedPresetId);
  const presetName = tPresets(`${selectedPresetId}.name`);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button type="button" variant="outline" size="sm" className={className} />}
      >
        {t("resetSetup")}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("resetSetupConfirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("resetSetupConfirm", { preset: presetName })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              reset();
              onDone?.();
            }}
          >
            {t("resetSetup")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
