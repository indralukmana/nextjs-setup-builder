import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SAVED_SETUPS_KEY } from "@/lib/saved-setups";

import { SavedSetups } from "./saved-setups";

const meta = {
  title: "SetupBuilder/SavedSetups",
  component: SavedSetups,
} satisfies Meta<typeof SavedSetups>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  decorators: [
    (Story) => {
      localStorage.removeItem(SAVED_SETUPS_KEY);
      return <Story />;
    },
  ],
};

export const WithEntries: Story = {
  decorators: [
    (Story) => {
      localStorage.setItem(
        SAVED_SETUPS_KEY,
        JSON.stringify([
          {
            id: "sv_demo1",
            name: "Bali dual monitor",
            setup: {
              deskId: "desk-mittzon",
              chairId: "chair-alefjall",
              accessoryIds: ["lamp-svallet"],
              monitorCount: 2,
              rentalWeeks: 12,
            },
          },
          {
            id: "sv_demo2",
            name: "Compact week",
            setup: {
              deskId: "desk-utespelare",
              chairId: "chair-gronfjall-headrest",
              accessoryIds: ["drawer-alex"],
              monitorCount: 1,
              rentalWeeks: 4,
            },
          },
        ]),
      );
      return <Story />;
    },
  ],
  play: async ({ canvas, userEvent }) => {
    const summary = canvas.getByText(/Saved setups/i);
    await userEvent.click(summary);
  },
};
