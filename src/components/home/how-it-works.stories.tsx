import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HowItWorks } from "./how-it-works";

const meta = {
  title: "Home/HowItWorks",
  component: HowItWorks,
  args: {
    heading: "How it works",
    steps: [
      {
        title: "Pick a desk",
        description: "Choose an electric or mechanical standing desk.",
      },
      {
        title: "Add chair and gear",
        description: "Layer monitors, lamps, plants, and peripherals.",
      },
      {
        title: "Rent when ready",
        description: "Review weekly pricing and request delivery.",
      },
    ],
  },
} satisfies Meta<typeof HowItWorks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
