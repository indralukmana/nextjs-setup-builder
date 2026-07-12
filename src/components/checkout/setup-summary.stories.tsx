import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SetupSummary } from "./setup-summary";

const meta = {
  title: "Checkout/SetupSummary",
  component: SetupSummary,
  args: {
    heading: "Your setup",
    editLabel: "Edit setup",
    weeklyLabel: "Weekly",
    emptyLabel: "No products in this setup yet.",
    deliveryTitle: "Bali delivery",
    deliveryBody:
      "monis delivers, sets up, and picks up across Bali. After you request a rental we'll confirm timing for your workspace.",
  },
} satisfies Meta<typeof SetupSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
