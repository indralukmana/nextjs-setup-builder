"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

type Props = {
  className?: string;
  onDone?: () => void;
};

export function ResetSetupButton({ className, onDone }: Props) {
  const t = useTranslations("SetupBuilder");
  const reset = useSetupBuilderStore((state) => state.reset);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={className}
      onClick={() => {
        reset();
        onDone?.();
      }}
    >
      {t("resetSetup")}
    </Button>
  );
}
