"use client";

import { useTranslations } from "next-intl";

import { SetupScenePreview } from "@/components/setup-scene/setup-scene-preview";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function SetupSceneShell() {
  const t = useTranslations("SetupScene");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="max-w-2xl">
          <h1 className="font-heading text-2xl tracking-tight sm:text-3xl md:text-4xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">{t("subtitle")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/setup-builder" className={cn(buttonVariants({ variant: "outline" }))}>
            {t("editSetup")}
          </Link>
          <Link href="/checkout" className={cn(buttonVariants())}>
            {t("continueCheckout")}
          </Link>
        </div>
      </div>

      <SetupScenePreview
        canvasClassName="h-[min(72vh,38rem)] min-h-[22rem] sm:min-h-[28rem]"
        showEmptyHint
      />

      <p className="text-muted-foreground text-sm">{t("disclaimer")}</p>
      <p className="text-muted-foreground text-xs sm:text-sm">{t("controlsHint")}</p>
    </div>
  );
}
