"use client";

import React, { useState } from "react";
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
import BadgeSvg, { FivePercent } from "./badge-svg";

const HNG_ASSETS = {
	backgrounds: {
		dev: "/assets/badges/hng_bg_two.webp",
		pm: "/assets/badges/hng_bg_four.webp",
		default: "/assets/badges/hng_bg_three.webp",
		design: "/assets/badges/hng_bg_one.webp",
		flaretag: "/assets/badges/hng_bg_five.webp",
	},
	logos: {
		blue: "/assets/badges/hng_logo_blue.svg",
		white: "/assets/badges/hng_logo_white.svg",
		black: "/assets/badges/hng_logo_black.svg",
		orange: "/assets/badges/hng_logo_orange.svg",
	},
	decorations: {
		confetti: "/assets/badges/coffetti.webp",
	},
} as const;

const HNG_LAYOUT_IDS = new Set([
	"hng_finalist_design_v1",
	"hng_finalist_dev_v1",
	"hng_finalist_pm_v1",
	"hng_finalist_flaretag_v1",
	"hng_finalist_v1",
]);

function isHngLayout(layoutId: string): boolean {
	return HNG_LAYOUT_IDS.has(layoutId);
}

interface TemplateLayoutProps {
	editor: CustomizeEditorState;
	participantPhotoUrl?: string | null;
	baseColor?: string;
	fontStyle?: React.CSSProperties;
	textColor?: string;
}

function buildBgStyle(editor: CustomizeEditorState): React.CSSProperties {
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

function HngBackgroundImage({
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

// Placeholder for Template 1 Layout
export function Layout1({
	editor,
	participantPhotoUrl,
	baseColor,
	fontStyle,
	textColor,
}: TemplateLayoutProps) {
	const textStyle = textColor ? { color: textColor } : {};
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			<Template1
				className="w-full h-full"
				editor={editor}
				baseColor={baseColor}
			/>
			<div className="w-30 h-26.5 left-8.5 bg-rose-600 absolute top-20 rounded-full flex justify-center items-center text-white text-[10px] text-center overflow-hidden">
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
			<div className="absolute top-48 px-8 w-full">
				<h2
					style={textStyle}
					className="text-6xl font-normal uppercase text-black  tracking-tight font-league-gothic leading-[0.85]"
				>
					{editor.participantNameVisible
						? editor.participantNamePlaceholder || "Your full name"
						: ""}
				</h2>
				<p style={textStyle} className="text-md text-black/80 mt-2">
					{editor.roleTitleVisible
						? editor.roleTitlePlaceholder || "Product Designer"
						: ""}
				</p>
			</div>
			<div className="absolute bottom-8.5 w-full text-right px-6">
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
	textColor,
}: TemplateLayoutProps) {
	const textStyle = textColor ? { color: textColor } : {};
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px] text-white">
			<Template9
				className="w-full h-full"
				editor={editor}
				baseColor={baseColor}
			/>
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

				<div className="px-8 my-6">
					<h2 style={textStyle} className="text-3xl font-bold uppercase">
						{editor.participantNameVisible
							? editor.participantNamePlaceholder || "Your full name"
							: ""}
					</h2>
					<p style={textStyle}>
						{editor.roleTitleVisible
							? editor.roleTitlePlaceholder || "Product designer"
							: ""}
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
	textColor,
}: TemplateLayoutProps) {
	const textStyle = textColor ? { color: textColor } : {};
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px] border">
			<Template4
				className="w-full h-full"
				editor={editor}
				baseColor={baseColor}
			/>
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
				<h2
					style={{ ...fontStyle, ...textStyle }}
					className="text-xl mt-4 font-bold uppercase"
				>
					{editor.participantNameVisible
						? editor.participantNamePlaceholder || "Your full name"
						: ""}
				</h2>
				<p style={textStyle} className="text-sm opacity-80">
					{editor.roleTitleVisible
						? editor.roleTitlePlaceholder || "Product designer"
						: ""}
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
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={logoPreviewUrl}
						alt="Logo"
						className="object-contain w-full h-full"
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
export function Layout5({ editor, textColor }: TemplateLayoutProps) {
	const textStyle = textColor ? { color: textColor } : {};
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			<Template5 className="w-full h-full" editor={editor} />
			<div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
				<h2 className="text-3xl font-black text-white uppercase italic mb-4">
					{editor.eventName || "SUMMIT"}
				</h2>
				<div className="w-20 h-1 bg-white mb-6" />
				<p style={textStyle} className="text-xl font-bold text-white/90">
					{editor.participantNameVisible
						? editor.participantNamePlaceholder || "Attendee"
						: ""}
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
	textColor,
}: TemplateLayoutProps) {
	const textStyle = textColor ? { color: textColor } : {};
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px] text-white">
			<Template7
				className="w-full h-full"
				editor={editor}
				baseColor={baseColor}
			/>
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
					<h2 style={textStyle} className="text-3xl font-bold uppercase">
						{editor.participantNameVisible
							? editor.participantNamePlaceholder || "Your full name"
							: ""}
					</h2>
					<p style={textStyle} className="text-base opacity-90">
						{editor.roleTitleVisible
							? editor.roleTitlePlaceholder || "Product designer"
							: ""}
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

export function Layout3({ editor, textColor }: TemplateLayoutProps) {
	const textStyle = textColor ? { color: textColor } : {};
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
					<h2 style={textStyle} className="text-3xl">
						{editor.participantNameVisible
							? editor.participantNamePlaceholder || "Sandra Robinson"
							: ""}
					</h2>
					<p style={textStyle} className="text-base">
						{editor.roleTitleVisible
							? editor.roleTitlePlaceholder || "Product designer"
							: ""}
					</p>
				</div>
				<div className="bg-black w-[80%] h-45 rounded-t-sm rounded-b-2xl mx-auto"></div>
			</div>
		</div>
	);
}




{/*Hng finalist badges */}



export function LayoutCard1({ editor, textColor, participantPhotoUrl }: TemplateLayoutProps) {
	const bgStyle = buildBgStyle(editor);

	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			{editor.bgMode === "image" && (
				<HngBackgroundImage
					key={HNG_ASSETS.backgrounds.dev}
					src={HNG_ASSETS.backgrounds.dev}
					editor={editor}
				/>
			)}
			<div
				className="relative z-10 w-full h-full flex flex-col justify-center text-white font-bricolage"
				style={bgStyle}
			>
				<Coffetti />
				<InnerBadgeLayout
					editor={editor}
					headingTextColor="#00AEFF"
					roleBgColor="#00AEFF"
					nameTextColor={textColor || "#000000"}
					roleTextColor={textColor}
					svgFill="text-[#00AEFF]"
					percentIConFill="text-white"
					participantPhotoUrl={participantPhotoUrl}
					logoUrl={HNG_ASSETS.logos.blue}
				/>
			</div>
		</div>
	);
}

export function InnerBadgeLayout({
	editor,
	nameTextColor,
	roleTextColor,
	headingTextColor,
	roleBgColor,
	svgFill,
	percentIConFill,
	participantPhotoUrl,
	logoUrl,
	roleBorderColor
}: {
	editor: CustomizeEditorState;
	nameTextColor?: string;
	roleTextColor?: string;
	headingTextColor?: string;
	roleBgColor?: string;
	svgFill?: string;
	percentIConFill?: string;
	participantPhotoUrl?: string | null;
	logoUrl?: string;
	roleBorderColor?: string;
}) {
	const isHng = isHngLayout(editor.layoutId);
	const badgeTitle = isHng ? editor.badgeTitle || "Finalist" : "Finalist";
	const trackValue = isHng
		? editor.trackVisible === true
			? editor.trackPlaceholder || "Virtual Assistant"
			: ""
		: editor.roleTitleVisible === true
			? editor.roleTitlePlaceholder || "Virtual Assistant"
			: "";

	return (
		<div className="z-10 h-[80%] w-[73%] min-w-70 min-h-99 mx-auto flex flex-col gap-[3.5%] relative">
			<div className="flex justify-center items-center h-10 w-full overflow-hidden">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={editor.logoPreviewUrl || logoUrl}
					alt="badge logo"
					className="max-h-full max-w-full object-contain"
				/>
			</div>
			<div className="flex flex-col justify-center text-center w-60 mx-auto">
				<span
					className="font-bricolage text-[53px] leading-none font-bold -mb-2.5 tracking-tighter"
					style={{ color: headingTextColor }}
				>
					{badgeTitle}
				</span>

				{trackValue && (
					<span
						className="w-full border-4 border-white mx-auto rounded-full py-1.5 px-2 font-semibold"
						style={{
							backgroundColor: roleBgColor,
							color: roleTextColor,
							borderColor: roleBorderColor,
						}}
					>
						{trackValue}
					</span>
				)}
			</div>

			<div className="relative border-5 rounded-4xl min-h-53 flex justify-center items-center w-60 h-[40%] mx-auto bg-[#ECF5D6] border-white">
				<div className="w-full h-full flex justify-center items-center rounded-4xl overflow-hidden text-black">
					{participantPhotoUrl ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={participantPhotoUrl}
							alt="Participant"
							className="w-full h-full object-cover"
						/>
					) : editor.allowParticipantPhoto ? (
						"Photo"
					) : (
						""
					)}
				</div>
				<div className="absolute -bottom-6 -right-7 w-20 h-20 flex justify-center items-center">
					<BadgeSvg className={svgFill} />
					<span className="absolute flex flex-col justify-center items-center font-semibold">
						<FivePercent className={percentIConFill} />
					</span>
				</div>
			</div>

			<div className="text-center -mt-2">
				<span
					className="font-bricolage text-[24px] font-semibold"
					style={{ color: nameTextColor }}
				>
					{editor.participantNameVisible
						? editor.participantNamePlaceholder || "John Jane Josh Doe"
						: ""}
				</span>
			</div>
		</div>
	);
}

export function LayoutCard2({ editor, textColor, participantPhotoUrl }: TemplateLayoutProps) {
	const bgStyle = buildBgStyle(editor);

	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			{editor.bgMode === "image" && (
				<HngBackgroundImage
					key={HNG_ASSETS.backgrounds.pm}
					src={HNG_ASSETS.backgrounds.pm}
					editor={editor}
				/>
			)}
			<div
				className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white font-bricolage"
				style={bgStyle}
			>
				<Coffetti />
				<InnerBadgeLayout
					editor={editor}
					roleBgColor="#00AEFF"
					headingTextColor="#00AEFF"
					nameTextColor={textColor || "#000000"}
					roleTextColor={textColor}
					svgFill="text-[#00AEFF]"
					percentIConFill="text-white"
					participantPhotoUrl={participantPhotoUrl}
					logoUrl={HNG_ASSETS.logos.blue}
				/>
			</div>
		</div>
	);
}
export function Coffetti() {
	return (
		<div className="z-1 absolute w-full h-1/2 top-0 overflow-hidden pointer-events-none">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={HNG_ASSETS.decorations.confetti}
				width={100}
				height={100}
				alt="badge logo"
				className="w-[200%] rotate-15"
			/>
		</div>
	);
}
export function LayoutCard3({ editor, textColor, participantPhotoUrl }: TemplateLayoutProps) {
	const bgStyle = buildBgStyle(editor);

	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			{editor.bgMode === "image" && (
				<HngBackgroundImage
					key={HNG_ASSETS.backgrounds.default}
					src={HNG_ASSETS.backgrounds.default}
					editor={editor}
				/>
			)}
			<div
				className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white font-bricolage"
				style={bgStyle}
			>
				<Coffetti />
				<InnerBadgeLayout
					editor={editor}
					roleBgColor="#AFF47F"
					nameTextColor={textColor || "#ffffff"}
					roleTextColor={textColor || "#000000"}
					participantPhotoUrl={participantPhotoUrl}
					logoUrl={HNG_ASSETS.logos.white}
				/>
			</div>
		</div>
	);
}

export function LayoutCard4({ editor, textColor, participantPhotoUrl }: TemplateLayoutProps) {
	const bgStyle = buildBgStyle(editor);

	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			{editor.bgMode === "image" && (
				<HngBackgroundImage
					key={HNG_ASSETS.backgrounds.design}
					src={HNG_ASSETS.backgrounds.design}
					editor={editor}
				/>
			)}
			<div
				className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white font-bricolage"
				style={bgStyle}
			>
				<Coffetti />
				<InnerBadgeLayout
					editor={editor}
					headingTextColor="#7E65EC"
					roleBgColor="#AFF47F"
					nameTextColor={textColor}
					roleTextColor={textColor || "#000000"}
					participantPhotoUrl={participantPhotoUrl}
					logoUrl={HNG_ASSETS.logos.black}
				/>
			</div>
		</div>
	);
}
export function LayoutCard5({ editor, textColor, participantPhotoUrl }: TemplateLayoutProps) {
	const bgStyle = buildBgStyle(editor);

	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			{editor.bgMode === "image" && (
				<HngBackgroundImage
					key={HNG_ASSETS.backgrounds.flaretag}
					src={HNG_ASSETS.backgrounds.flaretag}
					editor={editor}
				/>
			)}
			<div
				className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white font-bricolage"
				style={bgStyle}
			>
				<Coffetti />
				<InnerBadgeLayout
					editor={editor}
					headingTextColor="#FF693E"
					roleBgColor="#FFFFFF"
					roleBorderColor="#FFD700"
					nameTextColor={textColor || "#fecaca"}
					roleTextColor={textColor || "#000000"}
					participantPhotoUrl={participantPhotoUrl}
					logoUrl={HNG_ASSETS.logos.orange}
					svgFill="text-[#F1C21C]"
					percentIConFill="text-white"
				/>
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
	hng_finalist_design_v1: LayoutCard4,
	hng_finalist_dev_v1: LayoutCard1,
	hng_finalist_pm_v1: LayoutCard2,
	hng_finalist_v1: LayoutCard3,
	hng_finalist_flaretag_v1: LayoutCard5,
	card_1: LayoutCard1,
	card_2: LayoutCard2,
	card_3: LayoutCard3,
	card_4: LayoutCard4,
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
		<div className="w-full max-w-79.5 h-112.75 mx-auto" ref={badgeRef}>
			<LayoutComponent
				editor={editor}
				participantPhotoUrl={participantPhotoUrl}
				baseColor={baseColor}
				fontStyle={font.style}
				textColor={editor.textColor}
			/>
		</div>
	);
}
