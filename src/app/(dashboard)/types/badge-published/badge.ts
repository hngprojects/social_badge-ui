export interface BadgeData {
	name: string;
	slug: string;
	url: string;
	fullUrl: string;
	imageUrl: string;
	embedCode: string;
}

export interface SocialPlatform {
	id: string;
	label: string;
	getShareUrl: (url: string, name: string) => string;
	Icon: React.FC;
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
