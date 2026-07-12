import { expect, test } from "@playwright/test";

test("checkout shows summary and rental form", async ({ page }) => {
  await page.goto("/en/setup-builder");
  await page.getByRole("link", { name: /review rental/i }).click();
  await expect(page).toHaveURL(/\/en\/checkout/);

  await expect(page.getByRole("heading", { name: /checkout/i })).toBeVisible();
  await expect(page.getByRole("region", { name: /setup summary/i })).toBeVisible();
  await expect(page.getByText(/rental duration/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /request rental/i })).toBeVisible();
});

test("checkout submits rental request", async ({ page }) => {
  await page.goto("/en/checkout");

  await expect(page.getByRole("region", { name: /setup summary/i })).toBeVisible();
  await page.getByRole("button", { name: /request rental/i }).click();

  await expect(page.getByText(/rental request sent/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /back home/i })).toBeVisible();
});
