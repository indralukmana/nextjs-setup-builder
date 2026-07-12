import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { catalog } from "@/data/catalog";

import { ProductCard } from "./product-card";

const product = catalog[0]!;

const meta = {
  title: "SetupBuilder/ProductCard",
  component: ProductCard,
  args: {
    product,
    selected: false,
    onSelect: () => undefined,
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Accessory: Story = {
  args: {
    product: catalog.find((item) => item.id === "monitor-27-4k")!,
  },
};

export const Disabled: Story = {
  args: {
    product: catalog.find((item) => item.id === "monitor-34")!,
    disabled: true,
    disabledReason: "Max 2 monitors",
  },
};
