import {
	LAYOUT_CAPABILITIES,
	resolveLayoutId,
} from "../constants/layout-mapping";
import { CANVAS_FIELD_KEYS } from "../constants/field-keys";
import type {
	CanvasBackgroundPart,
	CanvasData,
	CanvasParticipantInputField,
	CanvasStaticField,
	CustomizeEditorState,
	OrganiserTemplateResponse,
} from "../types/canvas-data";
import {
	BACKGROUND_IMAGE_BY_PALETTE,
	EDITOR_PALETTES,
} from "./palette-mapping";

function findStatic(
	fields: CanvasData["fields"],
	key: "event_name" | "event_date",
): CanvasStaticField | undefined {
	return fields.find(
		(f): f is CanvasStaticField => f.type === "static" && f.key === key,
	);
}

function findParticipantInput(
	fields: CanvasData["fields"],
	key: "participant_name" | "role_title",
): CanvasParticipantInputField | undefined {
	return fields.find(
		(f): f is CanvasParticipantInputField =>
			f.type === "participant_input" && f.key === key,
	);
}

function parseEventDateParts(value: string): {
	eventDate: string;
	eventTime: string;
} {
	if (value.includes(" · ")) {
		const [eventDate, eventTime] = value.split(" · ", 2);
		return { eventDate: eventDate ?? "", eventTime: eventTime ?? "" };
	}
	return { eventDate: value, eventTime: "" };
}

function backgroundToEditorState(
	canvas: CanvasData,
): Pick<
	CustomizeEditorState,
	| "bgMode"
	| "paletteId"
	| "priBgMode"
	| "gradientColors"
	| "gradientDirection"
	| "solidColor"
	| "backgroundImageUrl"
	| "isSplit"
	| "splitRatio"
	| "secBgMode"
	| "secPaletteId"
	| "secGradientColors"
	| "secSolidColor"
	| "secGradientDirection"
> {
	const bg = canvas.background;
	const caps = LAYOUT_CAPABILITIES[canvas.layout_id];
	const fallbackPaletteId = caps?.defaultPaletteId ?? "bg_color_dark";

	const partToState = (part?: CanvasBackgroundPart | null, fallbackColor?: string) => {
		if (!part) {
			const color = fallbackColor ?? "#000000";
			return {
				bgMode: "solid" as const,
				paletteId: fallbackPaletteId,
				gradientColors: [color, color] as [string, string],
				gradientDirection: "135deg",
				solidColor: color,
			};
		}

		const mode = part.type;
		const solid = part.color ?? "#000000";
		const grads = part.gradient?.colors ?? [solid, solid];
		const dir = part.gradient?.direction ?? "135deg";

		const match = EDITOR_PALETTES.find((p) => {
			if (mode === "solid") return p.from.toLowerCase() === solid.toLowerCase();
			return (
				p.from.toLowerCase() === grads[0].toLowerCase() &&
				p.to.toLowerCase() === grads[1].toLowerCase()
			);
		});

		return {
			bgMode: mode,
			paletteId: match?.id ?? fallbackPaletteId,
			gradientColors: grads,
			gradientDirection: dir,
			solidColor: solid,
		};
	};

	if (bg.type === "split") {
		// Use unknown cast to safely check for legacy fields without 'any'
		const rawSplit = bg as unknown as {
			primary?: CanvasBackgroundPart;
			secondary?: CanvasBackgroundPart;
			top_color?: string;
			bottom_color?: string;
			split_ratio?: number;
		};

		const primary = partToState(rawSplit.primary, rawSplit.top_color);
		const secondary = partToState(rawSplit.secondary, rawSplit.bottom_color);

		return {
			...primary,
			bgMode: "split",
			priBgMode: primary.bgMode,
			isSplit: true,
			splitRatio: rawSplit.split_ratio ?? 0.5,
			secBgMode: secondary.bgMode,
			secPaletteId: secondary.paletteId,
			secGradientColors: secondary.gradientColors,
			secSolidColor: secondary.solidColor,
			secGradientDirection: secondary.gradientDirection,
			backgroundImageUrl: null,
		};
	}

	if (bg.type === "image") {
		const imageUrl = bg.url || bg.image_url;
		const match = EDITOR_PALETTES.find(
			(p) => BACKGROUND_IMAGE_BY_PALETTE[p.id] === imageUrl,
		);
		return {
			bgMode: "image",
			priBgMode: "solid",
			paletteId: match?.id ?? fallbackPaletteId,
			gradientColors: ["#1a1a1a", "#1a1a1a"],
			gradientDirection: "135deg",
			solidColor: "#1a1a1a",
			backgroundImageUrl: imageUrl ?? null,
			isSplit: false,
		};
	}

	if (bg.type === "solid") {
		const match = EDITOR_PALETTES.find(
			(p) => p.from.toLowerCase() === bg.color.toLowerCase(),
		);
		return {
			bgMode: "solid",
			priBgMode: "solid",
			paletteId: match?.id ?? fallbackPaletteId,
			gradientColors: [bg.color, bg.color],
			gradientDirection: "135deg",
			solidColor: bg.color,
			backgroundImageUrl: null,
			isSplit: false,
		};
	}

	const [from, to] = bg.gradient.colors;
	const match = EDITOR_PALETTES.find(
		(p) =>
			p.from.toLowerCase() === from.toLowerCase() &&
			p.to.toLowerCase() === to.toLowerCase(),
	);

	return {
		bgMode: "gradient",
		priBgMode: "gradient",
		paletteId: match?.id ?? fallbackPaletteId,
		gradientColors: bg.gradient.colors,
		gradientDirection: bg.gradient.direction,
		solidColor: from,
		backgroundImageUrl: null,
		isSplit: false,
	};
}

const FONT_FAMILY_TO_ID: Record<string, string> = {
	"DM Sans": "inter",
	"Playfair Display": "fraunces",
	"ui-monospace": "mono",
	Georgia: "display",
	"Bricolage Grotesque": "bricolage",
};

function sizePxToEnum(px: number): "SMALL" | "MEDIUM" | "LARGE" {
	if (px <= 34) return "SMALL";
	if (px >= 48) return "LARGE";
	return "MEDIUM";
}

export function parseCanvasDataToEditorState(
	platformTemplateId: string,
	canvas: CanvasData,
	meta?: Partial<
		Pick<
			OrganiserTemplateResponse,
			| "title"
			| "default_caption"
			| "hashtags"
			| "access_type"
		>
	> & { logo_url?: string | null; updated_at?: string | null; is_published?: boolean },
): CustomizeEditorState {
	const layoutId = canvas.layout_id;
	const eventNameField = findStatic(
		canvas.fields,
		CANVAS_FIELD_KEYS.EVENT_NAME,
	);
	const eventDateField = findStatic(
		canvas.fields,
		CANVAS_FIELD_KEYS.EVENT_DATE,
	);
	const participantName = findParticipantInput(
		canvas.fields,
		CANVAS_FIELD_KEYS.PARTICIPANT_NAME,
	);
	const roleTitle = findParticipantInput(
		canvas.fields,
		CANVAS_FIELD_KEYS.ROLE_TITLE,
	);
	const hasPhoto = canvas.fields.some(
		(f) => f.key === CANVAS_FIELD_KEYS.PARTICIPANT_PHOTO,
	);
	const trackField = canvas.fields.find(
		(f) => f.key === CANVAS_FIELD_KEYS.TRACK,
	);
	const trackPlaceholder = trackField?.type === "participant_input" 
		? trackField.placeholder 
		: (trackField?.type === "static" ? trackField.value : "");

	const badgeTitleField = canvas.fields.find(
		(f): f is CanvasStaticField => f.key === CANVAS_FIELD_KEYS.BADGE_TITLE,
	);
	const percentileField = canvas.fields.find(
		(f): f is CanvasStaticField => f.key === CANVAS_FIELD_KEYS.PERCENTILE_BADGE,
	);

	const dateParts = parseEventDateParts(eventDateField?.value ?? "");

	const bgState = backgroundToEditorState(canvas);

	return {
		platformTemplateId,
		layoutId,
		title: meta?.title ?? eventNameField?.value ?? "",
		eventName: eventNameField?.value ?? meta?.title ?? "",
		eventDate: dateParts.eventDate,
		eventTime: dateParts.eventTime,
		participantNameLabel: "NAME",
		participantNamePlaceholder: participantName?.placeholder ?? "Your name",
		participantNameVisible: Boolean(participantName?.visible ?? true),
		roleTitleLabel: "ROLE / TITLE",
		roleTitlePlaceholder: roleTitle?.placeholder ?? "e.g. Product Designer",
		roleTitleVisible: Boolean(roleTitle?.visible ?? true),
		roleTitleRequired: Boolean(roleTitle?.required ?? false),
		trackLabel: "TRACK",
		trackPlaceholder: trackPlaceholder || "e.g. Design",
		trackVisible: Boolean(trackField?.visible ?? true),
		trackRequired: trackField?.type === "participant_input" ? trackField.required : false,
		badgeTitle: badgeTitleField?.value ?? "Finalist",
		percentileBadge: percentileField?.value ?? "Top 5%",
		allowParticipantPhoto: hasPhoto,
		logo: canvas.logo,
		logoPreviewUrl: meta?.logo_url ?? canvas.logo?.url ?? null,
		pendingLogoFile: null,
		...bgState,
		textColor: participantName?.color ?? roleTitle?.color ?? (trackField?.type === "participant_input" ? trackField.color : undefined),
		fontId: FONT_FAMILY_TO_ID[canvas.typography.font_family] ?? "inter",
		titleSize: sizePxToEnum(canvas.typography.size_px),
		defaultCaption: meta?.default_caption ?? "",
		hashtags: meta?.hashtags ?? [],
		accessType: meta?.access_type ?? 0,
		status: meta?.is_published ? "live" : "draft",
		savedAt: meta?.updated_at ?? null,
	};
}

export function createDefaultEditorState(
	platformTemplateId: string | null,
	canvasData?: CanvasData | null,
): CustomizeEditorState | null {
	if (canvasData) {
		return parseCanvasDataToEditorState(
			platformTemplateId ?? canvasData.layout_id,
			canvasData,
		);
	}

	const layoutId = resolveLayoutId(platformTemplateId);
	if (!layoutId) return null;

	const caps = LAYOUT_CAPABILITIES[layoutId];
	const palette = caps.defaultPaletteId;
	const fromPalette =
		EDITOR_PALETTES.find((p) => p.id === palette) ?? EDITOR_PALETTES[0];

	const defaults: Record<string, Partial<CustomizeEditorState>> = {
		circle_photo_dark_v1: {
			eventName: "",
			participantNameLabel: "NAME",
			participantNamePlaceholder: "",
			roleTitleLabel: "ROLE / TITLE",
			roleTitlePlaceholder: "",
		},
		bold_name_pink_v1: {
			eventName: "#DesignWeekLagos",
			participantNameLabel: "NAME",
			participantNamePlaceholder: "",
			roleTitleLabel: "ROLE / TITLE",
			roleTitlePlaceholder: "",
		},
		hng_finalist_v1: {
			eventName: "HNG FINALIST",
			participantNameLabel: "NAME",
			participantNamePlaceholder: "",
			trackLabel: "TRACK",
			trackPlaceholder: "Design",
			badgeTitle: "Finalist",
			percentileBadge: "Top 5%",
		},
		hng_finalist_dev_v1: {
			eventName: "HNG FINALIST",
			participantNameLabel: "NAME",
			participantNamePlaceholder: "",
			trackLabel: "TRACK",
			trackPlaceholder: "Dev",
			badgeTitle: "Finalist",
			percentileBadge: "Top 5%",
		},
		hng_finalist_design_v1: {
			eventName: "HNG FINALIST",
			participantNameLabel: "NAME",
			participantNamePlaceholder: "",
			trackLabel: "TRACK",
			trackPlaceholder: "Design",
			badgeTitle: "Finalist",
			percentileBadge: "Top 5%",
		},
		hng_finalist_pm_v1: {
			eventName: "HNG FINALIST",
			participantNameLabel: "NAME",
			participantNamePlaceholder: "",
			trackLabel: "TRACK",
			trackPlaceholder: "PM",
			badgeTitle: "Finalist",
			percentileBadge: "Top 5%",
		},
		hng_finalist_flaretag_v1: {
			eventName: "HNG FINALIST",
			participantNameLabel: "NAME",
			participantNamePlaceholder: "",
			trackLabel: "TRACK",
			trackPlaceholder: "Flaretag",
			badgeTitle: "Finalist",
			percentileBadge: "Top 5%",
		},
	};

	const preset = defaults[layoutId] ?? {};

	const isHng = layoutId.startsWith("hng_finalist_");

	return {
		platformTemplateId: platformTemplateId ?? "",
		layoutId,
		title: "",
		eventName: "",
		eventDate: "",
		eventTime: "",
		participantNameLabel: "NAME",
		participantNamePlaceholder: "",
		roleTitleLabel: "ROLE / TITLE",
		roleTitlePlaceholder: "",
		roleTitleRequired: false,
		allowParticipantPhoto: caps.participantFields.includes("participant_photo"),
		logo: null,
		logoPreviewUrl: null,
		pendingLogoFile: null,
		bgMode: isHng ? "image" : "solid",
		paletteId: palette,
		gradientColors: [fromPalette.from, fromPalette.to],
		gradientDirection: "135deg",
		solidColor: fromPalette.from,
		backgroundImageUrl: null,
		fontId: "inter",
		titleSize: "MEDIUM",
		defaultCaption: "",
		hashtags: [],
		accessType: 0,
		participantNameVisible: true,
		roleTitleVisible: true,
		status: "draft",
		...preset,
		...(isHng ? { trackRequired: true } : {}),
	};
}
