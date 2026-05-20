export type Template = {
	id: number;
	title: string;
	type: string;
	creator: string;
	location: string;
	badgeCount: string;
	image: string;
	tag?: string | null;
	hasShadow?: boolean;
	bg: string;
};

export type StatCard = {
	image: string;
	title: string;
	count: string;
	metrics: string;
	bg: string;
};

export interface TemplateData {
	id: string;
	title: string;
	category: string;
	image_url: string;
}

export type Status = "Live" | "Draft" | "Archived";
export type Filter = "All" | Status;

export interface Badge {
	id: number;
	name: string;
	type: string;
	url: string;
	status: Status;
	lastEdited: string;
	clicks: number | null;
	shares: number | null;
	iconBg: string;
	iconImg: string;
}
