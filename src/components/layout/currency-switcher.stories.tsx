import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CurrencySwitcher } from "./currency-switcher";

const meta = {
  title: "Layout/CurrencySwitcher",
  component: CurrencySwitcher,
} satisfies Meta<typeof CurrencySwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
