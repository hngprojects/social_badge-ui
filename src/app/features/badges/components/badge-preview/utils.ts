import type { CSSProperties } from "react";
import { HNG_LAYOUT_IDS } from "./constants";
import { CustomizeEditorState } from "@/app/features/customize/canvas-data";

export function isHngLayout(layoutId: string): boolean {
	return HNG_LAYOUT_IDS.has(layoutId);
}

/** Allow only safe image URL schemes for client-side <img> rendering. */
export function getSafeImageUrl(
	url: string | null | undefined,
): string | null {
	if (!url) return null;

	const trimmed = url.trim();
	if (!trimmed) return null;

	if (trimmed.startsWith("blob:") || trimmed.startsWith("data:image/")) {
		return trimmed;
	}

	if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
		return trimmed;
	}

	try {
		const parsed = new URL(trimmed);
		if (parsed.protocol === "https:" || parsed.protocol === "http:") {
			return trimmed;
		}
	} catch {
		return null;
	}

	return null;
}

export function getBadgeCaptureBackground(editor: CustomizeEditorState): string {
	if (editor.bgMode === "solid" && editor.solidColor) {
		return editor.solidColor;
	}
	if (editor.bgMode === "gradient" && editor.gradientColors?.[0]) {
		return editor.gradientColors[0];
	}
	return "transparent";
}

export function isLighterColor(hex:string):boolean{
const normalized = hex.replace("#", "");

const r = parseInt(normalized.slice(0,2), 16);
const g = parseInt(normalized.slice(2,4), 16);
const b = parseInt(normalized.slice(4,6), 16);

const brightness = (r*299 + g*587 + b*114) /1000;

return brightness > 160;
}

function getRepresentativeBgColor(editor: CustomizeEditorState): string | null {
	if (editor.bgMode === "solid") {
		return editor.solidColor;
	}

	if (editor.bgMode === "gradient") {
		return editor.gradientColors?.[0] ?? null;
	}

	if (editor.bgMode === "split") {
		if (editor.priBgMode === "gradient") {
			return editor.gradientColors?.[0] ?? null;
		}

		return editor.solidColor;
	}

	return null;
}




export function getWatermarkColorForBackground(editor: CustomizeEditorState): "black" | "white" {
		if (editor.bgMode === "image") {
			// Image backgrounds don't expose a representative color.
    // Use the default branded watermark color.
		return "black";
	}
const bgColor = getRepresentativeBgColor(editor);
	if (!bgColor) return "black";
	return isLighterColor(bgColor) ? "black" : "white"
}




export function buildBgStyle(editor: CustomizeEditorState): CSSProperties {
	if (editor.bgMode === "gradient") {
		const colors = editor.gradientColors;
		if (!colors || colors.length < 2) {
			return {};
		}
		return {
			background: `linear-gradient(${editor.gradientDirection || "135deg"}, ${colors[0]}, ${colors[1]})`,
		};
	}
	if (editor.bgMode === "solid") {
		if (!editor.solidColor) {
			return {};
		}
		return { backgroundColor: editor.solidColor };
	}
	return {};
}
