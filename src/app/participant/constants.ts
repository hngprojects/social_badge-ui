import { SocialPlatform } from "./types";

export const DEFAULT_CAPTION =
	"I'm at #AchieverSummit26 this weekend — building the next chapter with founders I admire. Who's joining? badge.build/achiever";

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
	{
		id: "whatsapp",
		name: "WhatsApp",
		icon: "/assets/participant/whatsapp.svg",
	},
	{
		id: "facebook",
		name: "Facebook",
		icon: "/assets/participant/facebook.svg",
	},
	{
		id: "x",
		name: "X",
		icon: "/assets/participant/twitter.svg",
	},
	{
		id: "telegram",
		name: "Telegram",
		icon: "/assets/participant/telegram.svg",
	},
];

export const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const containerVariants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.15, delayChildren: 0.15 },
	},
};

export const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: EASE },
	},
};
