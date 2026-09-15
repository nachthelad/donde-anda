import { describe, expect, it } from "vitest";
import { scenes } from "@/data/scenes";
import { buildShareText, toShareHeadline } from "@/lib/share-copy";

describe("share copy", () => {
  it("writes every current delivery result as Mi repartidor for X", () => {
    for (const scene of scenes) {
      expect(toShareHeadline(scene.headline).startsWith("Mi repartidor")).toBe(true);
    }
  });

  it("rewrites Tu delivery to Mi delivery for X", () => {
    expect(toShareHeadline("Tu delivery paró a cebarse unos mates")).toBe(
      "Mi delivery paró a cebarse unos mates",
    );
  });

  it("builds the complete reusable share text", () => {
    expect(buildShareText("Tu repartidor encontró un atajo")).toBe(
      "Mi repartidor encontró un atajo. ¿Dónde anda el tuyo?",
    );
  });
});
