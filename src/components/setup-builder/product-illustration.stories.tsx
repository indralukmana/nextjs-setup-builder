import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { catalog } from "@/data/catalog";

import { ProductIllustration } from "./preview-layers";

const meta = {
  title: "SetupBuilder/ProductIllustration",
  component: ProductIllustration,
  args: {
    productId: "desk-electric",
    className: "h-32 w-full",
  },
} satisfies Meta<typeof ProductIllustration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desk: Story = {};

export const Chair: Story = {
  args: {
    productId: "chair-ergonomic",
  },
};

export const Monitor: Story = {
  args: {
    productId: catalog.find((item) => item.id === "monitor-27-4k")!.id,
  },
};
