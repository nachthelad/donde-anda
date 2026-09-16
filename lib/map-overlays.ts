export type ArtBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ArtLayerStyle = {
  width: string;
  height: string;
  left: string;
  top: string;
};

export const SCENE_SPRITE_SHEET = {
  width: 1774,
  height: 887,
  columns: 4,
  rows: 2,
} as const;

/** Content occupies this fraction of the badge; leftover is even padding. */
export const SCENE_BADGE_INSET = 0.08;

const PNG_SHEET = { width: 1254, height: 1254 } as const;

const PNG_CONTENT: Record<string, ArtBox> = {
  "/icons/alien-inspector.png": { x: 189, y: 87, width: 936, height: 1076 },
  "/icons/argentina-1810.png": { x: 41, y: 74, width: 1168, height: 1130 },
  "/icons/capybara-hug.png": { x: 189, y: 66, width: 923, height: 1123 },
  "/icons/carpincho-delivery.png": { x: 87, y: 79, width: 1037, height: 1146 },
  "/icons/delivery-clones.png": { x: 127, y: 72, width: 1001, height: 1083 },
  "/icons/mayor.png": { x: 275, y: 77, width: 740, height: 1104 },
  "/icons/multiverse.png": { x: 37, y: 217, width: 1183, height: 852 },
  "/icons/time-machine.png": { x: 108, y: 146, width: 1074, height: 951 },
  "/icons/ufo-delivery.png": { x: 244, y: 189, width: 765, height: 856 },
};

const SPRITE_CONTENT: Record<string, Array<ArtBox | null>> = {
  "/icons/sprite-common-a.png": [
    { x: 101, y: 10, width: 255, height: 423 },
    { x: 456, y: 29, width: 405, height: 395 },
    { x: 900, y: 92, width: 428, height: 283 },
    { x: 1347, y: 16, width: 391, height: 420 },
    { x: 11, y: 450, width: 432, height: 410 },
    { x: 454, y: 560, width: 428, height: 241 },
    { x: 924, y: 481, width: 404, height: 378 },
    null,
  ],
  "/icons/sprite-common-b.png": [
    { x: 23, y: 13, width: 399, height: 407 },
    { x: 467, y: 23, width: 395, height: 402 },
    { x: 899, y: 15, width: 429, height: 417 },
    { x: 1357, y: 11, width: 409, height: 419 },
    { x: 9, y: 518, width: 435, height: 300 },
    { x: 470, y: 457, width: 411, height: 408 },
    { x: 900, y: 539, width: 431, height: 319 },
    null,
  ],
  "/icons/sprite-mixed.png": [
    { x: 27, y: 61, width: 406, height: 358 },
    { x: 462, y: 46, width: 404, height: 373 },
    { x: 900, y: 112, width: 430, height: 278 },
    { x: 1364, y: 75, width: 351, height: 328 },
    { x: 57, y: 463, width: 339, height: 392 },
    { x: 460, y: 461, width: 410, height: 377 },
    { x: 893, y: 461, width: 404, height: 386 },
    null,
  ],
};

export const MAP_OVERLAY = {
  markerSize: "14.4cqi",
  controlSize: "11.2cqi",
  gutter: "5cqi",
  pinWidth: "7cqi",
  pinHeight: "9.1cqi",
  markerBottom: "calc(var(--card-overlap) + 4.2cqi)",
  locateBottom: "calc(var(--card-overlap) + 4.2cqi)",
} as const;

/** Contain the opaque art box in the square badge, with even padding. */
export function imageLayerStyle(
  sheet: { width: number; height: number },
  content: ArtBox,
  inset = SCENE_BADGE_INSET,
): ArtLayerStyle {
  const available = 1 - inset;
  const scale = available / Math.max(content.width, content.height);
  const leftoverX = 1 - content.width * scale;
  const leftoverY = 1 - content.height * scale;

  return {
    width: `${sheet.width * scale * 100}%`,
    height: `${sheet.height * scale * 100}%`,
    left: `${(leftoverX / 2 - content.x * scale) * 100}%`,
    top: `${(leftoverY / 2 - content.y * scale) * 100}%`,
  };
}

export function contentBoxOnBadge(content: ArtBox, inset = SCENE_BADGE_INSET) {
  const available = 1 - inset;
  const scale = available / Math.max(content.width, content.height);
  const leftoverX = 1 - content.width * scale;
  const leftoverY = 1 - content.height * scale;
  return {
    left: leftoverX / 2,
    top: leftoverY / 2,
    right: leftoverX / 2 + content.width * scale,
    bottom: leftoverY / 2 + content.height * scale,
  };
}

export function sceneSpriteLayerStyle(src: string, index: number): ArtLayerStyle | null {
  const content = SPRITE_CONTENT[src]?.[index];
  if (!content) return null;
  return imageLayerStyle(SCENE_SPRITE_SHEET, content);
}

export function scenePngLayerStyle(src: string): ArtLayerStyle | null {
  const content = PNG_CONTENT[src];
  if (!content) return null;
  return imageLayerStyle(PNG_SHEET, content);
}

export function spriteContentBox(src: string, index: number): ArtBox | null {
  return SPRITE_CONTENT[src]?.[index] ?? null;
}

export function pngContentBox(src: string): ArtBox | null {
  return PNG_CONTENT[src] ?? null;
}
