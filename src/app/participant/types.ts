import { Textarea } from "@/components/ui/textarea";
import { CanvasData } from "../features/customize/canvas-data";
import { ApiEnvelope } from "../features/badges/components/badge-preview/types";


export interface PublicParticipantPageData {
  title: string;
  canvas_data: CanvasData;
  logo_url?: string | null;
  default_caption?: string | null;
  destination_link?: string | null;
  hashtags?: string[];
  access_type: number;
  access_code?: string | null;
}

export type PublicParticipantPageResponse = ApiEnvelope<PublicParticipantPageData>;


export interface SocialPlatform {
	id: string;
	name: string;
	icon: string;
}

export interface ParticipantPopupProps {
	isOpen: boolean;
	onClose: () => void;
}

export interface CaptionBoxProps extends React.ComponentProps<typeof Textarea> {
	error?: string;
	onEditClick?: () => void;
}

export type SharePlatform =
	| "x"
	| "whatsapp"
	| "telegram"
	| "facebook";
