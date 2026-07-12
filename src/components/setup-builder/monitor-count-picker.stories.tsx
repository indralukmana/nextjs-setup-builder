import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MonitorCountPicker } from "./monitor-count-picker";

const meta = {
  title: "SetupBuilder/MonitorCountPicker",
  component: MonitorCountPicker,
} satisfies Meta<typeof MonitorCountPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
