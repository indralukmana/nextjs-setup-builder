import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RentalSuccess } from "./rental-success";

const meta = {
  title: "Checkout/RentalSuccess",
  component: RentalSuccess,
  args: {
    title: "Rental request sent",
    body: "We'll confirm delivery for your 4-week setup ($128).",
    requestId: "rq_demo123",
    requestIdLabel: "Request ID: rq_demo123",
    copyRequestIdLabel: "Copy request ID",
    copyRequestIdCopiedLabel: "ID copied",
    backHomeLabel: "Back home",
    editSetupLabel: "Edit setup",
  },
} satisfies Meta<typeof RentalSuccess>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
