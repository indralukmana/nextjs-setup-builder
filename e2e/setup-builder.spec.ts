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

test("accessories update preview and enforce monitor limit", async ({ page }) => {
  await page.goto("/en/setup-builder");

  await page.getByRole("tab", { name: /accessories/i }).click();
  await page.getByRole("button", { name: /select 24" full hd monitor/i }).click();
  await page.getByRole("button", { name: /select 27" 4k monitor/i }).click();

  await expect(page.getByRole("region", { name: /workspace preview/i })).toContainText(
    /24" full hd monitor/i,
  );
  await expect(page.getByText(/maximum 2 monitors/i)).toBeVisible();

  const thirdMonitor = page.getByRole("button", { name: /34" ultrawide monitor/i });
  await expect(thirdMonitor).toBeDisabled();
});
