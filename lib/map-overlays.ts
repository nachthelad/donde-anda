export const SCENE_SPRITE_SHEET = {
  width: 1774,
  height: 887,
  columns: 4,
  rows: 2,
} as const;

/** Uniform zoom into each square cell so padded sprite art fills the badge. */
export const SCENE_SPRITE_CELL_ZOOM = 1.22;

export type SceneSpriteLayerStyle = {
  width: string;
  height: string;
  left: string;
  top: string;
};

export function sceneSpriteLayerStyle(
  index: number,
  zoom = SCENE_SPRITE_CELL_ZOOM,
): SceneSpriteLayerStyle {
  const { columns, rows } = SCENE_SPRITE_SHEET;
  const column = ((index % columns) + columns) % columns;
  const row = Math.min(Math.max(Math.floor(index / columns), 0), rows - 1);
  const originShift = ((zoom - 1) / 2) * 100;

  return {
    width: `${columns * zoom * 100}%`,
    height: `${rows * zoom * 100}%`,
    left: `${-column * zoom * 100 - originShift}%`,
    top: `${-row * zoom * 100 - originShift}%`,
  };
}

export const MAP_OVERLAY = {
  markerSize: "14.4cqi",
  controlSize: "11.2cqi",
  gutter: "5cqi",
  pinWidth: "7cqi",
  pinHeight: "9.1cqi",
  markerBottom: "calc(var(--card-overlap) + 4.2cqi)",
  locateBottom: "calc(var(--card-overlap) + 4.2cqi)",
} as const;
