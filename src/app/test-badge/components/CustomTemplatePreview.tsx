"use client";

import React from "react";
import { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";
import {
	Template1,
	Template4,
	Template5,
	Template7,
	Template9,
} from "../../(dashboard)/create-badges/customize/components/customizable-svgs";
import PlaceholderLogo from "./placeholder-logo";

interface TemplateLayoutProps {
	editor: CustomizeEditorState;
}

// Placeholder for Template 1 Layout
export function Layout1({ editor }: TemplateLayoutProps) {
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			<Template1 className="w-full h-full " />
			<div className="w-30 h-26.5 left-[32.5px] bg-rose-600 absolute top-17 rounded-full flex justify-center items-center">
				Profile Photo {/*profile photo will be placed here by users*/}
			</div>
			<div className="absolute top-45 px-8 w-full">
				<h2 className="text-6xl font-normal uppercase text-black  tracking-tight font-league-gothic">
					Sandra <br /> Robinson
					{/*Participant name will be placed here by users*/}
					{/*Participant name will be split into two by space and a br will be added between them*/}
				</h2>
				<p className="text-md text-black/80">
					Product Designer {/*User role will be placed here by users*/}
				</p>
			</div>
			<div className="absolute bottom-5 w-full text-right px-6">
				<p className="text-2xl font-normal text-stone-300 font-league-gothic">
					#DesignWeekLagos
				</p>
			</div>
		</div>
	);
}

// Placeholder for Template 9 Layout
export function Layout9({ editor }: TemplateLayoutProps) {
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			<Template9 className="w-full h-full" />
			<div className="absolute top-10 left-10 right-10">
				<h2 className="text-3xl font-black text-white leading-none">
					{editor.eventName || "SUMMIT 2026"}
				</h2>
			</div>
			<div className="absolute bottom-20 left-10">
				<p className="text-lg font-bold text-[#68C4B9]">
					{editor.participantNamePlaceholder || "Attendee Name"}
				</p>
			</div>
		</div>
	);
}

// Add more Layout components here as needed...

// Placeholder for Template 4 Layout
export function Layout4({ editor }: TemplateLayoutProps) {
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			<Template4 className="w-full h-full" />
			{/*This div below will be rendered as a placeholder if the chosen badge as a space for organizer logo */}
			<div className="h-[77%] w-full absolute top-0">
				<div className="flex gap-2 w-full items-center justify-center text-white my-12">
					<PlaceholderLogo />
					<span className="text-sm flex flex-col gap-0">
						<span className="leading-none">YOUR</span>{" "}
						<span className="leading-none">LOGO</span>
					</span>
				</div>
				<div className="w-35 h-35 rounded-full bg-white mx-auto"></div>
			</div>

			<div className="absolute bottom-12 left-8 border">
				<div className="">
					<h2 className="text-xl font-bold text-white tracking-widest uppercase">
						<span>Sandra</span> Robinson
					</h2>
				</div>
				<p className="text-lg font-bold text-[#222]">
					{editor.participantNamePlaceholder || "Your Name"}
				</p>
			</div>
		</div>
	);
}

// Placeholder for Template 5 Layout
export function Layout5({ editor }: TemplateLayoutProps) {
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			<Template5 className="w-full h-full" />
			<div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
				<h2 className="text-3xl font-black text-white uppercase italic mb-4">
					{editor.eventName || "SUMMIT"}
				</h2>
				<div className="w-20 h-1 bg-white mb-6" />
				<p className="text-xl font-bold text-white/90">
					{editor.participantNamePlaceholder || "Attendee"}
				</p>
			</div>
		</div>
	);
}

// Placeholder for Template 7 Layout
export function Layout7({ editor }: TemplateLayoutProps) {
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px]">
			<Template7 className="w-full h-full" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-6">
				<h2 className="text-4xl font-black text-white tracking-tighter mb-2">
					{editor.eventName || "2026"}
				</h2>
				<p className="text-sm font-medium text-white/40 uppercase tracking-[0.3em]">
					{editor.participantNamePlaceholder || "CLAIMED BY YOU"}
				</p>
			</div>
		</div>
	);
}

const LAYOUT_COMPONENTS: Record<
	string,
	React.ComponentType<TemplateLayoutProps>
> = {
	tpl_1: Layout1,
	tpl_4: Layout4,
	tpl_5: Layout5,
	tpl_7: Layout7,
	tpl_9: Layout9,
};

interface CustomTemplatePreviewProps {
	templateId: string;
	editor: CustomizeEditorState;
}

export function CustomTemplatePreview({
	templateId,
	editor,
}: CustomTemplatePreviewProps) {
	const LayoutComponent = LAYOUT_COMPONENTS[templateId];

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
		<div className="w-full max-w-79.5 h-106 shadow-2xl mx-auto">
			<LayoutComponent editor={editor} />
		</div>
	);
}
