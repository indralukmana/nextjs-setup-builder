import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MonitorLimitNotice } from "./monitor-limit-notice";

const meta = {
  title: "SetupBuilder/MonitorLimitNotice",
  component: MonitorLimitNotice,
  args: {
    message: "Maximum 2 monitors selected. Deselect one to add another.",
  },
} satisfies Meta<typeof MonitorLimitNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
