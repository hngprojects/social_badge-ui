import type { CanvasData, CanvasLayoutId } from "../types/canvas-data";

const CANVAS_LAYOUT_IDS: CanvasLayoutId[] = [
  "photo_gradient_v1",
  "name_role_dark_v1",
  "name_role_dark_v2",
  "speaker_card_v1",
];

export const PLATFORM_TEMPLATE_LAYOUT_MAP: Record<string, CanvasLayoutId> = {
  tpl_achieveher: "photo_gradient_v1",
  tpl_dev_summit_26: "name_role_dark_v2",
  tpl_web3_summit: "name_role_dark_v1",
  tpl_next_gen: "speaker_card_v1",
};

function isCanvasLayoutId(value: string): value is CanvasLayoutId {
  return CANVAS_LAYOUT_IDS.includes(value as CanvasLayoutId);
}

/** Used by /customize live preview — prefers API `canvas_data.layout_id`. */
export function resolveLayoutId(
  platformTemplateId: string,
  canvasData?: CanvasData | null,
): CanvasLayoutId {
  const fromCanvas = canvasData?.layout_id;
  if (fromCanvas && isCanvasLayoutId(fromCanvas)) {
    return fromCanvas;
  }
  return PLATFORM_TEMPLATE_LAYOUT_MAP[platformTemplateId] ?? "photo_gradient_v1";
}

export interface LayoutCapabilities {
  staticFields: Array<"event_name" | "event_date">;
  participantFields: Array<"participant_name" | "role_title" | "participant_photo">;
  hasHeaderLogo: boolean;
  defaultLogoPosition: "top-center" | "top-left" | "top-right";
  defaultPaletteId: string;
  previewColor: string;
}

export const LAYOUT_CAPABILITIES: Record<CanvasLayoutId, LayoutCapabilities> = {
  photo_gradient_v1: {
    staticFields: ["event_name", "event_date"],
    participantFields: ["participant_name", "participant_photo"],
    hasHeaderLogo: true,
    defaultLogoPosition: "top-center",
    defaultPaletteId: "bg_mesh_01",
    previewColor: "",
  },
  name_role_dark_v2: {
    staticFields: ["event_name"],
    participantFields: ["participant_name", "participant_photo"],
    hasHeaderLogo: false,
    defaultLogoPosition: "top-right",
    defaultPaletteId: "bg_color_dark",
    previewColor: "#0A0A0A",
  },
  name_role_dark_v1: {
    staticFields: ["event_name"],
    participantFields: ["participant_name", "role_title", "participant_photo"],
    hasHeaderLogo: false,
    defaultLogoPosition: "top-right",
    defaultPaletteId: "bg_mesh_02",
    previewColor: "#1a1232",
  },
  speaker_card_v1: {
    staticFields: ["event_name", "event_date"],
    participantFields: ["participant_name", "role_title"],
    hasHeaderLogo: false,
    defaultLogoPosition: "top-left",
    defaultPaletteId: "bg_color_light_grey",
    previewColor: "#F5F5F0",
  },
};
