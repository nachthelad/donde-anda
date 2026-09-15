import { describe, expect, it } from "vitest";
import { scenes } from "@/data/scenes";
import { toShareHeadline } from "@/lib/share-copy";

describe("share copy", () => {
  it("writes every delivery result in first person for X", () => {
    for (const scene of scenes) {
      expect(toShareHeadline(scene.headline).startsWith("Mi delivery")).toBe(true);
    }
  });
});
