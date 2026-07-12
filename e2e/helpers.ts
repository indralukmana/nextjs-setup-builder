import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

function presetCombobox(page: Page) {
  return page.locator("#setup-preset");
}

/** Mobile hides the catalog rail behind a sheet; open it when needed. */
export async function openCatalogIfNeeded(page: Page) {
  if (await presetCombobox(page).isVisible()) {
    return;
  }
  const openButton = page.getByRole("button", { name: /^(catalog|katalog)$/i });
  await expect(openButton).toBeVisible({ timeout: 15_000 });
  await openButton.click();
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 15_000 });
  await expect(presetCombobox(page)).toBeVisible({ timeout: 15_000 });
}

/** Close the mobile catalog sheet so the summary bar is interactable again. */
export async function closeCatalogIfNeeded(page: Page) {
  const dialog = page.getByRole("dialog");
  if (!(await dialog.isVisible())) {
    return;
  }
  await dialog
    .locator("div.border-b")
    .getByRole("button", { name: /^(close|tutup|schließen)$/i })
    .click();
  await expect(dialog).toHaveCount(0);
}

/** Wait until URL sync has written the hydrated setup. */
export async function waitForSetupUrl(page: Page) {
  await expect(page).toHaveURL(/desk=/, { timeout: 15_000 });
  await expect(page.locator("html")).toHaveAttribute("data-setup-url-synced", "true", {
    timeout: 15_000,
  });
}

async function chooseSelectOption(
  page: Page,
  trigger: ReturnType<Page["getByRole"]>,
  optionName: RegExp,
) {
  await expect(trigger).toBeVisible();
  await trigger.click();
  const option = page.getByRole("option", { name: optionName });
  await expect(option).toBeVisible();
  await option.click();
}

export async function selectPreset(page: Page, presetName: RegExp) {
  await openCatalogIfNeeded(page);
  await chooseSelectOption(page, presetCombobox(page), presetName);
}

export async function selectCurrency(page: Page, code: RegExp) {
  const trigger = page.getByRole("combobox", { name: /currency|währung|mata uang/i });
  await chooseSelectOption(page, trigger, code);
  await expect(trigger).toContainText(code);
}

export function previewListitem(page: Page, name: RegExp) {
  return page
    .getByRole("region", { name: /workspace preview/i })
    .getByRole("listitem")
    .filter({ hasText: name });
}

export async function goToCheckout(page: Page) {
  await closeCatalogIfNeeded(page);
  const review = page.getByRole("link", { name: /review rental/i });
  await expect(review).toBeVisible();
  await review.click();
  await expect(page).toHaveURL(/\/(?:en|id|de)\/checkout/, { timeout: 20_000 });
}
