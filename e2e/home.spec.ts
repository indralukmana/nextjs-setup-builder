import { expect, test } from "@playwright/test";

test("home loads and navigates to setup builder", async ({ page }) => {
  await page.goto("/en");

  await expect(page.getByRole("heading", { name: /build your bali workspace/i })).toBeVisible();

  await page.getByRole("link", { name: /start building/i }).click();
  await expect(page).toHaveURL(/\/en\/setup-builder/);
});
