import { expect, test } from "@playwright/test";

test("setup builder shows catalog and updates summary", async ({ page }) => {
  await page.goto("/en/setup-builder");

  await expect(page.getByRole("heading", { name: /setup builder/i })).toBeVisible();
  await expect(page.getByRole("tab", { name: /desks/i })).toBeVisible();
  await expect(page.getByRole("tab", { name: /chairs/i })).toBeVisible();
  await expect(page.getByRole("tab", { name: /accessories/i })).toBeVisible();

  await page.getByRole("button", { name: /select mechanical adjustable desk/i }).click();

  await expect(page.getByText(/\/week/i).first()).toBeVisible();
  await expect(page.getByRole("region", { name: /workspace preview/i })).toContainText(
    /mechanical adjustable desk/i,
  );
});
