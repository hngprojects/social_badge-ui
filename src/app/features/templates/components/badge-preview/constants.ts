export const HNG_ASSETS = {
	backgrounds: {
		dev: "/assets/badges/hng_bg_two.webp",
		pm: "/assets/badges/hng_bg_four.webp",
		default: "/assets/badges/hng_bg_three.webp",
		design: "/assets/badges/hng_bg_one.webp",
		flaretag: "/assets/badges/hng_bg_five.webp",
	},
	logos: {
		blue: "/assets/badges/hng_logo_blue.svg",
		white: "/assets/badges/hng_logo_white.svg",
		black: "/assets/badges/hng_logo_black.svg",
		orange: "/assets/badges/hng_logo_orange.svg",
	},
	decorations: {
		confetti: "/assets/badges/confetti.webp",
	},
} as const;

export const HNG_LAYOUT_IDS = new Set([
	"hng_finalist_design_v1",
	"hng_finalist_dev_v1",
	"hng_finalist_pm_v1",
	"hng_finalist_flaretag_v1",
	"hng_finalist_v1",
]);
