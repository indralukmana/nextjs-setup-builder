import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RentalSuccess } from "./rental-success";

const meta = {
  title: "Checkout/RentalSuccess",
  component: RentalSuccess,
  args: {
    title: "Rental request sent",
    body: "We'll confirm delivery for your 4-week setup ($128).",
    backHomeLabel: "Back home",
    editSetupLabel: "Edit setup",
  },
} satisfies Meta<typeof RentalSuccess>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
