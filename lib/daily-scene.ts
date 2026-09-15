import { scenes, scenesByRarity, type Rarity, type Scene } from "@/data/scenes";

export const STORAGE_KEY = "donde-anda:daily:v1";

export type StoredDailyScene = {
  version: 1;
  seed: string;
  date: string;
  sceneId: string;
};

function hashToUnit(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967296;
}

function rarityFor(value: number): Rarity {
  if (value < 0.84) return "common";
  if (value < 0.99) return "rare";
  return "legendary";
}

export function localDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function chooseDailyScene(seed: string, dateKey: string, previousSceneId?: string): Scene {
  const rarity = rarityFor(hashToUnit(`${seed}|${dateKey}|rarity`));
  const bucket = scenesByRarity[rarity];
  let index = Math.floor(hashToUnit(`${seed}|${dateKey}|scene`) * bucket.length);
  if (bucket[index]?.id === previousSceneId && bucket.length > 1) {
    index = (index + 1) % bucket.length;
  }
  return bucket[index] ?? scenes[0];
}

function makeSeed(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getDailyScene(storage: Storage, date = new Date()): Scene {
  const today = localDateKey(date);
  let stored: StoredDailyScene | null = null;

  try {
    const raw = storage.getItem(STORAGE_KEY);
    stored = raw ? (JSON.parse(raw) as StoredDailyScene) : null;
  } catch {
    stored = null;
  }

  if (stored?.version === 1 && stored.date === today) {
    const existing = scenes.find((scene) => scene.id === stored.sceneId);
    if (existing) return existing;
  }

  const seed = stored?.version === 1 && typeof stored.seed === "string" ? stored.seed : makeSeed();
  const scene = chooseDailyScene(seed, today, stored?.sceneId);
  const next: StoredDailyScene = { version: 1, seed, date: today, sceneId: scene.id };

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable in private browsing; the caller keeps the scene in memory.
  }

  return scene;
}
