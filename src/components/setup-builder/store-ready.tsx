"use client";

import { useEffect, useState, type ReactNode } from "react";

import { useSetupBuilderHydrated } from "@/hooks/use-setup-builder-hydrated";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Accessible label while waiting for localStorage rehydration. */
  label?: string;
};

/**
 * Gates children until Zustand persist rehydrates, then fades content in
 * so the default→saved swap isn’t a hard cut.
 */
export function StoreReady({ children, className, label = "Loading saved setup" }: Props) {
  const hydrated = useSetupBuilderHydrated();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!hydrated) {
      setRevealed(false);
      return;
    }
    const id = window.requestAnimationFrame(() => setRevealed(true));
    return () => window.cancelAnimationFrame(id);
  }, [hydrated]);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "bg-muted/40 absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300 ease-out",
          hydrated ? "pointer-events-none opacity-0" : "animate-pulse opacity-100",
        )}
        aria-hidden={hydrated}
      >
        {!hydrated ? <output className="sr-only">{label}</output> : null}
      </div>
      {hydrated ? (
        <div
          className={cn(
            "relative flex size-full min-h-0 flex-col transition-opacity duration-300 ease-out",
            revealed ? "opacity-100" : "opacity-0",
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
