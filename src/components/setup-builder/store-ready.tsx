"use client";

import type { ReactNode } from "react";

import { useSetupBuilderHydrated } from "@/hooks/use-setup-builder-hydrated";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Accessible label while waiting for localStorage rehydration. */
  label?: string;
};

export function StoreReady({ children, className, label = "Loading saved setup" }: Props) {
  const hydrated = useSetupBuilderHydrated();

  if (!hydrated) {
    return (
      <div
        className={cn("border-border/70 bg-muted/40 animate-pulse rounded-2xl border", className)}
      >
        <output className="sr-only">{label}</output>
      </div>
    );
  }

  return children;
}
