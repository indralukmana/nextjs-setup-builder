import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RentalForm } from "./rental-form";

const meta = {
  title: "Checkout/RentalForm",
  component: RentalForm,
} satisfies Meta<typeof RentalForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
