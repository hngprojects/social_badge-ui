import { LAYOUT_CAPABILITIES } from "../constants/layout-mapping";
import {
	DEFAULT_OUTPUT,
	PHOTO_ACCEPTED_FORMATS,
	PHOTO_MAX_SIZE_MB,
	CANVAS_FIELD_KEYS,
} from "../constants/field-keys";
import type {
	CanvasBackground,
	CanvasBackgroundPart,
	CanvasData,
	CanvasField,
	CustomizeEditorState,
	OrganiserTemplatePayload,
} from "../types/canvas-data";
import { resolveFontFamily, resolveTitleSizePx } from "./font-mapping";
import { BACKGROUND_IMAGE_BY_PALETTE, getPalette } from "./palette-mapping";

function buildBackground(state: CustomizeEditorState): CanvasBackground {
	if (state.bgMode === "image") {
		// Image-bg contract: CanvasImageBackground url/image_url are optional.
		// parse-canvas-data reads bg.url || bg.image_url for backgroundImageUrl/paletteId
		// (with fallbacks); badge-preview renders layout hardcoded assets when
		// editor.bgMode === "image", not a populated background URL from canvas data.
		return {
			type: "image",
			url: undefined,
			public_id: null,
		};
	}

	if (state.backgroundImageUrl) {
		return {
			type: "image",
			url: state.backgroundImageUrl,
			image_url: state.backgroundImageUrl,
			public_id: null,
			overlay_opacity: 0.45,
		};
	}

	const buildPart = (
		mode: "gradient" | "solid",
		solid: string,
		grads: [string, string],
		dir: string,
	): CanvasBackgroundPart => {
		if (mode === "solid") {
			return { type: "solid", color: solid, gradient: null };
		}
		return {
			type: "gradient",
			color: null,
			gradient: { colors: grads, direction: dir },
		};
	};

	if (state.bgMode === "split" || state.isSplit) {
		return {
			type: "split",
			split_ratio: state.splitRatio ?? 0.5,
			primary: buildPart(
				state.priBgMode ?? (state.bgMode === "split" ? "solid" : state.bgMode),
				state.solidColor,
				state.gradientColors,
				state.gradientDirection,
			),
			secondary: buildPart(
				state.secBgMode ?? "solid",
				state.secSolidColor ?? state.solidColor,
				state.secGradientColors ?? state.gradientColors,
				state.secGradientDirection ?? "135deg",
			),
		};
	}

	if (state.bgMode === "solid") {
		return { type: "solid", color: state.solidColor };
	}

	return {
		type: "gradient",
		gradient: {
			colors: state.gradientColors,
			direction: state.gradientDirection,
		},
	};
}


{
	/*function formatEventDateValue(eventDate: string, eventTime: string): string {
	const date = eventDate.trim();
	const time = eventTime.trim();
	if (date && time) return `${date} · ${time}`;
	return date || time;
} */
}

function buildFields(state: CustomizeEditorState): CanvasField[] {
	const caps = LAYOUT_CAPABILITIES[state.layoutId];
	const fields: CanvasField[] = [];

	if (caps.staticFields.includes("event_date")) {
		const value = state.eventDate.trim().toUpperCase() || "JULY 21ST";

		fields.push({
			key: CANVAS_FIELD_KEYS.EVENT_DATE,
			type: "static",
			label: "Event Date",
			value,
			visible: true,
		});
	}

	if (caps.staticFields.includes("event_name")) {
		fields.push({
			key: CANVAS_FIELD_KEYS.EVENT_NAME,
			type: "static",
			label: "Event Name",
			value: state.eventName.trim() || "YOUR EVENT",
			visible: true,
		});
	}

	if (caps.participantFields.includes("participant_name")) {
		fields.push({
			key: CANVAS_FIELD_KEYS.PARTICIPANT_NAME,
			type: "participant_input",
			label: "NAME",
			placeholder: "Your name",
			required: state.participantNameVisible ? true : false,
			visible: state.participantNameVisible,
			color: state.textColor,
		});
	}

	if (caps.participantFields.includes("role_title") || caps.participantFields.includes("track")) {
		const isTrack = caps.participantFields.includes("track");
		fields.push({
			key: isTrack ? CANVAS_FIELD_KEYS.TRACK : CANVAS_FIELD_KEYS.ROLE_TITLE,
			type: "participant_input",
			label: isTrack ? "TRACK" : "ROLE / TITLE",
			placeholder: isTrack ? (state.trackPlaceholder || "e.g. Design") : "e.g. Product Designer",
			required: isTrack ? ((state.trackVisible ?? true) ? (state.trackRequired ?? false) : false) : (state.roleTitleVisible ? state.roleTitleRequired : false),
			visible: isTrack ? (state.trackVisible ?? true) : state.roleTitleVisible,
			color: state.textColor,
		});
	}

	if (state.layoutId.startsWith("hng_finalist_")) {
		fields.push({
			key: CANVAS_FIELD_KEYS.BADGE_TITLE,
			type: "static",
			label: "Badge Title",
			value: state.badgeTitle || "Finalist",
			visible: true,
		});
		fields.push({
			key: CANVAS_FIELD_KEYS.PERCENTILE_BADGE,
			type: "static",
			label: "Percentile",
			value: state.percentileBadge || "Top 5%",
			visible: true,
		});
	}

	if (
		state.allowParticipantPhoto &&
		caps.participantFields.includes("participant_photo")
	) {
		fields.push({
			key: CANVAS_FIELD_KEYS.PARTICIPANT_PHOTO,
			type: "participant_upload",
			label: "YOUR PHOTO",
			required: false,
			accepted_formats: [...PHOTO_ACCEPTED_FORMATS],
			max_size_mb: PHOTO_MAX_SIZE_MB,
			visible: true,
		});
	}

	return fields;
}

export function buildCanvasData(state: CustomizeEditorState): CanvasData {
	const caps = LAYOUT_CAPABILITIES[state.layoutId];

	return {
		layout_id: state.layoutId,
		background: buildBackground(state),
		typography: {
			font_family: resolveFontFamily(state.fontId),
			size_px: resolveTitleSizePx(state.titleSize),
			weight: "bold",
			italic: state.fontId === "fraunces",
			underline: false,
		},
		logo: (state.logo || state.logoPreviewUrl)
			? {
					url: state.logo?.url || state.logoPreviewUrl || "",
					public_id: state.logo?.public_id || "",
					position: state.logo?.position ?? caps.defaultLogoPosition,
					has_logo: true,
				}
			: null,
		fields: buildFields(state),
		output: { ...DEFAULT_OUTPUT },
	};
}

export function buildOrganiserTemplatePayload(
	state: CustomizeEditorState,
): OrganiserTemplatePayload {
	return {
		platform_template_id: state.platformTemplateId,
		title: state.title.trim() || state.eventName.trim() || "Untitled Badge",
		canvas_data: buildCanvasData(state),
		default_caption: state.defaultCaption.trim(),
		hashtags: state.hashtags.filter(Boolean),
		access_type: state.accessType,
		access_code: state.accessType === 1 ? state.accessCode : undefined,
	};
}

export function paletteToBackgroundState(
	paletteId: string,
	bgMode: "gradient" | "solid" | "split",
): Pick<
	CustomizeEditorState,
	| "paletteId"
	| "gradientColors"
	| "gradientDirection"
	| "solidColor"
	| "backgroundImageUrl"
> {
	const palette = getPalette(paletteId);
	const imageUrl = BACKGROUND_IMAGE_BY_PALETTE[paletteId];

	return {
		paletteId,
		gradientColors: [palette.from, palette.to],
		gradientDirection: "135deg",
		solidColor: palette.from,
		backgroundImageUrl: bgMode === "gradient" && imageUrl ? imageUrl : null,
	};
}
