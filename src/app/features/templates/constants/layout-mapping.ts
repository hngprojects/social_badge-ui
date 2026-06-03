import type { CanvasData, CanvasLayoutId } from "../types/canvas-data";

const CANVAS_LAYOUT_IDS: CanvasLayoutId[] = [
	"circle_photo_dark_v1",
	"dark_name_photo_v1",
	"bold_name_pink_v1",
	"split_purple_teal_v1",
];

export const PLATFORM_TEMPLATE_LAYOUT_MAP: Record<string, CanvasLayoutId> = {
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

	if (isCanvasLayoutId(platformTemplateId)) {
		return platformTemplateId;
	}

	const mapped = PLATFORM_TEMPLATE_LAYOUT_MAP[platformTemplateId];
	if (mapped) return mapped;

	// Fallback should probably be one of the new ones
	return "bold_name_pink_v1";
}

export interface LayoutCapabilities {
	staticFields: Array<"event_name" | "event_date">;
	participantFields: Array<
		"participant_name" | "role_title" | "participant_photo"
	>;
	hasHeaderLogo: boolean;
	defaultLogoPosition: "top-center" | "top-left" | "top-right";
	defaultPaletteId: string;
	previewColor: string;
}

export const LAYOUT_CAPABILITIES: Record<CanvasLayoutId, LayoutCapabilities> = {
	bold_name_pink_v1: {
		staticFields: [],
		participantFields: ["participant_name", "role_title", "participant_photo"],
		hasHeaderLogo: false,
		defaultLogoPosition: "top-center",
		defaultPaletteId: "bg_color_pink",
		previewColor: "#f5c6d0",
	},
	circle_photo_dark_v1: {
		staticFields: [],
		participantFields: ["participant_name", "role_title", "participant_photo"],
		hasHeaderLogo: true,
		defaultLogoPosition: "top-center",
		defaultPaletteId: "bg_color_dark",
		previewColor: "#1e1e1e",
	},
	dark_name_photo_v1: {
		staticFields: ["event_name"],
		participantFields: ["participant_name", "role_title", "participant_photo"],
		hasHeaderLogo: true,
		defaultLogoPosition: "top-left",
		defaultPaletteId: "bg_color_dark",
		previewColor: "#1a1a1a",
	},
	split_purple_teal_v1: {
		staticFields: ["event_name"],
		participantFields: ["participant_name", "role_title", "participant_photo"],
		hasHeaderLogo: true,
		defaultLogoPosition: "top-left",
		defaultPaletteId: "bg_mesh_purple_teal",
		previewColor: "#6b3fa0",
	},
};
