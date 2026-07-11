import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { WorkspacePreview } from "./workspace-preview";

const meta = {
  title: "SetupBuilder/WorkspacePreview",
  component: WorkspacePreview,
} satisfies Meta<typeof WorkspacePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
