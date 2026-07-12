import { defineConfig, devices } from "@playwright/test";

const isCi = !!process.env.CI;
/** Mobile sheet flows are flaky on GH CI; keep them on main pushes (and local). */
const runMobileChrome =
  !isCi || process.env.GITHUB_REF === "refs/heads/main" || process.env.E2E_MOBILE === "1";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCi,
  retries: isCi ? 2 : 0,
  workers: isCi ? 1 : 8,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  reporter: isCi ? [["blob"], ["github"]] : [["list"], ["html"]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15_000,
    reducedMotion: "reduce",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    ...(runMobileChrome
      ? [
          {
            name: "mobile-chrome",
            use: { ...devices["Pixel 7"] },
          },
        ]
      : []),
  ],
  webServer: {
    // CI jobs build once and reuse the `.next` artifact; local uses the dev server.
    command: isCi ? "pnpm start" : "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !isCi,
    timeout: 180_000,
  },
});
