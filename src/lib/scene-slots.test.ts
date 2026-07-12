import { describe, expect, it } from "vitest";

import {
  PRODUCT_SCENE_MODELS,
  buildSceneSlots,
  monitorOffsetsForCount,
  resolveSceneModel,
} from "@/lib/scene-slots";

describe("PRODUCT_SCENE_MODELS", () => {
  it("maps every IKEA catalog furniture id to a distinct mesh path", () => {
    expect(resolveSceneModel("desk-bollsidan")?.src).not.toBe(
      resolveSceneModel("desk-mittzon")?.src,
    );
    expect(resolveSceneModel("chair-alefjall")?.src).not.toBe(
      resolveSceneModel("chair-gronfjall")?.src,
    );
    expect(resolveSceneModel("monitor-gaming")?.src).toContain("gaming-monitor");
    expect(PRODUCT_SCENE_MODELS["lamp-nymane"]).toBeDefined();
    expect(PRODUCT_SCENE_MODELS["drawer-alex"]).toBeDefined();
    expect(PRODUCT_SCENE_MODELS["stand-lanespelare"]).toBeDefined();
    expect(PRODUCT_SCENE_MODELS["stand-elloven"]).toBeUndefined();
  });
});

describe("monitorOffsetsForCount", () => {
  it("centers one monitor", () => {
    expect(monitorOffsetsForCount(1, "desk-bollsidan").map((p) => p[0])).toEqual([0]);
  });

  it("places two monitors side by side", () => {
    expect(monitorOffsetsForCount(2, "desk-bollsidan").map((p) => p[0])).toEqual([-0.26, 0.26]);
  });

  it("places three monitors as center plus flanks", () => {
    expect(monitorOffsetsForCount(3, "desk-bollsidan").map((p) => p[0])).toEqual([0, -0.48, 0.48]);
  });

  it("uses a dedicated monitor Y per desk", () => {
    expect(monitorOffsetsForCount(1, "desk-mittzon")[0]![1]).toBe(0.74);
    expect(monitorOffsetsForCount(1, "desk-utespelare")[0]![1]).toBe(0.75);
    expect(monitorOffsetsForCount(1, "desk-bollsidan")[0]![1]).toBe(0.75);
  });
});

describe("buildSceneSlots", () => {
  it("uses different meshes when desk/chair/accessories change", () => {
    const essentials = buildSceneSlots({
      deskId: "desk-bollsidan",
      chairId: "chair-alefjall",
      accessoryIds: ["lamp-nymane"],
      monitorCount: 1,
    });
    const focus = buildSceneSlots({
      deskId: "desk-mittzon",
      chairId: "chair-gronfjall",
      accessoryIds: ["lamp-svallet"],
      monitorCount: 2,
    });

    expect(essentials.find((s) => s.role === "desk")?.src).toBe(
      PRODUCT_SCENE_MODELS["desk-bollsidan"]!.src,
    );
    expect(focus.find((s) => s.role === "desk")?.src).toBe(
      PRODUCT_SCENE_MODELS["desk-mittzon"]!.src,
    );
    expect(essentials.find((s) => s.role === "chair")?.src).toBe(
      PRODUCT_SCENE_MODELS["chair-alefjall"]!.src,
    );
    expect(focus.find((s) => s.role === "chair")?.src).toBe(
      PRODUCT_SCENE_MODELS["chair-gronfjall"]!.src,
    );
    expect(essentials.map((s) => s.productId)).toEqual([
      "desk-bollsidan",
      "chair-alefjall",
      "monitor-gaming",
      "lamp-nymane",
    ]);
    expect(focus.filter((s) => s.role === "monitor").map((s) => s.position[0])).toEqual([
      -0.26, 0.26,
    ]);
  });

  it("squares the ALEX drawer to the desk", () => {
    const slots = buildSceneSlots({
      deskId: "desk-utespelare",
      chairId: "chair-gronfjall-headrest",
      accessoryIds: ["drawer-alex"],
      monitorCount: 1,
    });
    const drawer = slots.find((s) => s.productId === "drawer-alex");
    expect(drawer?.rotation).toEqual([0, 0, 0]);
    expect(drawer?.position).toEqual([1.15, 0, 0]);
  });

  it("omits desk accessories when there are 3 monitors but keeps drawers", () => {
    const slots = buildSceneSlots({
      deskId: "desk-utespelare",
      chairId: "chair-gronfjall-headrest",
      accessoryIds: ["lamp-nymane", "drawer-alex", "stand-lanespelare"],
      monitorCount: 3,
    });
    expect(slots.filter((s) => s.role === "monitor")).toHaveLength(3);
    expect(slots.some((s) => s.productId === "lamp-nymane")).toBe(false);
    expect(slots.some((s) => s.productId === "drawer-alex")).toBe(true);
  });

  it("returns an empty list when the setup is cleared", () => {
    expect(
      buildSceneSlots({
        deskId: "",
        chairId: "",
        accessoryIds: [],
        monitorCount: 0,
      }),
    ).toEqual([]);
  });
});
