import type { CSSProperties, RefObject } from "react";
import type { CustomizeEditorState } from "../../types/canvas-data";
import type { LayoutId } from "./layout-registry";

export interface TemplateLayoutProps {
	editor: CustomizeEditorState;
	participantPhotoUrl?: string | null;
	baseColor?: string;
	fontStyle?: CSSProperties;
	textColor?: string;
	badgeRef?: RefObject<HTMLDivElement | null>;
}

export interface InnerBadgeLayoutProps {
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
	watermarkColor?: "black" | "white";
	watermarkLogo?: string | undefined;
	watermarkBrandName?: "Flare Tag";
	// Bound to chnage with change in domain name
	watermarkURL?: "flaretag.hng14.com";
}

export interface WatermarkProps {
	watermarkColor?: string;
	watermarkLogo?: string | undefined;
	watermarkBrandName?: string;
	watermarkURL?: string;
}

export interface CustomTemplatePreviewProps {
	templateId: LayoutId;
	editor: CustomizeEditorState;
	participantPhotoUrl?: string | null;
	badgeRef?: RefObject<HTMLDivElement | null>;
}

export interface HngCardTheme {
	background: string;
	centerContent?: boolean;
	resolveInnerProps: (
		textColor?: string,
	) => Omit<InnerBadgeLayoutProps, "editor" | "participantPhotoUrl" | "watermarkURL" | "watermarkBrandName" |"watermarkLogo">;
	

}

export type HngCardThemeKey = "dev" | "pm" | "default" | "design" | "flaretag";