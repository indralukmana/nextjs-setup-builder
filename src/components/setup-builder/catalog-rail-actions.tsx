"use client";

import { ClearSetupButton } from "@/components/setup-builder/clear-setup-button";
import { CopySetupLink } from "@/components/setup-builder/copy-setup-link";

/** Compact share + clear actions for the catalog rail. */
export function CatalogRailActions() {
  return (
    <div className="flex items-center gap-2">
      <CopySetupLink className="min-w-0 flex-1" />
      <ClearSetupButton className="shrink-0" />
    </div>
  );
}
