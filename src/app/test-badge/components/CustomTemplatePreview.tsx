"use client";

import React from "react";
import Image from "next/image";
import { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";
import {
	Template1,
	Template4,
	Template4Left,
	Template4Right,
	Template5,
	Template7,
	Template9,
	Template3,
} from "../../(dashboard)/create-badges/customize/components/customizable-svgs";
import PlaceholderLogo from "./placeholder-logo";
import { getPalette } from "@/app/features/templates/lib/palette-mapping";
import { FONTS } from "@/app/(dashboard)/components/customize/constants";

interface TemplateLayoutProps {
	editor: CustomizeEditorState;
	participantPhotoUrl?: string | null;
	baseColor?: string;
	fontStyle?: React.CSSProperties;
}

// Placeholder for Template 1 Layout
export function Layout1({
	editor,
	participantPhotoUrl,
	baseColor,
	fontStyle,
}: TemplateLayoutProps) {
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			<Template1
				className="w-full h-full"
				editor={editor}
				baseColor={baseColor}
			/>
			<div className="w-30 h-26.5 left-[32.5px] bg-rose-600 absolute top-17 rounded-full flex justify-center items-center text-white text-[10px] text-center overflow-hidden">
				{participantPhotoUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={participantPhotoUrl}
						alt="Participant"
						className="w-full h-full object-cover"
					/>
				) : (
					<span className="px-2">
						{editor.allowParticipantPhoto ? "Profile Photo" : ""}
					</span>
				)}
			</div>
			<div className="absolute top-45 px-8 w-full">
				<h2 className="text-6xl font-normal uppercase text-black  tracking-tight font-league-gothic leading-[0.85]">
					{editor.participantNameVisible
						? editor.participantNamePlaceholder || "Your full name"
						: ""}
				</h2>
				<p className="text-md text-black/80 mt-2">
					{editor.roleTitleVisible
						? editor.roleTitlePlaceholder || "Product Designer"
						: ""}
				</p>
			</div>
			<div className="absolute bottom-5 w-full text-right px-6">
				<p
					style={fontStyle}
					className="text-xl font-normal text-stone-300 font-league-gothic"
				>
					{editor.eventName || "#DesignWeekLagos"}
				</p>
			</div>
		</div>
	);
}

// Placeholder for Template 9 Layout
export function Layout9({
	editor,
	participantPhotoUrl,
	baseColor,
	fontStyle,
}: TemplateLayoutProps) {
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px] text-white">
			<Template9 className="w-full h-full" editor={editor} baseColor={baseColor} />
			<div className="absolute w-full h-full top-0 py-8">
				<div className="flex border-white  justify-between items-start px-8">
					{" "}
					<LogoPlaceholder
						isHidden={!editor.logo}
						logoPreviewUrl={editor.logoPreviewUrl}
					/>
					<div
						style={fontStyle}
						className="text-xs font-bold uppercase tracking-widest"
					>
						{editor.eventName || "Event Name"}
					</div>
				</div>

				<div className="px-8 my-6">
					<h2 className="text-3xl font-bold uppercase">
						{editor.participantNameVisible ? (editor.participantNamePlaceholder || "Your full name") : ""}
					</h2>
					<p className="text-base opacity-90">
						{editor.roleTitleVisible ? (editor.roleTitlePlaceholder || "Product designer") : ""}
					</p>
				</div>
				<div className="bg-zinc-300 absolute bottom-8 w-35 h-35 right-10 rotate-10 flex items-center justify-center text-black text-[10px] overflow-hidden">
					{participantPhotoUrl ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={participantPhotoUrl}
							alt="Participant"
							className="w-full h-full object-cover"
						/>
					) : editor.allowParticipantPhoto ? (
						"PHOTO"
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}

// Placeholder for Template 4 Layout
export function Layout4({
	editor,
	participantPhotoUrl,
	baseColor,
	fontStyle,
}: TemplateLayoutProps) {
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			<Template4 className="w-full h-full" editor={editor} baseColor={baseColor} />
			<div className="absolute top-[22%] left-0 w-full h-[60%] flex">
				{" "}
				<Template4Left />
				<Template4Right />
			</div>

			{/*This div below will be rendered as a placeholder if the chosen badge as a space for organizer logo */}
			<div className="h-[77%] w-full absolute top-0">
				<LogoPlaceholder
					isHidden={!editor.logo}
					className="mt-12 mb-6  w-full"
					logoPreviewUrl={editor.logoPreviewUrl}
				/>
				<div className="w-35 h-35 rounded-full bg-white mx-auto flex items-center justify-center text-black text-[10px] overflow-hidden">
					{participantPhotoUrl ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={participantPhotoUrl}
							alt="Participant"
							className="w-full h-full object-cover"
						/>
					) : editor.allowParticipantPhoto ? (
						"PHOTO"
					) : (
						""
					)}
				</div>
			</div>

			<div className="absolute bottom-0 h-[23%] w-full pl-12 text-black">
				<h2 style={fontStyle} className="text-xl mt-4 font-bold uppercase">
					{editor.participantNameVisible ? (editor.participantNamePlaceholder || "Your full name") : ""}
				</h2>
				<p className="text-sm opacity-80">
					{editor.roleTitleVisible ? (editor.roleTitlePlaceholder || "Product designer") : ""}
				</p>
			</div>
		</div>
	);
}

export function LogoPlaceholder({
	isHidden,
	className,
	logoPreviewUrl,
}: {
	isHidden: boolean;
	className?: string;
	logoPreviewUrl?: string | null;
}) {
	return (
		<div
			className={`flex gap-2 items-center justify-center text-white  ${className}`}
		>
			<div className="w-10 h-10 flex items-center justify-center overflow-hidden relative">
				{logoPreviewUrl ? (
					<Image
						src={logoPreviewUrl}
						alt="Logo"
						fill
						className="object-contain"
					/>
				) : (
					<PlaceholderLogo />
				)}
			</div>
			{!logoPreviewUrl && (
				<span
					className={`text-sm flex flex-col gap-0 ${isHidden ? "hidden" : "block"}`}
				>
					<span className="leading-none">YOUR</span>{" "}
					<span className="leading-none">LOGO</span>
				</span>
			)}
		</div>
	);
}
// Placeholder for Template 5 Layout
export function Layout5({ editor }: TemplateLayoutProps) {
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			<Template5 className="w-full h-full" editor={editor} />
			<div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
				<h2 className="text-3xl font-black text-white uppercase italic mb-4">
					{editor.eventName || "SUMMIT"}
				</h2>
				<div className="w-20 h-1 bg-white mb-6" />
				<p className="text-xl font-bold text-white/90">
					{editor.participantNameVisible ? (editor.participantNamePlaceholder || "Attendee") : ""}
				</p>
			</div>
		</div>
	);
}

// Placeholder for Template 7 Layout
export function Layout7({
	editor,
	participantPhotoUrl,
	baseColor,
	fontStyle,
}: TemplateLayoutProps) {
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px] text-white">
			<Template7 className="w-full h-full" editor={editor} baseColor={baseColor} />
			<div className="absolute w-full h-full top-0 py-8">
				<div className="flex border-white  justify-between items-start px-8">
					{" "}
					<LogoPlaceholder
						isHidden={!editor.logo}
						logoPreviewUrl={editor.logoPreviewUrl}
					/>
					<div
						style={fontStyle}
						className="text-xs font-bold uppercase tracking-widest text-right"
					>
						{editor.eventName || "Event Name"}
					</div>
				</div>

				<div className="px-8 my-6 min-h-20">
					<h2 className="text-3xl font-bold uppercase">
						{editor.participantNameVisible ? (editor.participantNamePlaceholder || "Your full name") : ""}
					</h2>
					<p className="text-base opacity-90">
						{editor.roleTitleVisible ? (editor.roleTitlePlaceholder || "Product designer") : ""}
					</p>
				</div>
				<div className="bg-white w-[80%] h-45 rounded-t-sm rounded-b-2xl mx-auto flex items-center justify-center text-black text-[10px] overflow-hidden">
					{participantPhotoUrl ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={participantPhotoUrl}
							alt="Participant"
							className="w-full h-full object-cover"
						/>
					) : editor.allowParticipantPhoto ? (
						"PHOTO"
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}

export function Layout3({ editor }: TemplateLayoutProps) {
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px] text-black">
			<Template3 className="w-full h-full" editor={editor} />
			<div className="absolute w-full h-full top-0 py-8">
				<div className="flex border-black  justify-between items-start px-8">
					{" "}
					<LogoPlaceholder isHidden={true} />
					<div>Event Name</div>
				</div>

				<div className="px-8 my-6">
					<h2 className="text-3xl">
						{editor.participantNameVisible ? (editor.participantNamePlaceholder || "Sandra Robinson") : ""}
					</h2>
					<p className="text-base">
						{editor.roleTitleVisible ? (editor.roleTitlePlaceholder || "Product designer") : ""}
					</p>
				</div>
				<div className="bg-black w-[80%] h-45 rounded-t-sm rounded-b-2xl mx-auto"></div>
			</div>
		</div>
	);
}

const LAYOUT_COMPONENTS: Record<
	string,
	React.ComponentType<TemplateLayoutProps>
> = {
	bold_name_pink_v1: Layout1,
	circle_photo_dark_v1: Layout4,
	dark_name_photo_v1: Layout7,
	split_purple_teal_v1: Layout9,
};

interface CustomTemplatePreviewProps {
	templateId: string;
	editor: CustomizeEditorState;
	participantPhotoUrl?: string | null;
	badgeRef?: React.RefObject<HTMLDivElement | null>;
}

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
		<div className="w-full max-w-79.5 h-106 shadow-2xl mx-auto" ref={badgeRef}>
			<LayoutComponent
				editor={editor}
				participantPhotoUrl={participantPhotoUrl}
				baseColor={baseColor}
				fontStyle={font.style}
			/>
		</div>
	);
}
