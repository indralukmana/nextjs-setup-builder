import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CatalogPanel } from "./catalog-panel";

const meta = {
  title: "SetupBuilder/CatalogPanel",
  component: CatalogPanel,
} satisfies Meta<typeof CatalogPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
