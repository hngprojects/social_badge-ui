import type { CSSProperties } from "react";
import type { CustomizeEditorState } from "../../types/canvas-data";
import { HNG_LAYOUT_IDS } from "./constants";

export function isHngLayout(layoutId: string): boolean {
	return HNG_LAYOUT_IDS.has(layoutId);
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
