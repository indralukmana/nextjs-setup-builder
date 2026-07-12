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

test("keyboard can select a desk and reach checkout CTA", async ({ page }) => {
  await page.goto("/en/setup-builder");

  await page.getByRole("tab", { name: /desks/i }).focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");

  await expect(page.getByRole("region", { name: /workspace preview/i })).toContainText(
    /electrical adjustable desk|mechanical adjustable desk/i,
  );
  await expect(page).toHaveURL(/desk=/);

  const review = page.getByRole("link", { name: /review rental/i });
  await review.focus();
  await expect(review).toBeFocused();
  await review.press("Enter");
  await expect(page).toHaveURL(/\/en\/checkout/);
});

test("Indonesian locale shows IDR prices and copy link feedback", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/id/setup-builder");

  await expect(page.getByText(/Rp/).first()).toBeVisible();

  const copy = page.getByRole("button", { name: /salin tautan setup/i });
  await expect(page).toHaveURL(/desk=/);
  await copy.click();
  await expect(page.getByRole("button", { name: /^disalin$/i })).toBeVisible();
});

test("shareable URL hydrates setup and essentials preset applies", async ({ page }) => {
  await page.goto(
    "/en/setup-builder?desk=desk-mechanical&chair=chair-task&accessories=monitor-24,lamp-led&weeks=12",
  );

  const preview = page.getByRole("region", { name: /workspace preview/i });
  await expect(preview).toContainText(/mechanical adjustable desk/i);
  await expect(preview).toContainText(/compact task chair/i);
  await expect(preview).toContainText(/24" full hd monitor/i);
  await expect(preview).toContainText(/smart led desk lamp/i);
  await expect(page.getByText(/12 weeks/i)).toBeVisible();

  await page.getByRole("button", { name: /^essentials$/i }).click();

  await expect(preview).toContainText(/electrical adjustable desk/i);
  await expect(preview).toContainText(/ergonomic office chair/i);
  await expect(preview).toContainText(/keyboard & mouse kit/i);
  await expect(page).toHaveURL(/desk=desk-electric/);
  await expect(page).toHaveURL(/chair=chair-ergonomic/);
});
