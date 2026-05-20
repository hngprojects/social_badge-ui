import { Template, StatCard } from "../types/dashboard";
import { TemplateData } from "../types/dashboard";
import { LayoutTemplate } from "../../(marketing)/types/create-bage";

export const templates: Template[] = [
	{
		id: 1,
		title: "Achieveher",
		type: "summit",
		creator: "@techevents",
		location: "Virtual",
		badgeCount: "4,230",
		image: "/assets/landing-page/template-1.png",
		tag: "Trending",
		hasShadow: true,
		bg: "#E2E7D5",
	},
	{
		id: 2,
		title: "Dev Summit '26",
		type: "Conference",
		creator: "@techevents",
		location: "Virtual",
		badgeCount: "4,230",
		image: "/assets/landing-page/template-2.png",
		tag: "Trending",
		hasShadow: true,
		bg: "#F0F0E8",
	},
	{
		id: 3,
		title: "Next Gen Meetup",
		type: "meetup",
		creator: "@techevents",
		location: "Virtual",
		badgeCount: "1,650",
		image: "/assets/landing-page/template-7.png",
		tag: null,
		bg: "#B1F4E7",
	},
	{
		id: 4,
		title: "Founder's Circle",
		type: "vip event",
		creator: "@techevents",
		location: "Virtual",
		badgeCount: "980",
		image: "/assets/landing-page/template-5.png",
		tag: null,
		bg: "#ECE3F7",
	},
];

export const stats: StatCard[] = [
	{
		image: "/assets/dashboard/icons/CheckCircle.svg",
		title: "total badges",
		count: "0",
		metrics: "+0%",
		bg: "#DCFCE7",
	},
	{
		image: "/assets/dashboard/icons/CheckCircle.svg",
		title: "active badges",
		count: "0",
		metrics: "+0%",
		bg: "#DCFCE7",
	},
	{
		image: "/assets/dashboard/icons/total-links.svg",
		title: "total links",
		count: "0",
		metrics: "+0%",
		bg: "#DCE6FD",
	},
	{
		image: "/assets/dashboard/icons/total-shares.svg",
		title: "total shares",
		count: "0",
		metrics: "+0%",
		bg: "#FEF3C7",
	},
];

export const MOCK_TEMPLATES_DB: TemplateData[] = [
	{
		id: "tpl_achieveher",
		title: "Achieveher",
		category: "festivals",
		image_url: "/assets/dashboard/bg-1.png",
	},
	{
		id: "tpl_mens_summit_26",
		title: "Men's Summit 26",
		category: "conference",
		image_url: "/assets/dashboard/bg-2.png",
	},
	{
		id: "tpl_web3_summit",
		title: "Web3 Summit",
		category: "hackathon",
		image_url: "/assets/dashboard/bg-3.png",
	},
	{
		id: "tpl_founders_circle",
		title: "Founder's Circle",
		category: "conference",
		image_url: "/assets/dashboard/bg-4.png",
	},
	{
		id: "tpl_achieveher1",
		title: "Achieveher",
		category: "festival",
		image_url: "/assets/dashboard/bg-1.png",
	},
	{
		id: "tpl_mens_summit_261",
		title: "Men's Summit 26",
		category: "conference",
		image_url: "/assets/dashboard/bg-2.png",
	},
	{
		id: "tpl_web3_summit1",
		title: "Web3 Summit",
		category: "hackathon",
		image_url: "/assets/dashboard/bg-3.png",
	},
	{
		id: "tpl_founders_circle1",
		title: "Founder's Circle",
		category: "conference",
		image_url: "/assets/dashboard/bg-4.png",
	},
];

export const EXTENDED_MOCK_DB: LayoutTemplate[] = [
	{
		id: "tpl_achieveher",
		title: "Achiever",
		category: "summit",
		image_url: "/assets/dashboard/archiever-card.png",
		card_bg: "linear-gradient(to bottom, #FFF0F4, #FFE4DA)",
		usageCount: "4,230 made",
		shareRate: "18% share rate",
		isMostPicked: true,
		description: "Soft, warm aesthetic. Built for high social-share rates.",
		features: [
			"Customisable accent colour",
			"Logo upload + script title",
			"Optional attendee photo",
			"Custom name field label",
		],
	},
	{
		id: "tpl_dev_summit_26",
		title: "Dev Summit '26",
		category: "conference",
		image_url: "/assets/dashboard/dev-submmit-card.png",
		card_bg: "linear-gradient(to bottom, #B4B4B4, #F1EFE8)",
		usageCount: "4,230 made",
		shareRate: "18% share rate",
		isMostPicked: false,
		description:
			"Dark mode modern developer aesthetic. Tailored for corporate tech environments.",
		features: [
			"Dynamic hash token matrix",
			"Organization label node",
			"Strict monochrome text fields",
			"Embedded dark canvas layers",
		],
	},
	{
		id: "tpl_web3_summit",
		title: "Web3 Summit",
		category: "hackathon",
		image_url: "/assets/dashboard/adams-card.png",
		card_bg: "linear-gradient(to bottom, #CAC8CC, #CAC5D1)",
		usageCount: "1,120 made",
		shareRate: "34% share rate",
		isMostPicked: false,
		description:
			"High-contrast neon composition built explicitly for decentralized community assemblies.",
		features: [
			"Multi-chain network tags",
			"Wallet handle custom field",
			"Fluorescent badge borders",
			"Anonymized avatar presets",
		],
	},
	{
		id: "tpl_next_gen",
		title: "Next Gen Meetup",
		category: "conference",
		image_url: "/assets/dashboard/next-gen-card.png",
		card_bg: "linear-gradient(to bottom, #E7FFEB, #8AB590)",
		usageCount: "2,890 made",
		shareRate: "12% share rate",
		isMostPicked: false,
		description:
			"Clean organic layouts sporting asymmetrical border features and clean typography accents.",
		features: [
			"Asymmetric brand accent bars",
			"Localized scanning barcodes",
			"Subtle leaf/organic asset background",
			"High-contrast dynamic header typography",
		],
	},
];

export const FILTER_TABS = [
	"All layouts",
	"Summit",
	"Conference",
	"Hackathon",
	"VIP / Invite",
];
