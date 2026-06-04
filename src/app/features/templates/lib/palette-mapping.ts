export interface PaletteSwatch {
  id: string;
  from: string;
  to: string;
}

export const EDITOR_PALETTES: PaletteSwatch[] = [
  { id: "bg_color_dark", from: "#1A1A1A", to: "#1A1A1A" },
  { id: "bg_color_pink", from: "#F5C6D0", to: "#F5C6D0" },
  { id: "bg_mesh_purple_teal", from: "#6543A1", to: "#68C4B9" },
  { id: "bg_mesh_01", from: "#FF007A", to: "#FFB800" },
  { id: "bg_mesh_02", from: "#7928CA", to: "#FF0080" },
  { id: "bg_mesh_03", from: "#0070F3", to: "#00DFD8" },
  { id: "bg_mesh_04", from: "#FF4D4D", to: "#F9CB28" },
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
