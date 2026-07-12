import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RentalForm } from "./rental-form";
import { RentalRequestPanel } from "./rental-request-panel";

const meta = {
  title: "Checkout/RentalForm",
  component: RentalForm,
  args: {
    onSuccess: () => undefined,
  },
} satisfies Meta<typeof RentalForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Full checkout form shell (StoreReady + empty-or-panel). */
export const Default: Story = {};

/** Editing/submit panel (assumes hydrated store defaults). */
export const RequestPanel: StoryObj<typeof RentalRequestPanel> = {
  args: {
    onSuccess: () => undefined,
  },
  render: (args) => <RentalRequestPanel {...args} />,
};
