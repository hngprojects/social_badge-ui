"use client";

import React from "react";
import type { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";
import { CustomTemplatePreview } from "@/app/test-badge/components/CustomTemplatePreview";

interface LivePreviewProps {
	editor: CustomizeEditorState;
	shareCaption?: string;
	participantPhotoUrl?: string | null;
	badgeRef?: React.RefObject<HTMLDivElement | null>;
	hideExtras?: boolean;
	badgeClassName?: string;
}

export function LivePreview({
	editor,
	shareCaption,
	participantPhotoUrl,
	badgeRef,
	hideExtras,
	badgeClassName,
}: LivePreviewProps) {
	return (
		<div className="space-y-3">
			{!hideExtras && (
				<div className="flex items-center gap-1.5 px-1">
					<span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
					<span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
						Live Preview
					</span>
				</div>
			)}

			<div className={hideExtras ? "" : " rounded-2xl bg-orange-50 p-5"}>
				<div
					className={`mx-auto ${badgeClassName && "w-full max-w-full h-152 flex flex-col items-center justify-center"}`}
					ref={badgeRef}
				>
					<CustomTemplatePreview
						templateId={editor.layoutId}
						editor={editor}
						participantPhotoUrl={participantPhotoUrl}
					/>
				</div>
			</div>

			{!hideExtras && (
				<div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-4 py-4 space-y-2">
					<p className="text-sm font-semibold text-gray-900 leading-tight">
						Caption preview
					</p>
					<p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
						{shareCaption || editor.defaultCaption || (
							<>
								I&apos;m at #{editor.hashtags[0] ?? "Summit26"} this weekend —
								who&apos;s joining?
							</>
						)}
					</p>
				</div>
			)}
		</div>
	);
}
