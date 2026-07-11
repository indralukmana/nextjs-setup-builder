import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SetupSummary } from "./setup-summary";

const meta = {
  title: "Checkout/SetupSummary",
  component: SetupSummary,
} satisfies Meta<typeof SetupSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
