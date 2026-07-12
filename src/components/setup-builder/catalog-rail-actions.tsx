"use client";

import { CopySetupLink } from "@/components/setup-builder/copy-setup-link";

/** Compact share action for the catalog rail. */
export function CatalogRailActions() {
  return (
    <div className="flex items-center gap-2">
      <CopySetupLink className="min-w-0 flex-1" />
    </div>
  );
}
