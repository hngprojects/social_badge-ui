import { BadgeState } from "../../../types/badge";

export interface Props {
	badge: BadgeState;
}

export interface BadgeLayoutVariant {
	root: string;
	topBand: {
		wrapper: string;
		avatarOuter: string;
		eventOuter: string;
		eventText: string;
	};
	identity: { wrapper: string; name: string; role: string };
	decorativeCircle: string;
	decorativeSquarePosition: string;
}
