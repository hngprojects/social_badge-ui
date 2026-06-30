import type { CSSProperties, RefObject } from "react";
import type { LayoutId } from "./layout-registry";
import { CanvasData, CustomizeEditorState } from "@/app/features/customize/canvas-data";
// import type { CanvasData } from "../../customize/canvas-data";

/** Mirrors auth API envelope: { status, message, data }. */
export interface ApiEnvelope<T> {
  status: string;
  message: string;
  data: T;
}

export interface PlatformTemplatesQuery {
  page?: number;
  limit?: number;
}

export interface PlatformTemplate {
  id: string;
  title: string;
  category?: string;
  canvas_data?: CanvasData;
  thumbnail_url?: string;
  description?: string;
  preview_url?: string;
  image_url?: string;
  card_bg?: string;
  usage_count?: number;
  share_rate?: number;
  is_most_picked?: boolean;
  features?: string[];
  
}

export interface PlatformTemplatesListData {
  templates?: PlatformTemplate[];
  items?: PlatformTemplate[];
  results?: PlatformTemplate[];
  page?: number;
  limit?: number;
  total?: number;
  total_pages?: number;
}

export type PlatformTemplatesResponse = ApiEnvelope<PlatformTemplatesListData>;

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