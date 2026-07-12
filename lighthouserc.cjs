/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      // Skip /setup-builder: live R3F/WebGL routinely PROTOCOL_TIMEOUTs in
      // headless CI (software GL). Builder a11y is gated via Storybook axe.
      url: ["http://127.0.0.1:3000/en", "http://127.0.0.1:3000/en/checkout"],
      startServerCommand: "pnpm start",
      startServerReadyPattern: "Ready",
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
        chromeFlags: "--no-sandbox --disable-dev-shm-usage",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.7 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.85 }],
        "categories:seo": ["warn", { minScore: 0.85 }],
      },
    },
    upload: {
      // Keep reports local; CI uploads `.lighthouseci/` as an artifact.
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
