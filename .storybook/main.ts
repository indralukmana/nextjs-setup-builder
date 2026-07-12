import type { StorybookConfig } from "@storybook/nextjs-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/nextjs-vite",
  // Do not point at all of ../public — building into public/storybook would recurse.
  // Stories that need static files can add targeted dirs later.
  staticDirs: [{ from: "../public/models", to: "/models" }],
  async viteFinal(viteConfig, { configType }) {
    // Production build is served from the Next app at /storybook/.
    if (configType !== "PRODUCTION") {
      return viteConfig;
    }
    return mergeConfig(viteConfig, { base: "/storybook/" });
  },
};
export default config;
