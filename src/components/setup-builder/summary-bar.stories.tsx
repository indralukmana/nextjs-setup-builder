import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SummaryBar } from "./summary-bar";

const meta = {
  title: "SetupBuilder/SummaryBar",
  component: SummaryBar,
} satisfies Meta<typeof SummaryBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
