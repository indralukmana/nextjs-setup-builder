/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      url: [
        "http://127.0.0.1:3000/en",
        "http://127.0.0.1:3000/en/setup-builder",
        "http://127.0.0.1:3000/en/checkout",
      ],
      startServerCommand: "pnpm start",
      startServerReadyPattern: "Ready",
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
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
