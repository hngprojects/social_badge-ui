export interface PaletteSwatch {
  id: string;
  from: string;
  to: string;
}

export const EDITOR_PALETTES: PaletteSwatch[] = [
  { id: "bg_mesh_01", from: "#ff007a", to: "#ffa800" },
  { id: "bg_mesh_02", from: "#2e2a67", to: "#7b73c7" },
  { id: "bg_mesh_03", from: "#4158d0", to: "#ffcc70" },
  { id: "bg_mesh_04", from: "#4158d0", to: "#c850c0" },
  { id: "bg_color_dark", from: "#0A0A0A", to: "#0A0A0A" },
  { id: "bg_color_amber", from: "#FFD466", to: "#FFD466" },
  { id: "bg_color_teal", from: "#7CD7C5", to: "#7CD7C5" },
  { id: "bg_color_purple", from: "#C8B2FF", to: "#C8B2FF" },
  { id: "bg_color_light_grey", from: "#EAEAE6", to: "#EAEAE6" },
];

export const BACKGROUND_IMAGE_BY_PALETTE: Record<string, string> = {
  bg_mesh_01: "/assets/dashboard/bg-1.png",
  bg_mesh_02: "/assets/dashboard/bg-2.png",
  bg_mesh_03: "/assets/dashboard/bg-3.png",
  bg_mesh_04: "/assets/dashboard/bg-4.png",
};

export function getPalette(paletteId: string): PaletteSwatch {
  return EDITOR_PALETTES.find((p) => p.id === paletteId) ?? EDITOR_PALETTES[0];
}
