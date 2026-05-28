import { SocialPlatform } from "./types";

export const DEFAULT_CAPTION =
	"I'm at #AchieverSummit26 this weekend — building the next chapter with founders I admire. Who's joining? badge.build/achiever";

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
	{
		id: "whatsapp",
		name: "WhatsApp",
		icon: "/assets/participant/whatsapp.png",
	},
	{
		id: "facebook",
		name: "Facebook",
		icon: "/assets/participant/facebook.png",
	},
	{
		id: "x",
		name: "X",
		icon: "/assets/participant/x.png",
	},
	{
		id: "instagram",
		name: "Instagram",
		icon: "/assets/participant/instagram.png",
	},
	{
		id: "linkedin",
		name: "LinkedIn",
		icon: "/assets/participant/linkedin.png",
	},
	{
		id: "telegram",
		name: "Telegram",
		icon: "/assets/participant/telegram.png",
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
