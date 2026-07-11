import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FeatureHighlights } from "./feature-highlights";

const meta = {
  title: "Home/FeatureHighlights",
  component: FeatureHighlights,
  args: {
    heading: "Why build visually",
    items: [
      {
        title: "Live preview",
        description: "See your setup update as you pick each piece.",
      },
      {
        title: "Flexible weekly rental",
        description: "Stay a week or a season without buying furniture.",
      },
      {
        title: "Bali delivery",
        description: "monis handles delivery, setup, and pickup.",
      },
    ],
  },
} satisfies Meta<typeof FeatureHighlights>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
