import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HeroSection } from "./hero-section";

const meta = {
  title: "Home/HeroSection",
  component: HeroSection,
  args: {
    title: "Build your Bali workspace",
    cta: "Start building",
  },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
