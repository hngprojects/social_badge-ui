import type { CSSProperties } from "react";
import type { CustomizeEditorState } from "../../types/canvas-data";
import { HNG_LAYOUT_IDS } from "./constants";

export function isHngLayout(layoutId: string): boolean {
	return HNG_LAYOUT_IDS.has(layoutId);
}

export function buildBgStyle(editor: CustomizeEditorState): CSSProperties {
	if (editor.bgMode === "gradient") {
		return {
			background: `linear-gradient(${editor.gradientDirection || "135deg"}, ${editor.gradientColors[0]}, ${editor.gradientColors[1]})`,
		};
	}
	if (editor.bgMode === "solid") {
		return { backgroundColor: editor.solidColor };
	}
	return {};
}
