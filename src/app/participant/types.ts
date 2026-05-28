import { Textarea } from "@/components/ui/textarea";
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
	| "facebook"
	| "linkedin"
	| "instagram";
