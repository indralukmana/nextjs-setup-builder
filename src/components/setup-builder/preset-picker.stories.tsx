import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PresetPicker } from "./preset-picker";

const meta = {
  title: "SetupBuilder/PresetPicker",
  component: PresetPicker,
} satisfies Meta<typeof PresetPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Rail: Story = {
  args: {
    variant: "rail",
  },
};
