import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { getProductSync } from "@/lib/catalog-api";

import { ProductCategoryIcon } from "./product-category-icon";

const desk = getProductSync("desk-bollsidan")!;

const meta = {
  title: "SetupBuilder/ProductCategoryIcon",
  component: ProductCategoryIcon,
  args: {
    product: desk,
    className: "size-8",
  },
} satisfies Meta<typeof ProductCategoryIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desk: Story = {};

export const Chair: Story = {
  args: {
    product: getProductSync("chair-alefjall")!,
  },
};

export const Monitor: Story = {
  args: {
    product: getProductSync("monitor-gaming")!,
  },
};
