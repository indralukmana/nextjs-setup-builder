"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

export function ResetSetupButton() {
  const t = useTranslations("SetupBuilder");
  const reset = useSetupBuilderStore((state) => state.reset);

  return (
    <Button type="button" variant="ghost" size="sm" onClick={() => reset()}>
      {t("resetSetup")}
    </Button>
  );
}
