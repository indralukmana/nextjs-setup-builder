export type SetupPresetId = "essentials" | "focus" | "creator";

export type SetupPreset = {
  id: SetupPresetId;
  deskId: string;
  chairId: string;
  accessoryIds: string[];
  monitorCount: 1 | 2 | 3;
  rentalWeeks: number;
};

export const setupPresets: SetupPreset[] = [
  {
    id: "essentials",
    deskId: "desk-bollsidan",
    chairId: "chair-alefjall",
    accessoryIds: ["lamp-nymane"],
    monitorCount: 1,
    rentalWeeks: 4,
  },
  {
    id: "focus",
    deskId: "desk-mittzon",
    chairId: "chair-gronfjall",
    accessoryIds: ["lamp-svallet"],
    monitorCount: 2,
    rentalWeeks: 4,
  },
  {
    id: "creator",
    deskId: "desk-utespelare",
    chairId: "chair-gronfjall-headrest",
    accessoryIds: ["drawer-alex"],
    monitorCount: 3,
    rentalWeeks: 12,
  },
];

export function getPresetById(id: string) {
  return setupPresets.find((preset) => preset.id === id);
}
