import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RentalRequestPanel } from "./rental-request-panel";

const meta = {
  title: "Checkout/RentalRequestPanel",
  component: RentalRequestPanel,
  args: {
    onSuccess: () => undefined,
  },
} satisfies Meta<typeof RentalRequestPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
