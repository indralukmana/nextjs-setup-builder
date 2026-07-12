"use client";

import { useEffect, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Fills space below the header inside the app shell. Document scroll is locked
 * by `setup-builder/layout.tsx` (+ cleanup here on leave).
 */
export function BuilderViewport({ children, className }: Props) {
  useEffect(() => {
    return () => {
      document.documentElement.style.height = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={cn("flex min-h-0 w-full flex-1 flex-col overflow-hidden", className)}>
      {children}
    </div>
  );
}
