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
	const fallbackStyle = buildBgStyle({ ...editor, bgMode: "gradient" });

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
			onError={(e) => {
				e.currentTarget.src = "";
				setImageFailed(true);
			}}
		/>
	);
}
