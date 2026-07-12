export type SetupPresetId = "essentials" | "focus" | "creator";

export type SetupPreset = {
  id: SetupPresetId;
  deskId: string;
  chairId: string;
  accessoryIds: string[];
  rentalWeeks: number;
};

export const setupPresets: SetupPreset[] = [
  {
    id: "essentials",
    deskId: "desk-electric",
    chairId: "chair-ergonomic",
    accessoryIds: ["monitor-24", "lamp-led", "kit-peripherals"],
    rentalWeeks: 4,
  },
  {
    id: "focus",
    deskId: "desk-mechanical",
    chairId: "chair-task",
    accessoryIds: ["monitor-24", "plant-desk", "whiteboard-glass"],
    rentalWeeks: 4,
  },
  {
    id: "creator",
    deskId: "desk-electric",
    chairId: "chair-ergonomic",
    accessoryIds: ["monitor-27-4k", "webcam-hd", "lamp-led", "kit-peripherals", "power-strip"],
    rentalWeeks: 12,
  },
];

export function getPresetById(id: string) {
  return setupPresets.find((preset) => preset.id === id);
}
