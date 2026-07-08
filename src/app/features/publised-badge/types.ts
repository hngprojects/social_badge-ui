import type { ComponentType, SVGProps } from "react";
export interface BadgeData {
	name: string;
	slug: string;
	url: string;
	fullUrl: string;
	imageUrl: string;
}

export interface SocialPlatform {
	id: string;
	label: string;
	getShareUrl: (url: string, name: string) => string;
	Icon: ComponentType<SVGProps <SVGSVGElement>>;
}

export interface NextAction {
	id: string;
	Icon: React.FC;
	iconBg: string;
	iconColor: string;
	title: string;
	description: string;
	cta: string;
	href: string;
}
