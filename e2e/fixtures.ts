import { expect, test as base } from "@playwright/test";

/**
 * Marks the document for e2e CSS (no animations / inert 3D canvas) and prefers
 * reduced motion so dialogs/sheets don't stall actionability on CI.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      document.documentElement.dataset.e2e = "true";
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await use(page);
  },
});

export { expect };
