import type { CSSProperties } from "react";
import type { CanvasLayoutId, PreviewFieldKey } from "../types/canvas-data";
import { CANVAS_FIELD_KEYS } from "./field-keys";

export interface PreviewFieldSlot {
	key: PreviewFieldKey;
	placeholder: string;
	style: CSSProperties;
}

export interface PreviewLayoutConfig {
	layoutId: CanvasLayoutId;
	hasHeaderLogo: boolean;
	previewColor: string;
	photoFrame: {
		shape: "square" | "circle" | "rect";
		placeholder: string;
		style: CSSProperties;
	} | null;
	fields: PreviewFieldSlot[];
}

export const PREVIEW_LAYOUTS: Record<CanvasLayoutId, PreviewLayoutConfig> = {
	photo_gradient_v1: {
		layoutId: "photo_gradient_v1",
		hasHeaderLogo: true,
		previewColor: "",
		photoFrame: {
			shape: "square",
			placeholder: "Attendee photo",
			style: {
				position: "absolute",
				top: "88px",
				left: "24px",
				right: "24px",
				aspectRatio: "1",
			},
		},
		fields: [
			{
				key: CANVAS_FIELD_KEYS.EVENT_DATE,
				placeholder: "JULY 21ST",
				style: {
					position: "absolute",
					top: "54px",
					left: "28px",
					fontSize: "16px",
					fontWeight: "700",
					textTransform: "uppercase",
					letterSpacing: "0.1em",
					color: "rgba(255,255,255,0.9)",
				},
			},
			{
				key: CANVAS_FIELD_KEYS.EVENT_NAME,
				placeholder: "SUMMIT",
				style: {
					position: "absolute",
					top: "54px",
					right: "28px",
					fontSize: "16px",
					fontWeight: "700",
					textTransform: "uppercase",
					letterSpacing: "0.1em",
					color: "#ffffff",
				},
			},
			{
				key: CANVAS_FIELD_KEYS.PARTICIPANT_NAME,
				placeholder: "Your Name",
				style: {
					position: "absolute",
					bottom: "20px",
					left: "24px",
					right: "24px",
					textAlign: "center",
					fontSize: "16px",
					color: "#ffffff",
					borderWidth: "1px",
					borderStyle: "solid",
					borderImage: "linear-gradient(to left, #FC5E24, #FFFFFF) 1",
					padding: "4px",
				},
			},
		],
	},
	name_role_dark_v2: {
		layoutId: "name_role_dark_v2",
		hasHeaderLogo: false,
		previewColor: "#0A0A0A",
		photoFrame: {
			shape: "rect",
			placeholder: "Profile photo",
			style: {
				position: "absolute",
				top: "56px",
				left: "16px",
				right: "16px",
				bottom: "56px",
				borderRadius: "10px",
				overflow: "hidden",
			},
		},
		fields: [
			{
				key: CANVAS_FIELD_KEYS.EVENT_NAME,
				placeholder: "DEV / SUMMIT",
				style: {
					position: "absolute",
					top: "16px",
					left: "16px",
					fontSize: "15px",
					fontWeight: "700",
					letterSpacing: "0.04em",
					color: "#ffffff",
					textTransform: "uppercase",
				},
			},
			{
				key: "brand_initials",
				placeholder: "DS",
				style: {
					position: "absolute",
					top: "12px",
					right: "16px",
					fontSize: "22px",
					fontWeight: "800",
					letterSpacing: "0.02em",
					color: "#8B5CF6",
				},
			},
			{
				key: CANVAS_FIELD_KEYS.PARTICIPANT_NAME,
				placeholder: "YOUR NAME",
				style: {
					position: "absolute",
					bottom: "12px",
					left: "16px",
					right: "16px",
					textAlign: "center",
					fontSize: "13px",
					fontWeight: "700",
					letterSpacing: "0.15em",
					color: "#0A0A0A",
					textTransform: "uppercase",
					backgroundColor: "#ffffff",
					padding: "10px 12px",
					borderRadius: "6px",
				},
			},
		],
	},
	name_role_dark_v1: {
		layoutId: "name_role_dark_v1",
		hasHeaderLogo: false,
		previewColor: "#1a1232",
		photoFrame: {
			shape: "square",
			placeholder: "Profile photo",
			style: {
				position: "absolute",
				bottom: "24px",
				left: "0",
				right: "0",
				width:"98%",
				margin:"0 auto",
				height: "45%",
				borderRadius: "12px",
				overflow: "hidden",
				objectFit: "cover",
			},
		},
		fields: [
			{
				key: CANVAS_FIELD_KEYS.PARTICIPANT_NAME,
				placeholder: "Adam\nJohannson",
				style: {
					position: "absolute",
					top: "24px",
					left: "24px",
					fontSize: "28px",
					fontWeight: "700",
					lineHeight: "1.1",
					color: "#ffffff",
				},
			},
			{
				key: CANVAS_FIELD_KEYS.ROLE_TITLE,
				placeholder: "ATTENDEE",
				style: {
					position: "absolute",
					top: "24px",
					right: "20px",
					fontSize: "10px",
					fontWeight: "700",
					letterSpacing: "0.18em",
					color: "rgba(255,255,255,0.55)",
					writingMode: "vertical-rl",
					textOrientation: "mixed",
					textTransform: "uppercase",
				},
			},
			{
				key: CANVAS_FIELD_KEYS.EVENT_NAME,
				placeholder: "MENS SUMMIT 2026",
				style: {
					position: "absolute",
					top: "42%",
					left: "24px",
					right: "24px",
					transform: "translateY(-50%)",
					fontSize: "20px",
					fontWeight: "800",
					letterSpacing: "0.05em",
					color: "#ffffff",
					textTransform: "uppercase",
				},
			},
		],
	},
	speaker_card_v1: {
		layoutId: "speaker_card_v1",
		hasHeaderLogo: false,
		previewColor: "#F5F5F0",
		photoFrame: {
			shape: "square",
			placeholder: "Photo",
			style: {
				position: "absolute",
				top: "72px",
				left: "28px",
				width: "72px",
				height: "72px",
			},
		},
		fields: [
			{
				key: CANVAS_FIELD_KEYS.EVENT_NAME,
				placeholder: "Next Gen Meetup",
				style: {
					position: "absolute",
					top: "28px",
					left: "28px",
					right: "28px",
					fontSize: "20px",
					fontWeight: "800",
					color: "#1A1A1A",
				},
			},
			{
				key: CANVAS_FIELD_KEYS.EVENT_DATE,
				placeholder: "June 30th",
				style: {
					position: "absolute",
					top: "160px",
					left: "28px",
					fontSize: "11px",
					fontWeight: "600",
					color: "#6B7280",
				},
			},
			{
				key: CANVAS_FIELD_KEYS.PARTICIPANT_NAME,
				placeholder: "Name",
				style: {
					position: "absolute",
					top: "188px",
					left: "28px",
					right: "28px",
					fontSize: "13px",
					fontWeight: "700",
					color: "#1A1A1A",
				},
			},
			{
				key: CANVAS_FIELD_KEYS.ROLE_TITLE,
				placeholder: "Job Description",
				style: {
					position: "absolute",
					top: "210px",
					left: "28px",
					right: "28px",
					fontSize: "11px",
					fontWeight: "500",
					color: "#9CA3AF",
				},
			},
		],
	},
};

export function getPreviewValueForField(
	key: PreviewFieldKey,
	state: {
		eventName: string;
		eventDate: string;
		eventTime: string;
		participantNamePlaceholder: string;
		roleTitlePlaceholder: string;
	},
	placeholder = "",
): string {
	switch (key) {
		case CANVAS_FIELD_KEYS.EVENT_NAME:
			return state.eventName || placeholder;
		case CANVAS_FIELD_KEYS.EVENT_DATE:
			return state.eventTime
				? `${state.eventDate} · ${state.eventTime}`.trim()
				: state.eventDate || placeholder;
		case CANVAS_FIELD_KEYS.PARTICIPANT_NAME:
			return state.participantNamePlaceholder || placeholder;
		case CANVAS_FIELD_KEYS.ROLE_TITLE:
			return state.roleTitlePlaceholder || placeholder;
		case "brand_initials": {
			if (!state.eventName) return placeholder;
			return state.eventName
				.split(/[\s/-]+/)
				.filter(Boolean)
				.map((word) => word[0])
				.join("")
				.toUpperCase()
				.slice(0, 2);
		}
		default:
			return placeholder;
	}
}
