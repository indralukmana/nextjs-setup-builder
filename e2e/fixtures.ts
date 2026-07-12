import { expect, test as base } from "@playwright/test";

/**
 * Marks the document for e2e CSS (no animations / inert 3D canvas) and prefers
 * reduced motion so dialogs/sheets don't stall actionability on CI.
 *
 * Next.js hydrates `<html>` from the React tree and wipes attributes set in
 * addInitScript — set `window.__MONIS_E2E__` for JS detection and keep
 * re-applying `data-e2e` briefly so e2e CSS still matches.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      const w = window as Window & { __MONIS_E2E__?: boolean };
      w.__MONIS_E2E__ = true;

      const apply = () => {
        document.documentElement.dataset.e2e = "true";
      };
      apply();

      const interval = window.setInterval(apply, 100);
      window.setTimeout(() => window.clearInterval(interval), 5_000);
      document.addEventListener("DOMContentLoaded", apply);
      window.addEventListener("load", apply);
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await use(page);
  },
});

export { expect };
