import { describe, expect, it } from "vitest";
import { scenes } from "@/data/scenes";

describe("scene catalog", () => {
  it("contains the approved 20/8/2 catalog", () => {
    expect(scenes).toHaveLength(30);
    expect(scenes.filter((scene) => scene.rarity === "common")).toHaveLength(20);
    expect(scenes.filter((scene) => scene.rarity === "rare")).toHaveLength(8);
    expect(scenes.filter((scene) => scene.rarity === "legendary")).toHaveLength(2);
  });

  it("has unique ids and complete accessible copy", () => {
    expect(new Set(scenes.map((scene) => scene.id)).size).toBe(scenes.length);
    for (const scene of scenes) {
      expect(scene.headline.startsWith("Tu repartidor")).toBe(true);
      expect(scene.icon.length).toBeGreaterThan(0);
      expect(scene.alt.length).toBeGreaterThan(5);
    }
  });
});
