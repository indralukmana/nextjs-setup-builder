import { expect, test } from "@playwright/test";

test("checkout shows summary and rental form", async ({ page }) => {
  await page.goto("/en/setup-builder");
  await expect(page).toHaveURL(/desk=/);
  await page.getByRole("link", { name: /review rental/i }).click();
  await expect(page).toHaveURL(/\/en\/checkout/);

  await expect(page.getByRole("heading", { name: /checkout/i })).toBeVisible();
  await expect(page.getByRole("region", { name: /setup summary/i })).toBeVisible();
  await expect(page.getByText(/bali delivery/i)).toBeVisible();
  await expect(page.getByLabel(/full name/i)).toBeVisible();
  await expect(page.getByText(/rental duration/i).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /request rental/i })).toBeVisible();
});

test("checkout validation blocks empty contact fields", async ({ page }) => {
  await page.goto("/en/checkout");

  await page.getByRole("button", { name: /request rental/i }).click();

  await expect(page.getByText(/enter your full name/i)).toBeVisible();
  await expect(page.getByText(/enter a valid email/i)).toBeVisible();
  await expect(page.getByText(/enter a valid phone/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /request rental/i })).toBeDisabled();
  await expect(page.getByText(/rental request sent/i)).toHaveCount(0);
});

test("checkout submits rental request with contact details", async ({ page }) => {
  await page.goto("/en/checkout");

  await expect(page.getByRole("region", { name: /setup summary/i })).toBeVisible();
  await page.getByLabel(/full name/i).fill("Indra");
  await page.getByLabel(/^email$/i).fill("indra@example.com");
  await page.locator("#rental-phone").fill("81234567890");
  await expect(page.locator("#rental-whatsapp")).toBeDisabled();
  await page.getByRole("button", { name: /request rental/i }).click();

  await expect(page.getByText(/rental request sent/i)).toBeVisible();
  await expect(page.getByText(/thanks indra/i)).toBeVisible();
  await expect(page.getByText(/request id:/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /copy confirmation/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /back home/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /^checkout$/i })).toHaveCount(0);
});

test("clear setup shows empty checkout form", async ({ page }) => {
  await page.goto("/en/setup-builder");
  await expect(page).toHaveURL(/desk=/);
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: /clear all/i }).click();
  await page.getByRole("link", { name: /review rental/i }).click();
  await expect(page).toHaveURL(/\/en\/checkout/);
  await expect(
    page.getByText(/add a desk and chair in the setup builder before requesting a rental/i),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /edit setup/i }).first()).toBeVisible();
});
