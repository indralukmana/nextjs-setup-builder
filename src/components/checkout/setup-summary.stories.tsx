import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SetupSummary } from "./setup-summary";

const meta = {
  title: "Checkout/SetupSummary",
  component: SetupSummary,
  args: {
    heading: "Your setup",
    editLabel: "Edit setup",
    weeklyLabel: "Weekly",
  },
} satisfies Meta<typeof SetupSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
