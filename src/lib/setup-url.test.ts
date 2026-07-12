import { describe, expect, it } from "vitest";

import {
  hasSetupSearchParams,
  parseSetupSearchParams,
  serializeSetupSearchParams,
} from "@/lib/setup-url";

describe("setup-url", () => {
  it("detects and parses shareable setup query params", () => {
    const params = new URLSearchParams(
      "desk=desk-mechanical&chair=chair-task&accessories=monitor-24,lamp-led&weeks=12",
    );

    expect(hasSetupSearchParams(params)).toBe(true);
    expect(parseSetupSearchParams(params)).toEqual({
      deskId: "desk-mechanical",
      chairId: "chair-task",
      accessoryIds: ["monitor-24", "lamp-led"],
      rentalWeeks: 12,
    });
  });

  it("returns null when no setup params are present", () => {
    expect(parseSetupSearchParams(new URLSearchParams("utm=1"))).toBeNull();
  });

  it("serializes the current setup for the URL", () => {
    expect(
      serializeSetupSearchParams({
        deskId: "desk-electric",
        chairId: "chair-ergonomic",
        accessoryIds: ["webcam-hd"],
        rentalWeeks: 4,
      }),
    ).toBe("desk=desk-electric&chair=chair-ergonomic&accessories=webcam-hd&weeks=4");
  });
});
