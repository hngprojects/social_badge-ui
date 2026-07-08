import type { ComponentType } from "react";
import {
	Layout1,
	Layout4,
	Layout7,
	Layout9,
} from "./platform-layouts";
import {
	LayoutCard1,
	LayoutCard2,
	LayoutCard3,
	LayoutCard4,
	LayoutCard5,
} from "./hng-layouts";
import type { TemplateLayoutProps } from "./types";

const layoutComponents = {
	bold_name_pink_v1: Layout1,
	circle_photo_dark_v1: Layout4,
	dark_name_photo_v1: Layout7,
	split_purple_teal_v1: Layout9,
	hng_finalist_design_v1: LayoutCard4,
	hng_finalist_dev_v1: LayoutCard1,
	hng_finalist_pm_v1: LayoutCard2,
	hng_finalist_v1: LayoutCard3,
	hng_finalist_flaretag_v1: LayoutCard5,
	card_1: LayoutCard1,
	card_2: LayoutCard2,
	card_3: LayoutCard3,
	card_4: LayoutCard4,
};

export type LayoutId = keyof typeof layoutComponents;

export const LAYOUT_COMPONENTS: Record<
	LayoutId,
	ComponentType<TemplateLayoutProps>
> = layoutComponents;
