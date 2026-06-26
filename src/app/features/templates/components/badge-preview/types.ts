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
	trademarkColor?: "black" | "white";
	trademarkLogo?: string | undefined;
	trademarkBrandName?: "Flare Tag";
	trademarkURL?: "flaretag.hng14.com";
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
	) => Omit<InnerBadgeLayoutProps, "editor" | "participantPhotoUrl" | "trademarkURL" | "trademarkBrandName" |"trademarkLogo">;
	

}

export type HngCardThemeKey = "dev" | "pm" | "default" | "design" | "flaretag";