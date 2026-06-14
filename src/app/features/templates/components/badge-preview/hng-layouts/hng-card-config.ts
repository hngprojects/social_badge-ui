import { HNG_ASSETS } from "../constants";
import type { HngCardTheme, HngCardThemeKey } from "../types";

export const HNG_CARD_THEMES = {
	dev: {
		background: HNG_ASSETS.backgrounds.dev,
		centerContent: false,
		resolveInnerProps: (textColor) => ({
			headingTextColor: "#00AEFF",
			roleBgColor: "#00AEFF",
			nameTextColor: textColor || "#000000",
			roleTextColor: textColor || "#000000",
			svgFill: "text-[#00AEFF]",
			percentIConFill: "text-white",
			logoUrl: HNG_ASSETS.logos.blue,
		}),
	},
	pm: {
		background: HNG_ASSETS.backgrounds.pm,
		centerContent: true,
		resolveInnerProps: (textColor) => ({
			roleBgColor: "#00AEFF",
			headingTextColor: "#00AEFF",
			nameTextColor: textColor || "#000000",
			roleTextColor: textColor || "#000000",
			svgFill: "text-[#00AEFF]",
			percentIConFill: "text-white",
			logoUrl: HNG_ASSETS.logos.blue,
		}),
	},
	default: {
		background: HNG_ASSETS.backgrounds.default,
		centerContent: true,
		resolveInnerProps: (textColor) => ({
			roleBgColor: "#AFF47F",
			nameTextColor: textColor || "#ffffff",
			roleTextColor: textColor || "#000000",
			logoUrl: HNG_ASSETS.logos.white,
		}),
	},
	design: {
		background: HNG_ASSETS.backgrounds.design,
		centerContent: true,
		resolveInnerProps: (textColor) => ({
			headingTextColor: "#7E65EC",
			roleBgColor: "#AFF47F",
			nameTextColor: textColor || "#000000",
			roleTextColor: textColor || "#000000",
			logoUrl: HNG_ASSETS.logos.black,
		}),
	},
	flaretag: {
		background: HNG_ASSETS.backgrounds.flaretag,
		centerContent: true,
		resolveInnerProps: (textColor) => ({
			headingTextColor: "#FF693E",
			roleBgColor: "#FFFFFF",
			roleBorderColor: "#FFD700",
			nameTextColor: textColor || "#ffffff",
			roleTextColor: textColor || "#000000",
			logoUrl: HNG_ASSETS.logos.orange,
			svgFill: "text-[#F1C21C]",
			percentIConFill: "text-white",
		}),
	},
} satisfies Record<HngCardThemeKey, HngCardTheme>;
