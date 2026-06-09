"use client";

import React, { useMemo, useState } from "react";
import { SectionCard, HelperText } from "./ui";
import { FONTS } from "./constants";
import { EDITOR_PALETTES } from "@/app/features/templates/lib/palette-mapping";
import type { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";
import type { LayoutCapabilities } from "@/app/features/templates/constants/layout-mapping";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { paletteToBackgroundState } from "@/app/features/templates/lib/build-canvas-data";

import { Switch } from "@/components/ui/switch";

interface StyleSectionProps {
	editor: CustomizeEditorState;
	onChange: (partial: Partial<CustomizeEditorState>) => void;
	onPaletteChange: (paletteId: string) => void;
	onBgModeChange: (mode: "gradient" | "solid" | "image") => void;
	layoutCaps: LayoutCapabilities;
}

export function StyleSection({
	editor,
	onChange,
	onPaletteChange,
	onBgModeChange,
	layoutCaps,
}: StyleSectionProps) {
	const [activeTab, setActiveTab] = useState("background");
	const isHngLayout = editor.layoutId.startsWith("hng_finalist_");

	const sortedPalettes = useMemo(() => {
		let currentMode: "gradient" | "solid" | "image" = "solid";
		if (activeTab === "background") {
			currentMode = editor.bgMode === "split" ? (editor.priBgMode ?? "solid") : (editor.bgMode === "image" ? "solid" : editor.bgMode);
		}
		else if (activeTab === "secondary") currentMode = editor.secBgMode ?? "solid";
		else if (activeTab === "text") currentMode = "solid";
		
		const filtered = EDITOR_PALETTES.filter((p) => {
			if (currentMode === "gradient") return p.from !== p.to;
			return p.from === p.to;
		});

		const defaultPaletteId = layoutCaps.defaultPaletteId;
		const defaultPalette =
			filtered.find((p) => p.id === defaultPaletteId) ?? filtered[0];
		if (!defaultPalette) return filtered;

		const others = filtered.filter((p) => p.id !== defaultPalette.id);
		return [defaultPalette, ...others];
	}, [layoutCaps.defaultPaletteId, editor.bgMode, editor.priBgMode, editor.secBgMode, activeTab]);

	const renderModeSwitcher = (
		mode: "gradient" | "solid" | "image",
		onModeChange: (m: "gradient" | "solid") => void,
		primaryColor: string,
		gradientColors: [string, string],
	) => (
		<div className="flex rounded-lg border border-gray-200 overflow-hidden items-center px-1.5 gap-2 h-11.5">
			{(["solid", "gradient"] as const).map((m) => (
				<button
					key={m}
					type="button"
					onClick={() => onModeChange(m)}
					className={`flex-1 flex bg-[#EEEEEE] rounded-sm h-9 items-center justify-center gap-2 py-2 text-sm font-medium transition ${
						mode === m
							? "bg-white text-gray-900 shadow-md"
							: "bg-gray-50 text-gray-400 hover:text-gray-600"
					}`}
				>
					<span
						className="w-3 h-3 rounded-sm inline-block"
						style={
							m === "gradient"
								? {
										background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
									}
								: { background: primaryColor }
						}
					/>
					{m.charAt(0).toUpperCase() + m.slice(1)}
				</button>
			))}
		</div>
	);

	const renderPaletteGrid = (
		activeValue: string,
		currentMode: "gradient" | "solid" | "image",
		onSelect: (id: string) => void,
		compareBy: "id" | "color" = "id",
	) => (
		<div className="flex items-center gap-2 flex-wrap">
			{sortedPalettes.map((p) => {
				const isSelected = compareBy === "id" 
					? activeValue === p.id 
					: activeValue?.toLowerCase() === p.from.toLowerCase();

				return (
					<button
						key={p.id}
						type="button"
						onClick={() => onSelect(p.id)}
						className={`w-9 h-9 rounded-md flex items-center justify-center transition-transform ${
							isSelected
								? "ring-2 ring-offset-2 ring-black scale-110"
								: "hover:scale-105"
						}`}
						style={{
							background:
								currentMode === "gradient"
									? `linear-gradient(135deg, ${p.from}, ${p.to})`
									: p.from,
						}}
					>
						{isSelected && (
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
				);
			})}
		</div>
	);

	const handleSecModeChange = (mode: "gradient" | "solid") => {
		const paletteState = paletteToBackgroundState(editor.secPaletteId ?? editor.paletteId, mode);
		onChange({
			secBgMode: mode,
			secPaletteId: paletteState.paletteId,
			secGradientColors: paletteState.gradientColors,
			secSolidColor: paletteState.solidColor,
		});
	};

	const handleSecPaletteChange = (id: string) => {
		const paletteState = paletteToBackgroundState(id, editor.secBgMode ?? "solid");
		onChange({
			secPaletteId: id,
			secGradientColors: paletteState.gradientColors,
			secSolidColor: paletteState.solidColor,
		});
	};

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
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className={`grid w-full ${editor.isSplit ? "grid-cols-3" : "grid-cols-2"} mb-6`}>
					<TabsTrigger value="background">Background</TabsTrigger>
					{editor.isSplit && <TabsTrigger value="secondary">Secondary</TabsTrigger>}
					<TabsTrigger value="text">Text Color</TabsTrigger>
				</TabsList>

				<TabsContent value="background" className="space-y-6">
					{isHngLayout && (
						<div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
							<div className="space-y-0.5">
								<p className="text-sm font-semibold text-gray-900">
									Custom Background Colors
								</p>
								<p className="text-[11px] text-gray-500">
									Enable to use solid or gradient colors instead of the design asset.
								</p>
							</div>
							<Switch
								checked={editor.bgMode !== "image"}
								onCheckedChange={(checked) => {
									onBgModeChange(checked ? "solid" : "image");
								}}
							/>
						</div>
					)}

					{editor.bgMode !== "image" && (
						<>
							<div>
								<p className="text-sm font-medium text-gray-800 mb-2">
									Background Mode
								</p>
								{renderModeSwitcher(
									editor.bgMode === "split" ? (editor.priBgMode ?? "solid") : (editor.bgMode as any),
									onBgModeChange,
									editor.solidColor,
									editor.gradientColors,
								)}
							</div>

							<div>
								{renderPaletteGrid(
									editor.paletteId,
									editor.bgMode === "split" ? "solid" : (editor.bgMode as any),
									onPaletteChange,
									"id"
								)}
								<HelperText>
									Pick from curated palettes designed for high-contrast share
									posts.
								</HelperText>
							</div>
						</>
					)}
					{editor.bgMode === "image" && (
						<div className="py-2">
							<HelperText>
								Currently using the default HNG finalist background asset.
							</HelperText>
						</div>
					)}
				</TabsContent>

				{editor.isSplit && (
					<TabsContent value="secondary" className="space-y-6">
						<div>
							<p className="text-sm font-medium text-gray-800 mb-2">
								Secondary Mode
							</p>
							{renderModeSwitcher(
								editor.secBgMode ?? "solid",
								handleSecModeChange,
								editor.secSolidColor ?? editor.solidColor,
								editor.secGradientColors ?? editor.gradientColors,
							)}
						</div>
						<div>
							{renderPaletteGrid(
								editor.secPaletteId ?? editor.paletteId,
								editor.secBgMode ?? "solid",
								handleSecPaletteChange,
								"id"
							)}
							<HelperText>
								Controls the color of the second half of the split background.
							</HelperText>
						</div>
					</TabsContent>
				)}

				<TabsContent value="text" className="space-y-6">
					<div>
						<p className="text-sm font-medium text-gray-800 mb-2">Text Color</p>
						{renderPaletteGrid(editor.textColor || "#000000", "solid", (id) => {
							const p = EDITOR_PALETTES.find((pal) => pal.id === id);
							if (p) onChange({ textColor: p.from });
						}, "color")}
						<HelperText>Customize the readability of your badge text.</HelperText>
					</div>
				</TabsContent>
			</Tabs>

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
