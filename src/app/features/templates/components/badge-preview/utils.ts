import type { CSSProperties } from "react";
import type { CustomizeEditorState } from "../../types/canvas-data";
import { HNG_LAYOUT_IDS } from "./constants";

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
