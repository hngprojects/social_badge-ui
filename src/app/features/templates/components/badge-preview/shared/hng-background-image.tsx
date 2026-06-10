"use client";

import { useState } from "react";
import type { CustomizeEditorState } from "../../../types/canvas-data";
import { buildBgStyle } from "../utils";

export function HngBackgroundImage({
	src,
	editor,
}: {
	src: string;
	editor: CustomizeEditorState;
}) {
	const [imageFailed, setImageFailed] = useState(false);
	const hasValidGradient =
		Array.isArray(editor.gradientColors) && editor.gradientColors.length >= 2;
	const fallbackStyle = hasValidGradient
		? buildBgStyle({ ...editor, bgMode: "gradient" })
		: buildBgStyle({
				...editor,
				bgMode: "solid",
				solidColor: editor.solidColor || "#1a1a1a",
			});

	if (imageFailed) {
		return (
			<div
				className="absolute inset-0 w-full h-full"
				style={fallbackStyle}
				aria-hidden
			/>
		);
	}

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={src}
			alt=""
			className="absolute inset-0 w-full h-full object-cover"
			onLoad={() => setImageFailed(false)}
			onError={() => setImageFailed(true)}
		/>
	);
}
