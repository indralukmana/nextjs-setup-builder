import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { RentalDurationPicker } from "./rental-duration-picker";

const meta = {
  title: "Checkout/RentalDurationPicker",
  component: RentalDurationPicker,
  args: {
    label: "Rental duration",
    value: 4,
    formatOption: (weeks: number) => `${weeks} weeks`,
    onChange: () => undefined,
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <RentalDurationPicker {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof RentalDurationPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    compact: true,
    formatOption: (weeks: number) => `${weeks} wk`,
  },
};

export const Inline: Story = {
  args: {
    inline: true,
    formatOption: (weeks: number) => `${weeks} wk`,
  },
};
