import {
	LAYOUT_CAPABILITIES,
	resolveLayoutId,
} from "../constants/layout-mapping";
import { CANVAS_FIELD_KEYS } from "../constants/field-keys";
import type {
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
	| "gradientColors"
	| "gradientDirection"
	| "solidColor"
	| "backgroundImageUrl"
> {
	const bg = canvas.background;

	if (bg.type === "image") {
		const match = EDITOR_PALETTES.find(
			(p) => BACKGROUND_IMAGE_BY_PALETTE[p.id] === bg.image_url,
		);
		return {
			bgMode: "gradient",
			paletteId: match?.id ?? "bg_mesh_01",
			gradientColors: ["#ff007a", "#ffa800"],
			gradientDirection: "135deg",
			solidColor: "#ff007a",
			backgroundImageUrl: bg.image_url,
		};
	}

	if (bg.type === "solid") {
		const match = EDITOR_PALETTES.find(
			(p) => p.from.toLowerCase() === bg.color.toLowerCase(),
		);
		return {
			bgMode: "solid",
			paletteId: match?.id ?? "bg_color_dark",
			gradientColors: [bg.color, bg.color],
			gradientDirection: "135deg",
			solidColor: bg.color,
			backgroundImageUrl: null,
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
		paletteId: match?.id ?? "bg_mesh_01",
		gradientColors: bg.gradient.colors,
		gradientDirection: bg.gradient.direction,
		solidColor: from,
		backgroundImageUrl: null,
	};
}

const FONT_FAMILY_TO_ID: Record<string, string> = {
	"DM Sans": "inter",
	"Playfair Display": "fraunces",
	"ui-monospace": "mono",
	Georgia: "display",
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
			| "destination_link"
			| "hashtags"
			| "access_type"
		>
	> & { updated_at?: string | null },
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
	const dateParts = parseEventDateParts(eventDateField?.value ?? "");

	const bgState = backgroundToEditorState(canvas);

	return {
		platformTemplateId,
		layoutId,
		title: meta?.title ?? eventNameField?.value ?? "",
		eventName: eventNameField?.value ?? "",
		eventDate: dateParts.eventDate,
		eventTime: dateParts.eventTime,
		participantNameLabel: participantName?.label ?? "NAME",
		participantNamePlaceholder: participantName?.placeholder ?? "Your name",
		roleTitleLabel: roleTitle?.label ?? "ROLE / TITLE",
		roleTitlePlaceholder: roleTitle?.placeholder ?? "e.g. Attendee",
		roleTitleRequired: roleTitle?.required ?? false,
		allowParticipantPhoto: hasPhoto,
		logo: canvas.logo,
		logoPreviewUrl: canvas.logo?.url ?? null,
		pendingLogoFile: null,
		...bgState,
		fontId: FONT_FAMILY_TO_ID[canvas.typography.font_family] ?? "inter",
		titleSize: sizePxToEnum(canvas.typography.size_px),
		defaultCaption: meta?.default_caption ?? "",
		destinationLink: (meta?.destination_link ?? "").replace(/^https?:\/\//, ""),
		hashtags: meta?.hashtags ?? [],
		accessType: meta?.access_type ?? 0,
		savedAt: meta?.updated_at ?? null,
	};
}

export function createDefaultEditorState(
	platformTemplateId: string,
	canvasData?: CanvasData | null,
): CustomizeEditorState {
	if (canvasData) {
		return parseCanvasDataToEditorState(platformTemplateId, canvasData);
	}

	const layoutId = resolveLayoutId(platformTemplateId);
	const caps = LAYOUT_CAPABILITIES[layoutId];
	const palette = caps.defaultPaletteId;
	const fromPalette =
		EDITOR_PALETTES.find((p) => p.id === palette) ?? EDITOR_PALETTES[0];

	const defaults: Record<string, Partial<CustomizeEditorState>> = {
		tpl_achieveher: {
			eventName: "Achieveher",
			eventDate: "JULY 21ST",
			participantNameLabel: "NAME",
			participantNamePlaceholder: "Your Name",
		},
		tpl_dev_summit_26: {
			eventName: "DEV / SUMMIT",
			participantNameLabel: "YOUR NAME",
			participantNamePlaceholder: "Your name",
		},
		tpl_web3_summit: {
			eventName: "MENS SUMMIT 2026",
			participantNameLabel: "NAME",
			participantNamePlaceholder: "Full name",
			roleTitleLabel: "ATTENDEE",
			roleTitlePlaceholder: "e.g. Attendee",
		},
		tpl_next_gen: {
			eventName: "Next Gen Meetup",
			eventDate: "June 30th",
			eventTime: "10am",
			participantNameLabel: "Name",
			participantNamePlaceholder: "Your name",
			roleTitleLabel: "Job Description",
			roleTitlePlaceholder: "e.g. Product Designer",
		},
	};

	const preset = defaults[platformTemplateId] ?? {};

	return {
		platformTemplateId,
		layoutId,
		title: "",
		eventName: "",
		eventDate: "",
		eventTime: "",
		participantNameLabel: "NAME",
		participantNamePlaceholder: "Your name",
		roleTitleLabel: "ROLE / TITLE",
		roleTitlePlaceholder: "e.g. Attendee",
		roleTitleRequired: false,
		allowParticipantPhoto: caps.participantFields.includes("participant_photo"),
		logo: null,
		logoPreviewUrl: null,
		pendingLogoFile: null,
		bgMode: "gradient",
		paletteId: palette,
		gradientColors: [fromPalette.from, fromPalette.to],
		gradientDirection: "135deg",
		solidColor: fromPalette.from,
		backgroundImageUrl:
			layoutId === "photo_gradient_v1" ? "/assets/dashboard/bg-1.png" : null,
		fontId: layoutId === "next_gen_mint_v1" ? "fraunces" : "inter",
		titleSize: "MEDIUM",
		defaultCaption: "",
		destinationLink: "achieveher.com/register",
		hashtags: [],
		accessType: 0,
		...preset,
	};
}
