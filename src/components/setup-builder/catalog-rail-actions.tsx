"use client";

import { useTranslations } from "next-intl";

import { CopySetupLink } from "@/components/setup-builder/copy-setup-link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSetupBuilderStore } from "@/store/setup-builder-store";

/** Compact actions for the catalog rail: copy + overflow for clear/reset. */
export function CatalogRailActions() {
  const t = useTranslations("SetupBuilder");
  const reset = useSetupBuilderStore((state) => state.reset);
  const clearSetup = useSetupBuilderStore((state) => state.clearSetup);

  return (
    <div className="flex items-center gap-2">
      <CopySetupLink className="min-w-0 flex-1" />
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          {t("actionsMenu")}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-44">
          <DropdownMenuItem
            onClick={() => {
              reset();
            }}
          >
            {t("resetSetup")}
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              if (window.confirm(t("clearSetupConfirm"))) {
                clearSetup();
              }
            }}
          >
            {t("clearSetup")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
