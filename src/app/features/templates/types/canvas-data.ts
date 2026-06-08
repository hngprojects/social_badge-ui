export type CanvasFieldKey =
	| "event_name"
	| "event_date"
	| "participant_name"
	| "role_title"
	| "participant_photo";

export type PreviewFieldKey = CanvasFieldKey | "brand_initials";

export type CanvasLayoutId =
	| "circle_photo_dark_v1"
	| "dark_name_photo_v1"
	| "bold_name_pink_v1"
	| "split_purple_teal_v1"
	| "hng_finalist_design_v1"
	| "hng_finalist_dev_v1"
	| "hng_finalist_pm_v1"
	| "hng_finalist_flaretag_v1"
	| "hng_finalist_v1";

export type CanvasFieldType =
	| "static"
	| "participant_input"
	| "participant_upload";

export type LogoPosition = "top-center" | "top-left" | "top-right";

export type BackgroundType = "gradient" | "solid" | "image" | "split";

export interface CanvasGradientBackground {
	type: "gradient";
	gradient: {
		colors: [string, string];
		direction: string;
	};
}

export interface CanvasSplitBackground {
	type: "split";
	top_color: string;
	bottom_color: string;
	split_ratio: number;
}

export interface CanvasSolidBackground {
	type: "solid";
	color: string;
}

export interface CanvasImageBackground {
	type: "image";
	url?: string;
	image_url?: string;
	public_id?: string | null;
	overlay_opacity?: number;
}

export type CanvasBackground =
	| CanvasGradientBackground
	| CanvasSolidBackground
	| CanvasImageBackground
	| CanvasSplitBackground;

export interface CanvasTypography {
	font_family: string;
	size_px: number;
	weight: "normal" | "bold";
	italic: boolean;
	underline: boolean;
}

export interface CanvasLogo {
	url: string | null;
	public_id: string | null;
	position: LogoPosition;
	has_logo?: boolean;
}

export interface CanvasOutput {
	width_px: number;
	height_px: number;
	format: "png";
}

export interface CanvasStaticField {
	key: Extract<CanvasFieldKey, "event_name" | "event_date">;
	type: "static";
	label: string;
	value: string;
	visible: boolean;
}

export interface CanvasParticipantInputField {
	key: Extract<CanvasFieldKey, "participant_name" | "role_title">;
	type: "participant_input";
	label: string;
	placeholder: string;
	required: boolean;
	visible: boolean;
}

export interface CanvasParticipantUploadField {
	key: "participant_photo";
	type: "participant_upload";
	label: string;
	required: boolean;
	accepted_formats: ("jpg" | "png" | "webp")[];
	max_size_mb: number;
	visible: boolean;
}

export type CanvasField =
	| CanvasStaticField
	| CanvasParticipantInputField
	| CanvasParticipantUploadField;

export interface CanvasData {
	layout_id: CanvasLayoutId;
	background: CanvasBackground;
	typography: CanvasTypography;
	logo: CanvasLogo | null;
	fields: CanvasField[];
	output: CanvasOutput;
}

export interface OrganiserTemplatePayload {
	platform_template_id: string;
	title: string;
	canvas_data: CanvasData;
	default_caption: string;
	hashtags: string[];
	access_type: number;
}

export interface OrganiserTemplateResponse {
	id: string;
	platform_template_id: string;
	title: string;
default_caption?: string | null | undefined;
	hashtags: string[];
	access_type: number;
}

export interface LogoUploadResponse {
	url: string;
	public_id: string;
}

/** Editor state used by the customize UI before serializing to canvas_data. */
export interface CustomizeEditorState {
	platformTemplateId: string;
	layoutId: CanvasLayoutId;
	title: string;
	eventName: string;
	eventDate: string;
	eventTime: string;
	participantNameLabel: string;
	participantNamePlaceholder: string;
	roleTitleLabel: string;
	roleTitlePlaceholder: string;
	roleTitleRequired: boolean;
	allowParticipantPhoto: boolean;
	logo: CanvasLogo | null;
	logoPreviewUrl: string | null;
	pendingLogoFile: File | null;
	bgMode: "gradient" | "solid";
	paletteId: string;
	gradientColors: [string, string];
	gradientDirection: string;
	solidColor: string;
	backgroundImageUrl: string | null;
	fontId: string;
	titleSize: "SMALL" | "MEDIUM" | "LARGE";
	participantNameVisible: boolean;
	roleTitleVisible: boolean;
	defaultCaption: string;
	hashtags: string[];
	accessType: number;
	status?: "draft" | "live";
	savedAt?: string | null;
}
