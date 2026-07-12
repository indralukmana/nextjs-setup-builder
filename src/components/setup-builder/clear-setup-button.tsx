"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

type Props = {
  className?: string;
  onDone?: () => void;
};

export function ClearSetupButton({ className, onDone }: Props) {
  const t = useTranslations("SetupBuilder");
  const clearSetup = useSetupBuilderStore((state) => state.clearSetup);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={className}
      onClick={() => {
        if (window.confirm(t("clearSetupConfirm"))) {
          clearSetup();
          onDone?.();
        }
      }}
    >
      {t("clearSetup")}
    </Button>
  );
}
