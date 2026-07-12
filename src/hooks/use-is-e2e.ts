"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __MONIS_E2E__?: boolean;
  }
}

/**
 * Detect Playwright e2e after mount.
 * Starts as `null` so SSR/hydration never mount WebGL; e2e then stubs, live loads the canvas.
 *
 * Prefer `window.__MONIS_E2E__` — Next can wipe `html[data-e2e]` when hydrating `<html>`.
 */
export function useIsE2e(): boolean | null {
  const [isE2e, setIsE2e] = useState<boolean | null>(null);

  useEffect(() => {
    setIsE2e(window.__MONIS_E2E__ === true || document.documentElement.dataset.e2e === "true");
  }, []);

  return isE2e;
}
