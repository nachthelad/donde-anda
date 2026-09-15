import { describe, expect, it } from "vitest";
import { getRarityLabel } from "@/lib/rarity-label";

describe("rarity labels", () => {
  it("keeps common results unmarked", () => {
    expect(getRarityLabel("common")).toBeNull();
  });

  it("marks rare results with their category probability", () => {
    expect(getRarityLabel("rare")).toEqual({
      text: "✦ Solo el 15% de los deliveries termina en algo así",
      tone: "rare",
    });
  });

  it("marks legendary results as a one-percent secret", () => {
    expect(getRarityLabel("legendary")).toEqual({
      text: "✦ Encontraste un secreto · Solo el 1% llega tan lejos",
      tone: "legendary",
    });
  });
});
