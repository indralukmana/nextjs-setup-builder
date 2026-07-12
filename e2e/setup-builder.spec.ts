import { expect, test } from "@playwright/test";

test("setup builder shows catalog and updates summary", async ({ page }) => {
  await page.goto("/en/setup-builder");

  await expect(page.getByRole("heading", { name: /setup builder/i })).toBeVisible();
  await expect(page.getByRole("tab", { name: /desks/i })).toBeVisible();
  await expect(page.getByRole("tab", { name: /chairs/i })).toBeVisible();
  await expect(page.getByRole("tab", { name: /monitors/i })).toBeVisible();
  await expect(page.getByRole("tab", { name: /accessories/i })).toBeVisible();

  await page.getByRole("button", { name: /select mittzon desk/i }).click();

  await expect(page.getByText(/\/week/i).first()).toBeVisible();
  await expect(page.getByRole("region", { name: /workspace preview/i })).toContainText(
    /mittzon desk/i,
  );
});

test("monitors tab can set monitor count", async ({ page }) => {
  await page.goto("/en/setup-builder");

  await page.getByRole("tab", { name: /monitors/i }).click();
  await page.getByRole("button", { name: /^3$/, exact: true }).click();

  await expect(page.getByRole("region", { name: /workspace preview/i })).toContainText(
    /gaming monitor/i,
  );
  await expect(page).toHaveURL(/monitors=3/);
});

test("keyboard can select a desk and reach checkout CTA", async ({ page }) => {
  await page.goto("/en/setup-builder");

  await page.getByRole("tab", { name: /desks/i }).focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");

  await expect(page.getByRole("region", { name: /workspace preview/i })).toContainText(
    /bollsidan|mittzon|utespelare/i,
  );
  await expect(page).toHaveURL(/desk=/);

  const review = page.getByRole("link", { name: /review rental/i });
  await review.focus();
  await expect(review).toBeFocused();
  await review.press("Enter");
  await expect(page).toHaveURL(/\/en\/checkout/);
});

test("builder duration updates URL and reset restores default desk", async ({ page }) => {
  await page.goto(
    "/en/setup-builder?desk=desk-mittzon&chair=chair-gronfjall&accessories=&monitors=1&weeks=4",
  );

  await expect(page.getByRole("region", { name: /workspace preview/i })).toContainText(
    /mittzon desk/i,
  );

  await page.getByRole("button", { name: /^12 wk$/i }).click();
  await expect(page).toHaveURL(/weeks=12/);

  await page.getByText(/^more$/i).click();
  await page.getByRole("button", { name: /restore defaults/i }).click();
  await expect(page.getByRole("region", { name: /workspace preview/i })).toContainText(
    /bollsidan sit\/stand desk/i,
  );
  await expect(page).toHaveURL(/desk=desk-bollsidan/);
});

test("presets show weekly totals and copy link still works", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/en/setup-builder");
  await expect(page).toHaveURL(/desk=/);

  await expect(page.getByText(/\$\d+(\/week|\/wk)/i).first()).toBeVisible();

  const shareOrCopy = page.getByRole("button", { name: /copy setup link|share setup/i });
  await shareOrCopy.click();
  await expect(page.getByRole("button", { name: /^(copied|shared)$/i })).toBeVisible();
});

test("Indonesian locale shows IDR prices and copy link feedback", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/id/setup-builder");

  await expect(page.getByText(/Rp/).first()).toBeVisible();

  const copy = page.getByRole("button", { name: /salin tautan setup|bagikan setup/i });
  await expect(page).toHaveURL(/desk=/);
  await copy.click();
  await expect(page.getByRole("button", { name: /^(disalin|dibagikan)$/i })).toBeVisible();
});

test("German locale loads setup builder with German copy", async ({ page }) => {
  await page.goto("/de/setup-builder");

  await expect(page.getByRole("heading", { name: /setup builder/i })).toBeVisible();
  await expect(page.getByText(/\$/).first()).toBeVisible();
  await expect(
    page.getByRole("button", { name: /setup-link kopieren|setup teilen/i }),
  ).toBeVisible();
});

test("saved setups can restore a desk after reset", async ({ page }) => {
  await page.goto("/en/setup-builder");
  await page.getByLabel(/quick presets/i).selectOption("essentials");
  await expect(page.getByRole("region", { name: /workspace preview/i })).toContainText(
    /bollsidan sit\/stand desk/i,
  );

  await page.getByText(/^saved setups/i).click();
  await page.getByLabel(/setup name/i).fill("My essentials");
  await page.getByRole("button", { name: /save current/i }).click();
  await expect(page.getByText("My essentials")).toBeVisible();

  await page.getByLabel(/quick presets/i).selectOption("focus");
  await expect(page.getByRole("region", { name: /workspace preview/i })).toContainText(
    /mittzon desk/i,
  );

  await page.getByRole("button", { name: /^load$/i }).click();
  await expect(page.getByRole("region", { name: /workspace preview/i })).toContainText(
    /bollsidan sit\/stand desk/i,
  );
});

test("shareable URL hydrates setup and essentials preset applies", async ({ page }) => {
  await page.goto(
    "/en/setup-builder?desk=desk-mittzon&chair=chair-gronfjall&accessories=lamp-svallet&monitors=2&weeks=12",
  );

  const preview = page.getByRole("region", { name: /workspace preview/i });
  await expect(preview).toContainText(/mittzon desk/i);
  await expect(preview).toContainText(/grönfjäll office chair/i);
  await expect(preview).toContainText(/gaming monitor/i);
  await expect(preview).toContainText(/svallet work lamp/i);
  await expect(page.getByText(/12 weeks/i)).toBeVisible();

  await page.getByLabel(/quick presets/i).selectOption("essentials");

  await expect(preview).toContainText(/bollsidan sit\/stand desk/i);
  await expect(preview).toContainText(/alefjäll office chair/i);
  await expect(preview).toContainText(/nymåne work lamp/i);
  await expect(page).toHaveURL(/desk=desk-bollsidan/);
  await expect(page).toHaveURL(/chair=chair-alefjall/);
  await expect(page).toHaveURL(/monitors=1/);
});
