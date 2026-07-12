import { expect, test } from "@playwright/test";

import {
  closeCatalogIfNeeded,
  goToCheckout,
  openCatalogIfNeeded,
  previewListitem,
  selectCurrency,
  selectPreset,
  waitForSetupUrl,
} from "./helpers";

test("setup builder shows catalog and updates summary", async ({ page }) => {
  await page.goto("/en/setup-builder");
  await waitForSetupUrl(page);
  await openCatalogIfNeeded(page);

  await expect(page.getByRole("heading", { name: /setup builder/i })).toBeAttached();
  await expect(page.getByRole("tab", { name: /desks/i })).toBeVisible();
  await expect(page.getByRole("tab", { name: /chairs/i })).toBeVisible();
  await expect(page.getByRole("tab", { name: /accessories/i })).toBeVisible();
  await expect(page.getByRole("tab", { name: /drawers/i })).toBeVisible();
  await expect(
    page
      .getByRole("group", { name: /monitors/i })
      .getByRole("button", { name: /^3$/, exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: /select mittzon/i }).click();
  await closeCatalogIfNeeded(page);

  await expect(page.getByText(/\/week/i).first()).toBeVisible();
  await expect(previewListitem(page, /mittzon/i)).toBeVisible();
});

test("monitors control can set monitor count", async ({ page }) => {
  await page.goto("/en/setup-builder");
  await waitForSetupUrl(page);
  await openCatalogIfNeeded(page);

  await page
    .getByRole("group", { name: /monitors/i })
    .getByRole("button", { name: /^3$/, exact: true })
    .click();

  await closeCatalogIfNeeded(page);
  await expect(previewListitem(page, /gaming monitor/i)).toBeVisible();
  await expect(page).toHaveURL(/monitors=3/, { timeout: 10_000 });
});

test("keyboard can select a desk and reach checkout CTA", async ({ page }) => {
  await page.goto("/en/setup-builder");
  await waitForSetupUrl(page);
  await openCatalogIfNeeded(page);

  await page.getByRole("tab", { name: /desks/i }).focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");

  await expect(previewListitem(page, /bollsidan|mittzon|utespelare/i)).toBeVisible();
  await expect(page).toHaveURL(/desk=/);

  await closeCatalogIfNeeded(page);
  const review = page.getByRole("link", { name: /review rental/i });
  await review.focus();
  await expect(review).toBeFocused();
  await goToCheckout(page);
});

test("builder duration updates URL and reset restores default desk", async ({ page }) => {
  await page.goto(
    "/en/setup-builder?desk=desk-mittzon&chair=chair-gronfjall&accessories=&monitors=1&weeks=4",
  );
  await expect(previewListitem(page, /mittzon/i)).toBeVisible({ timeout: 15_000 });

  await page.getByRole("button", { name: /^12 wk$/i }).click();
  await expect(page).toHaveURL(/weeks=12/, { timeout: 10_000 });

  await openCatalogIfNeeded(page);
  await page.getByRole("button", { name: /^reset$/i }).click();
  await expect(page.getByRole("alertdialog")).toBeVisible();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: /^reset$/i })
    .evaluate((el) => (el as HTMLElement).click());
  await expect(page.getByRole("alertdialog")).toHaveCount(0);
  await closeCatalogIfNeeded(page);
  await expect(previewListitem(page, /bollsidan/i)).toBeVisible({ timeout: 10_000 });
  await expect(page).toHaveURL(/desk=desk-bollsidan/, { timeout: 10_000 });
});
test("presets show weekly totals and copy link still works", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/en/setup-builder");
  await waitForSetupUrl(page);
  await openCatalogIfNeeded(page);

  await expect(page.getByText(/\$\d+(\/week|\/wk)/i).first()).toBeVisible();

  const shareOrCopy = page.getByRole("button", { name: /copy setup link|share setup/i });
  await shareOrCopy.click();
  await expect(page.getByRole("button", { name: /^(copied|shared)$/i })).toBeVisible();
});

test("Indonesian locale shows IDR prices and copy link feedback", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/id/setup-builder");
  await page.evaluate(() => localStorage.removeItem("monis-currency"));
  await page.reload();
  await waitForSetupUrl(page);
  await openCatalogIfNeeded(page);

  await expect(page.getByRole("combobox", { name: /currency|mata uang/i })).toContainText(/idr/i);
  await expect(page.getByText(/Rp/).first()).toBeVisible();

  const copy = page.getByRole("button", { name: /salin tautan setup|bagikan setup/i });
  await copy.click();
  await expect(page.getByRole("button", { name: /^(disalin|dibagikan)$/i })).toBeVisible();
});

test("German locale loads setup builder with German copy", async ({ page }) => {
  await page.goto("/de/setup-builder");
  await page.evaluate(() => localStorage.removeItem("monis-currency"));
  await page.reload();
  await waitForSetupUrl(page);

  await expect(page.getByRole("heading", { name: /setup builder/i })).toBeAttached();
  await expect(page.getByRole("combobox", { name: /währung|currency/i })).toBeVisible();
  await expect(page.getByRole("combobox", { name: /währung|currency/i })).toContainText(/eur/i);
  await openCatalogIfNeeded(page);
  await expect(
    page.getByRole("button", { name: /setup-link kopieren|setup teilen/i }),
  ).toBeVisible();
});

test("currency switcher updates displayed prices", async ({ page }) => {
  await page.goto("/en/setup-builder");
  await page.evaluate(() => localStorage.removeItem("monis-currency"));
  await page.reload();
  await waitForSetupUrl(page);

  await selectCurrency(page, /usd/i);
  await expect(page.getByText(/\$/).first()).toBeVisible();

  await selectCurrency(page, /idr/i);
  // en locale formats IDR as "IDR …"; id locale uses "Rp…"
  await expect(page.getByText(/IDR|\bRp\b/).first()).toBeVisible();
});

test("saved setups can restore a desk after reset", async ({ page }) => {
  await page.goto("/en/setup-builder");
  await waitForSetupUrl(page);

  await selectPreset(page, /essentials/i);
  await closeCatalogIfNeeded(page);
  await expect(previewListitem(page, /bollsidan/i)).toBeVisible();

  await openCatalogIfNeeded(page);
  const savedDetails = page.locator("details").filter({ has: page.getByText(/^saved setups/i) });
  await savedDetails.locator("summary").click();
  await expect(savedDetails).toHaveAttribute("open", "");
  await savedDetails.locator("#saved-setup-name").fill("My essentials");
  await savedDetails.getByRole("button", { name: /save current/i }).click();
  await expect(savedDetails.getByText("My essentials")).toBeVisible();

  // Switch away via URL hydration instead of a second Select interaction.
  await page.goto(
    "/en/setup-builder?desk=desk-mittzon&chair=chair-gronfjall&accessories=&monitors=1&weeks=4",
  );
  await expect(previewListitem(page, /mittzon/i)).toBeVisible({ timeout: 15_000 });

  await openCatalogIfNeeded(page);
  await savedDetails.locator("summary").click();
  await expect(savedDetails).toHaveAttribute("open", "");
  await savedDetails.getByRole("button", { name: /^load$/i }).click();
  await closeCatalogIfNeeded(page);
  await expect(previewListitem(page, /bollsidan/i)).toBeVisible({ timeout: 10_000 });
});

test("shareable URL hydrates setup and essentials preset applies", async ({ page }) => {
  await page.goto(
    "/en/setup-builder?desk=desk-mittzon&chair=chair-gronfjall&accessories=lamp-svallet&monitors=2&weeks=12",
  );

  await expect(previewListitem(page, /mittzon/i)).toBeVisible({ timeout: 15_000 });
  await expect(previewListitem(page, /grönfjäll office chair/i)).toBeVisible();
  await expect(previewListitem(page, /gaming monitor/i)).toBeVisible();
  await expect(previewListitem(page, /svallet/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /^12 wk$/i })).toHaveAttribute(
    "aria-pressed",
    "true",
  );

  await selectPreset(page, /essentials/i);
  await closeCatalogIfNeeded(page);

  await expect(previewListitem(page, /bollsidan/i)).toBeVisible({ timeout: 10_000 });
  await expect(previewListitem(page, /alefjäll/i)).toBeVisible();
  await expect(previewListitem(page, /nymåne/i)).toBeVisible();
  await expect(page).toHaveURL(/desk=desk-bollsidan/, { timeout: 10_000 });
  await expect(page).toHaveURL(/chair=chair-alefjall/);
  await expect(page).toHaveURL(/monitors=1/);
});
