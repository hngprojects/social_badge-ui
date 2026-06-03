"use client";

import React, { useMemo } from "react";
import { SectionCard, HelperText } from "./ui";
import { FONTS, SIZES } from "./constants";
import { EDITOR_PALETTES } from "@/app/features/templates/lib/palette-mapping";
import type { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";
import type { LayoutCapabilities } from "@/app/features/templates/constants/layout-mapping";

import type { UseFormRegister } from "react-hook-form";
import type { CustomizeBadgeSchema } from "@/schemas/template";

interface StyleSectionProps {
	register: UseFormRegister<CustomizeBadgeSchema>;
	editor: CustomizeEditorState;
	onChange: (partial: Partial<CustomizeEditorState>) => void;
	onPaletteChange: (paletteId: string) => void;
	onBgModeChange: (mode: "gradient" | "solid") => void;
	layoutCaps: LayoutCapabilities;
}

export function StyleSection({
	register,
	editor,
	onChange,
	onPaletteChange,
	onBgModeChange,
	layoutCaps,
}: StyleSectionProps) {
	const sortedPalettes = useMemo(() => {
		const defaultPalette = EDITOR_PALETTES.find((p) => p.id === layoutCaps.defaultPaletteId) ?? EDITOR_PALETTES[0];
		const others = EDITOR_PALETTES.filter((p) => p.id !== defaultPalette.id);
		return [defaultPalette, ...others];
	}, [layoutCaps.defaultPaletteId]);

	return (
		<SectionCard
			icon={
				<svg
					viewBox="0 0 20 20"
					fill="none"
					className="w-4 h-4"
					stroke="currentColor"
					strokeWidth={1.6}
				>
					<circle cx="10" cy="10" r="2" />
					<path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.22 5.22l1.42 1.42M13.36 13.36l1.42 1.42M5.22 14.78l1.42-1.42M13.36 6.64l1.42-1.42" />
				</svg>
			}
			title="Style"
			subtitle="Colour, typography, and visual feel."
		>
			<div>
				<p className="text-sm font-medium text-gray-800 mb-2">Background</p>
				<div className="flex rounded-lg border border-gray-200 overflow-hidden items-center px-1.5 gap-2 h-11.5">
					{(["solid", "gradient"] as const).map((mode) => (
						<button
							key={mode}
							type="button"
							onClick={() => onBgModeChange(mode)}
							className={`flex-1 flex bg-[#EEEEEE] rounded-sm h-9 items-center justify-center gap-2 py-2 text-sm font-medium transition ${
								editor.bgMode === mode
									? "bg-white text-gray-900 shadow-md"
									: "bg-gray-50 text-gray-400 hover:text-gray-600"
							}`}
						>
							<span
								className="w-3 h-3 rounded-sm inline-block"
								style={
									mode === "gradient"
										? {
												background: `linear-gradient(135deg, ${editor.gradientColors[0]}, ${editor.gradientColors[1]})`,
											}
										: { background: editor.solidColor }
								}
							/>
							{mode.charAt(0).toUpperCase() + mode.slice(1)}
						</button>
					))}
				</div>
			</div>

			<div>
				<div className="flex items-center gap-2 flex-wrap">
					{sortedPalettes.map((p) => (
						<button
							key={p.id}
							type="button"
							onClick={() => onPaletteChange(p.id)}
							className={`w-9 h-9 rounded-md flex items-center justify-center transition-transform ${
								editor.paletteId === p.id
									? "ring-2 ring-offset-2 ring-black scale-110"
									: "hover:scale-105"
							}`}
							style={{
								background:
									editor.bgMode === "gradient"
										? `linear-gradient(135deg, ${p.from}, ${p.to})`
										: p.from,
							}}
						>
							{editor.paletteId === p.id && (
								<svg
									className="w-4 h-4 text-white drop-shadow"
									fill="none"
									viewBox="0 0 16 16"
									stroke="currentColor"
									strokeWidth={2.5}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 8l3.5 3.5L13 5"
									/>
								</svg>
							)}
						</button>
					))}
				</div>
				<HelperText>
					Pick from curated palettes designed for high-contrast share posts.
				</HelperText>
			</div>

			<div>
				<p className="text-sm font-medium text-gray-800 mb-2">Title font</p>
				<div className="grid grid-cols-2 gap-2">
					{FONTS.map((f) => (
						<button
							key={f.id}
							type="button"
							onClick={() => onChange({ fontId: f.id })}
							className={`rounded-xl border px-4 py-3 text-left transition ${
								editor.fontId === f.id
									? "border-orange-400 ring-1 ring-orange-400 bg-orange-50"
									: "border-gray-200 hover:border-gray-300 bg-white"
							}`}
						>
							<span
								className="block text-xl text-gray-900 truncate"
								style={f.style}
							>
								{editor.eventName || "Achieveher"}
							</span>
							<span className="block text-[10px] font-semibold tracking-widest text-gray-400 mt-1">
								{f.label}
							</span>
						</button>
					))}
				</div>
			</div>
		</SectionCard>
	);
}
