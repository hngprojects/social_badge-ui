import type { CSSProperties, RefObject } from "react";
import type { CustomizeEditorState } from "../../types/canvas-data";

export interface TemplateLayoutProps {
	editor: CustomizeEditorState;
	participantPhotoUrl?: string | null;
	baseColor?: string;
	fontStyle?: CSSProperties;
	textColor?: string;
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
}

export interface CustomTemplatePreviewProps {
	templateId: string;
	editor: CustomizeEditorState;
	participantPhotoUrl?: string | null;
	badgeRef?: RefObject<HTMLDivElement | null>;
}

export interface HngCardTheme {
	background: string;
	centerContent?: boolean;
	resolveInnerProps: (
		textColor?: string,
	) => Omit<InnerBadgeLayoutProps, "editor" | "participantPhotoUrl">;
}

export type HngCardThemeKey = "dev" | "pm" | "default" | "design" | "flaretag";
