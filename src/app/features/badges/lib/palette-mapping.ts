export interface PaletteSwatch {
  id: string;
  from: string;
  to: string;
}

export const EDITOR_PALETTES: PaletteSwatch[] = [
  { id: "bg_color_dark", from: "#1A1A1A", to: "#1A1A1A" },
  { id: "bg_color_pink", from: "#F5C6D0", to: "#F5C6D0" },
  { id: "bg_mesh_purple_teal", from: "#6543A1", to: "#6543A1" },
  { id: "bg_mesh_01", from: "#FF007A", to: "#FFB800" },
  { id: "bg_mesh_02", from: "#7928CA", to: "#FF0080" },
  { id: "bg_mesh_03", from: "#0070F3", to: "#00DFD8" },
  { id: "bg_grad_sunset", from: "#FF512F", to: "#DD2476" },
  { id: "bg_grad_sea", from: "#2193B0", to: "#6DD5ED" },
  { id: "bg_grad_mango", from: "#FFE259", to: "#FFA751" },
  { id: "bg_grad_peach", from: "#ED4264", to: "#FFEDBC" },
  { id: "bg_grad_lush", from: "#56AB2F", to: "#A8E063" },
  { id: "bg_grad_ocean", from: "#43C6AC", to: "#191654" },
  { id: "bg_grad_sky", from: "#0074D9", to: "#7FDBFF" },
  { id: "bg_grad_fire", from: "#F12711", to: "#F5AF19" },
  { id: "bg_grad_midnight", from: "#232526", to: "#414345" },
  { id: "bg_color_amber", from: "#FFD466", to: "#FFD466" },
  { id: "bg_color_teal", from: "#7CD7C5", to: "#7CD7C5" },
  { id: "bg_color_purple", from: "#C8B2FF", to: "#C8B2FF" },
  { id: "bg_color_blue", from: "#2D5BFF", to: "#2D5BFF" },
  { id: "bg_color_green", from: "#00C853", to: "#00C853" },
  { id: "bg_color_red", from: "#FF3D00", to: "#FF3D00" },
  { id: "bg_color_orange", from: "#FF9100", to: "#FF9100" },
  { id: "bg_color_white", from: "#FFFFFF", to: "#FFFFFF" },
  { id: "bg_color_yellow", from: "#FFEA00", to: "#FFEA00" },

];

export const BACKGROUND_IMAGE_BY_PALETTE: Record<string, string> = {
  bg_mesh_01: "/assets/dashboard/bg-1.png",
  bg_mesh_02: "/assets/dashboard/bg-2.png",
  bg_mesh_03: "/assets/dashboard/bg-3.png",
};

export function getPalette(paletteId: string): PaletteSwatch {
  return EDITOR_PALETTES.find((p) => p.id === paletteId) ?? EDITOR_PALETTES[0];
}
