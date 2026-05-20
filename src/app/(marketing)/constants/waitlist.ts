import { StepDataType, BenefitSectionType, ItemType } from "../types/waitlist";

export const items: ItemType[] = [
	{
		title: "No design skills needed",
		icon: "/assets/waitlist/strip-icon-1.svg",
	},
	{
		title: "Ready in minutes",
		icon: "/assets/waitlist/strip-icon-2.svg",
	},
	{
		title: "Built for social sharing",
		icon: "/assets/waitlist/strip-icon-3.svg",
	},
];

export const stepsData: StepDataType[] = [
	{
		stepNumber: 1,
		title: "Create a badge template",
		description:
			"Upload your brand assets or choose from our stunning minimalist templates.",
		iconSrc: "/assets/waitlist/waitlist-step1.png",
	},
	{
		stepNumber: 2,
		title: "Share it with your audience",
		description:
			"Distribute your unique portal link via email, social, or embed it on your site.",
		iconSrc: "/assets/waitlist/waitlist-step2.png",
	},
	{
		stepNumber: 3,
		title: "Participants generate & share",
		description:
			"They upload a photo, generate their badge, and share it instantly to their networks.",
		iconSrc: "/assets/waitlist/waitlist-step3.png",
	},
];

export const benefits: BenefitSectionType[] = [
	{
		tag: "Tech Conferences",
		tagImg: "/assets/waitlist/waitlist-mic.svg",
		title: "Boost event visibility before launch",
		description:
			"Create hype weeks before the doors open. Speakers and attendees can flaunt their participation, driving organic ticket sales.",
		img: "/assets/waitlist/jane-idcard.png",
		bgColor: "bg-[#FFF9F6]",
		isWide: true,
	},
	{
		tag: "Hackathons",
		tagImg: "/assets/waitlist/waitlist-arrow.svg",
		title: "Get participants sharing instantly",
		description:
			"Fuel the competitive spirit and showcase builder talent across Twitter and LinkedIn.",
		img: "",
		bgColor: "bg-white",
		isWide: false,
	},
	{
		tag: "Communities",
		tagImg: "/assets/waitlist/waitlist-mic.svg",
		title: "Strengthen identity and belonging",
		description:
			"Reward your most active members with 'Founding Member' or 'Top Contributor' badges.",
		img: "",
		bgColor: "bg-white",
		isWide: false,
	},
	{
		tag: "Bootcamps",
		tagImg: "/assets/waitlist/waitlist-map.svg",
		title: "Celebrate participation and progress",
		description:
			"Give your graduates a beautiful credential to share on their socials, increasing your program's prestige.",
		img: "/assets/waitlist/sabi-girls.png",
		bgColor: "bg-[#FFF9F6]",
		isWide: true,
		reverse: true,
	},
];
