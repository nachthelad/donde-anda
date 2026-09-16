import { describe, expect, it } from "vitest";
import { scenes } from "@/data/scenes";
import {
  MAP_OVERLAY,
  SCENE_BADGE_INSET,
  SCENE_SPRITE_SHEET,
  contentBoxOnBadge,
  imageLayerStyle,
  pngContentBox,
  scenePngLayerStyle,
  sceneSpriteLayerStyle,
  spriteContentBox,
} from "@/lib/map-overlays";

function parsePercent(value: string): number {
  expect(value).toMatch(/^-?\d+(\.\d+)?%$/);
  return Number.parseFloat(value);
}

describe("scene sprite sheet", () => {
  it("models the sprite sheets as a square 4x2 grid", () => {
    expect(SCENE_SPRITE_SHEET.columns / SCENE_SPRITE_SHEET.rows).toBe(
      SCENE_SPRITE_SHEET.width / SCENE_SPRITE_SHEET.height,
    );
    expect(SCENE_SPRITE_SHEET.width / SCENE_SPRITE_SHEET.columns).toBe(
      SCENE_SPRITE_SHEET.height / SCENE_SPRITE_SHEET.rows,
    );
  });

  it("fits every catalog sprite index on the 4x2 sheet", () => {
    const cellCount = SCENE_SPRITE_SHEET.columns * SCENE_SPRITE_SHEET.rows;
    for (const scene of scenes) {
      if (!scene.sprite) continue;
      expect(scene.sprite.index).toBeGreaterThanOrEqual(0);
      expect(scene.sprite.index).toBeLessThan(cellCount);
      expect(spriteContentBox(scene.sprite.src, scene.sprite.index)).not.toBeNull();
    }
  });
});

describe("imageLayerStyle", () => {
  it("contains opaque art in the square badge using percentages, not pixels", () => {
    expect(SCENE_BADGE_INSET).toBeGreaterThan(0);
    expect(SCENE_BADGE_INSET).toBeLessThan(0.2);

    const style = imageLayerStyle(
      { width: 1000, height: 1000 },
      { x: 100, y: 100, width: 800, height: 800 },
    );
    const width = parsePercent(style.width);
    const left = parsePercent(style.left);
    const top = parsePercent(style.top);

    expect(width).toBeCloseTo((1000 / 800) * (1 - SCENE_BADGE_INSET) * 100, 6);
    expect(left).toBeCloseTo(top, 6);
    expect(JSON.stringify(style)).not.toMatch(/px|vh|vw|dvh/);
  });

  it("keeps the full art box inside the badge", () => {
    const castle = spriteContentBox("/icons/sprite-common-a.png", 4);
    expect(castle).not.toBeNull();
    const box = contentBoxOnBadge(castle!);
    expect(box.left).toBeGreaterThanOrEqual(0);
    expect(box.top).toBeGreaterThanOrEqual(0);
    expect(box.right).toBeLessThanOrEqual(1);
    expect(box.bottom).toBeLessThanOrEqual(1);
    expect(box.top).toBeGreaterThan(SCENE_BADGE_INSET / 4);
    expect(box.left).toBeGreaterThan(SCENE_BADGE_INSET / 4);
    expect(1 - box.bottom).toBeGreaterThan(SCENE_BADGE_INSET / 4);
    expect(1 - box.right).toBeGreaterThan(SCENE_BADGE_INSET / 4);
  });

  it("letterboxes tall art instead of clipping it", () => {
    const traffic = spriteContentBox("/icons/sprite-common-a.png", 0);
    expect(traffic).not.toBeNull();
    const box = contentBoxOnBadge(traffic!);
    expect(box.top).toBeCloseTo(SCENE_BADGE_INSET / 2, 5);
    expect(box.bottom).toBeCloseTo(1 - SCENE_BADGE_INSET / 2, 5);
    expect(box.left).toBeGreaterThan(SCENE_BADGE_INSET / 2);
  });
});

describe("map overlay tokens", () => {
  it("anchors overlay size and insets to the map container instead of viewport pixels", () => {
    const values = Object.values(MAP_OVERLAY);
    expect(values.length).toBeGreaterThan(0);

    for (const value of values) {
      expect(value).toMatch(/cqi|cqb|%/);
      expect(value).not.toMatch(/px|vh|vw|dvh/);
    }

    expect(MAP_OVERLAY.markerSize).toMatch(/cqi/);
    expect(MAP_OVERLAY.controlSize).toMatch(/cqi/);
    expect(MAP_OVERLAY.gutter).toMatch(/cqi/);
  });

  it("keeps the scene marker and locate control on a shared baseline above the card overlap", () => {
    expect(MAP_OVERLAY.markerBottom).toBe(MAP_OVERLAY.locateBottom);
    expect(MAP_OVERLAY.markerBottom).toContain("var(--card-overlap)");
    expect(MAP_OVERLAY.markerBottom).toMatch(/cqi|%/);
  });
});

describe("scene badge catalog", () => {
  it("can fit every PNG and sprite scene with the shared contain rule", () => {
    for (const scene of scenes) {
      if (scene.iconSrc) {
        expect(pngContentBox(scene.iconSrc)).not.toBeNull();
        const style = scenePngLayerStyle(scene.iconSrc);
        expect(style).not.toBeNull();
        expect(JSON.stringify(style)).not.toMatch(/px|vh|vw|dvh/);
      } else if (scene.sprite) {
        const style = sceneSpriteLayerStyle(scene.sprite.src, scene.sprite.index);
        expect(style).not.toBeNull();
        expect(JSON.stringify(style)).not.toMatch(/px|vh|vw|dvh/);
      } else {
        throw new Error(`scene ${scene.id} has no art`);
      }
    }
  });
});
