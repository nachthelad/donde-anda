import type { Rarity } from "@/data/scenes";

export type RarityLabel = {
  text: string;
  tone: "rare" | "legendary";
};

export function getRarityLabel(rarity: Rarity): RarityLabel | null {
  if (rarity === "rare") {
    return {
      text: "✦ Solo el 15% de los deliveries termina en algo así",
      tone: "rare",
    };
  }

  if (rarity === "legendary") {
    return {
      text: "✦ Encontraste un secreto · Solo el 1% llega tan lejos",
      tone: "legendary",
    };
  }

  return null;
}
