const FONT_ID_TO_FAMILY: Record<string, string> = {
  inter: "DM Sans",
  fraunces: "Playfair Display",
  mono: "ui-monospace",
  display: "Georgia",
};

const SIZE_TO_PX: Record<"SMALL" | "MEDIUM" | "LARGE", number> = {
  SMALL: 32,
  MEDIUM: 42,
  LARGE: 52,
};

export function resolveFontFamily(fontId: string): string {
  return FONT_ID_TO_FAMILY[fontId] ?? "DM Sans";
}

export function resolveTitleSizePx(size: "SMALL" | "MEDIUM" | "LARGE"): number {
  return SIZE_TO_PX[size];
}
