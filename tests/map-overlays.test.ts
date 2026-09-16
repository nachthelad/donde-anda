import { describe, expect, it } from "vitest";
import { scenes } from "@/data/scenes";
import {
  MAP_OVERLAY,
  SCENE_BADGE_ART,
  SCENE_SPRITE_CELL_ZOOM,
  SCENE_SPRITE_SHEET,
  sceneSpriteLayerStyle,
} from "@/lib/map-overlays";

function parsePercent(value: string): number {
  expect(value).toMatch(/^-?\d+(\.\d+)?%$/);
  return Number.parseFloat(value);
}

describe("scene sprite layer", () => {
  it("models the sprite sheets as a square 4x2 grid", () => {
    expect(SCENE_SPRITE_SHEET.columns / SCENE_SPRITE_SHEET.rows).toBe(
      SCENE_SPRITE_SHEET.width / SCENE_SPRITE_SHEET.height,
    );
    expect(SCENE_SPRITE_SHEET.width / SCENE_SPRITE_SHEET.columns).toBe(
      SCENE_SPRITE_SHEET.height / SCENE_SPRITE_SHEET.rows,
    );
  });

  it("offsets each cell with percentages of the sprite window, not pixels", () => {
    const origin = sceneSpriteLayerStyle(0, 1);
    const lastColumn = sceneSpriteLayerStyle(3, 1);
    const secondRow = sceneSpriteLayerStyle(4, 1);

    expect(origin).toEqual({
      width: "400%",
      height: "200%",
      left: "0%",
      top: "0%",
    });
    expect(lastColumn.left).toBe("-300%");
    expect(lastColumn.top).toBe("0%");
    expect(secondRow.left).toBe("0%");
    expect(secondRow.top).toBe("-100%");

    for (const style of [origin, lastColumn, secondRow]) {
      expect(JSON.stringify(style)).not.toMatch(/px|vh|vw|dvh/);
    }
  });

  it("zooms uniformly into the cell so art stays centered while filling the badge", () => {
    expect(SCENE_SPRITE_CELL_ZOOM).toBeGreaterThan(1);
    expect(SCENE_SPRITE_CELL_ZOOM).toBeLessThan(1.4);

    const style = sceneSpriteLayerStyle(0);
    const width = parsePercent(style.width);
    const height = parsePercent(style.height);
    const left = parsePercent(style.left);
    const top = parsePercent(style.top);

    expect(width / height).toBeCloseTo(SCENE_SPRITE_SHEET.columns / SCENE_SPRITE_SHEET.rows, 6);
    expect(width).toBeCloseTo(SCENE_SPRITE_SHEET.columns * SCENE_SPRITE_CELL_ZOOM * 100, 6);
    expect(left).toBeCloseTo(top, 6);
    expect(left).toBeLessThan(0);

    const shifted = sceneSpriteLayerStyle(5);
    expect(parsePercent(shifted.left)).toBeCloseTo(
      -((5 % SCENE_SPRITE_SHEET.columns) * SCENE_SPRITE_CELL_ZOOM * 100) + left,
      6,
    );
    expect(parsePercent(shifted.top)).toBeCloseTo(
      -(Math.floor(5 / SCENE_SPRITE_SHEET.columns) * SCENE_SPRITE_CELL_ZOOM * 100) + top,
      6,
    );
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

  it("fits every catalog sprite index on the 4x2 sheet", () => {
    const cellCount = SCENE_SPRITE_SHEET.columns * SCENE_SPRITE_SHEET.rows;
    for (const scene of scenes) {
      if (!scene.sprite) continue;
      expect(scene.sprite.index).toBeGreaterThanOrEqual(0);
      expect(scene.sprite.index).toBeLessThan(cellCount);
    }
  });
});

describe("scene badge art fit", () => {
  it("keeps PNG art square and optically lifted inside the badge", () => {
    expect(SCENE_BADGE_ART.pngScale).toBeGreaterThan(1);
    expect(SCENE_BADGE_ART.pngScale).toBeLessThan(1.35);
    expect(SCENE_BADGE_ART.pngShiftY).toMatch(/^-?\d+(\.\d+)?%$/);
    expect(Number.parseFloat(SCENE_BADGE_ART.pngShiftY)).toBeLessThan(0);
    expect(JSON.stringify(SCENE_BADGE_ART)).not.toMatch(/px|vh|vw|dvh/);
  });
});
