import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CatalogRailActions } from "./catalog-rail-actions";

const meta = {
  title: "SetupBuilder/CatalogRailActions",
  component: CatalogRailActions,
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CatalogRailActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
