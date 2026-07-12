import { describe, expect, it } from "vitest";

import {
  hasSetupSearchParams,
  parseSetupSearchParams,
  serializeSetupSearchParams,
} from "@/lib/setup-url";

describe("setup-url", () => {
  it("detects setup search params", () => {
    expect(hasSetupSearchParams(new URLSearchParams("monitors=2"))).toBe(true);
    expect(hasSetupSearchParams(new URLSearchParams("foo=1"))).toBe(false);
  });

  it("parses shareable setup params", () => {
    const parsed = parseSetupSearchParams(
      new URLSearchParams(
        "desk=desk-mittzon&chair=chair-gronfjall&accessories=lamp-svallet&monitors=2&weeks=12",
      ),
    );

    expect(parsed).toEqual({
      deskId: "desk-mittzon",
      chairId: "chair-gronfjall",
      accessoryIds: ["lamp-svallet"],
      monitorCount: 2,
      rentalWeeks: 12,
    });
  });

  it("serializes setup params", () => {
    expect(
      serializeSetupSearchParams({
        deskId: "desk-bollsidan",
        chairId: "chair-alefjall",
        accessoryIds: ["lamp-nymane"],
        monitorCount: 1,
        rentalWeeks: 4,
      }),
    ).toBe("desk=desk-bollsidan&chair=chair-alefjall&accessories=lamp-nymane&monitors=1&weeks=4");
  });
});
