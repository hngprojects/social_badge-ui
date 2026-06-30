import { NextAction } from "./types";
import {
	EyeIcon,
	EditIcon,
} from "./icons/whats-next-icons";
export const NEXT_ACTIONS: NextAction[] = [
	{
		id: "preview",
		Icon: EyeIcon,
		iconBg: "bg-orange-50",
		iconColor: "text-[#e8511a]",
		title: "Preview as an attendee",
		description:
			"See exactly what visitors will experience when they tap your link.",
		cta: "Open link",
		href: "#preview",
	},
	{
		id: "edit",
		Icon: EditIcon,
		iconBg: "bg-orange-50",
		iconColor: "text-[#e8511a]",
		title: "Edit this badge",
		description:
			"Changes go live immediately. Anyone with the link sees the updated design.",
		cta: "Open link",
		href: "#edit",
	},
];
