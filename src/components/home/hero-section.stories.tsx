import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HeroSection } from "./hero-section";

const meta = {
  title: "Home/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    brand: "monis",
    title: "Build your Bali workspace",
    subtitle: "Compose a desk, chair, and gear visually — then rent it delivered across Bali.",
    cta: "Start building",
  },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
