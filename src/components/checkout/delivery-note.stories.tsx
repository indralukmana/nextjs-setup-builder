import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DeliveryNote } from "./delivery-note";

const meta = {
  title: "Checkout/DeliveryNote",
  component: DeliveryNote,
  args: {
    title: "Bali delivery",
    body: "monis delivers, sets up, and picks up across Bali. After you request a rental we'll confirm timing for your workspace.",
  },
} satisfies Meta<typeof DeliveryNote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
