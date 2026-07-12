"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

export function ClearSetupButton() {
  const t = useTranslations("SetupBuilder");
  const clearSetup = useSetupBuilderStore((state) => state.clearSetup);

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => {
        if (window.confirm(t("clearSetupConfirm"))) {
          clearSetup();
        }
      }}
    >
      {t("clearSetup")}
    </Button>
  );
}
