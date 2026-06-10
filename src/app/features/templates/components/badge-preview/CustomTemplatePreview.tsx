"use client";

import { FONTS } from "@/app/(dashboard)/components/customize/constants";
import { getPalette } from "../../lib/palette-mapping";
import { LAYOUT_COMPONENTS } from "./layout-registry";
import type { CustomTemplatePreviewProps } from "./types";

export function CustomTemplatePreview({
	templateId,
	editor,
	participantPhotoUrl,
	badgeRef,
}: CustomTemplatePreviewProps) {
	const LayoutComponent = LAYOUT_COMPONENTS[templateId];

	const palette = getPalette(editor.paletteId);
	const baseColor = palette.from;
	const font = FONTS.find((f) => f.id === editor.fontId) ?? FONTS[0];

	if (!LayoutComponent) {
		return (
			<div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-[18px] border-2 border-dashed border-gray-300">
				<p className="text-gray-400 text-sm font-medium text-center px-6">
					No custom layout component found for <br />
					<span className="font-mono text-xs">{templateId}</span>
				</p>
			</div>
		);
	}

	return (
		<div className="mx-auto h-112.75 w-full max-w-79.5">
			<LayoutComponent
				editor={editor}
				participantPhotoUrl={participantPhotoUrl}
				baseColor={baseColor}
				fontStyle={font.style}
				textColor={editor.textColor}
				badgeRef={badgeRef}
			/>
		</div>
	);
}
