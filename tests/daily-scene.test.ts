import { describe, expect, it } from "vitest";
import { chooseDailyScene, getDailyScene, localDateKey, STORAGE_KEY } from "@/lib/daily-scene";

class MemoryStorage implements Storage {
  private values = new Map<string, string>();
  get length() { return this.values.size; }
  clear() { this.values.clear(); }
  getItem(key: string) { return this.values.get(key) ?? null; }
  key(index: number) { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string) { this.values.delete(key); }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

describe("daily scene selection", () => {
  it("formats the date in local time", () => {
    expect(localDateKey(new Date(2026, 8, 5, 23, 30))).toBe("2026-09-05");
  });

  it("returns the same scene for the same seed and date", () => {
    expect(chooseDailyScene("device-a", "2026-09-15").id).toBe(chooseDailyScene("device-a", "2026-09-15").id);
  });

  it("keeps a stored scene for the same day", () => {
    const storage = new MemoryStorage();
    const date = new Date(2026, 8, 15, 12);
    expect(getDailyScene(storage, date).id).toBe(getDailyScene(storage, date).id);
    expect(JSON.parse(storage.getItem(STORAGE_KEY) ?? "{}").date).toBe("2026-09-15");
  });

  it("does not repeat yesterday's result", () => {
    const storage = new MemoryStorage();
    const first = getDailyScene(storage, new Date(2026, 8, 15, 12));
    const second = getDailyScene(storage, new Date(2026, 8, 16, 12));
    expect(second.id).not.toBe(first.id);
  });

  it("follows the approved rarity distribution", () => {
    const counts = { common: 0, rare: 0, legendary: 0 };
    const samples = 100_000;
    for (let index = 0; index < samples; index += 1) {
      counts[chooseDailyScene(`device-${index}`, "2026-09-15").rarity] += 1;
    }

    expect(counts.common / samples).toBeGreaterThan(0.83);
    expect(counts.common / samples).toBeLessThan(0.85);
    expect(counts.rare / samples).toBeGreaterThan(0.14);
    expect(counts.rare / samples).toBeLessThan(0.16);
    expect(counts.legendary / samples).toBeGreaterThan(0.008);
    expect(counts.legendary / samples).toBeLessThan(0.012);
  });
});
