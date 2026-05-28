import { Template, StatCard } from "../types/dashboard/dashboard";
import { TemplateData } from "../types/dashboard/dashboard";
import { LayoutTemplate } from "../types/dashboard/dashboard";
import { Badge, Filter, Status } from "../types/dashboard/dashboard";
import { OrganizerTemplateInstance } from "../types/dashboard/organizer-template-instances";

export const templates: Template[] = [
  {
    id: 1,
    title: "Achieveher",
    type: "summit",
    creator: "@techevents",
    target: "High engagement",
    badgeCount: "4,230",
    image: "/assets/landing-page/template-10.png",
    tag: "Trending",
    hasShadow: true,
    bg: "linear-gradient(rgb(255,240,244), rgb(255,228,218))",
  },
  {
    id: 2,
    title: "Dev Summit '26",
    type: "Conference",
    creator: "@techevents",
    target: "High engagement",
    badgeCount: "4,230",
    image: "/assets/landing-page/template-2.png",
    tag: "Trending",
    hasShadow: true,
    bg: "linear-gradient(rgb(180,180,180), rgb(241,239,232))",
  },
  {
    id: 3,
    title: "Next Gen Meetup",
    type: "meetup",
    creator: "@techevents",
    target: "Newcomer",
    badgeCount: "1,650",
    image: "/assets/landing-page/template-9.png",
    tag: null,
    bg: "linear-gradient(rgb(202, 200, 204), rgb(202, 197, 209))",
  },
  {
    id: 4,
    title: "Founder's Circle",
    type: "vip event",
    creator: "@techevents",
    target: "VIP audience",
    badgeCount: "980",
    image: "/assets/landing-page/template-17.png",
    tag: null,
    bg: "linear-gradient(rgb(231, 255, 235), rgb(138, 181, 144))",
  },
];

export const stats: StatCard[] = [
  {
    image: "/assets/dashboard/icons/CheckCircle.svg",
    title: "total badges",
    count: "0",
    bg: "#DCFCE7",
  },
  {
    image: "/assets/dashboard/icons/active-badges.svg",
    title: "active badges",
    count: "0",
    bg: "#DCFCE7",
  },
  {
    image: "/assets/dashboard/icons/ui-link.svg",
    title: "total links",
    count: "0",
    bg: "#DCE6FD",
  },
  {
    image: "/assets/dashboard/icons/ui-share.svg",
    title: "total shares",
    count: "0",
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

export const BADGES: Badge[] = [
  {
    id: 1,
    name: "Achieveher Summit '26",
    type: "Summit",
    url: "https://badge.build/achieveher",
    status: "Live",
    lastEdited: "Just now",
    clicks: 0,
    shares: 0,
    iconBg: "#F97066",
    iconImg: "/assets/landing-page/template-2.png",
  },
  {
    id: 2,
    name: "Dev Summit '26",
    type: "Conference",
    url: "https://badge.build/devsummit",
    status: "Live",
    lastEdited: "2 days ago",
    clicks: 1420,
    shares: 214,
    iconBg: "#2D3A6B",
    iconImg: "/assets/landing-page/template-2.png",
  },
  {
    id: 3,
    name: "Q3 Founder Meetup",
    type: "VIP",
    url: "https://badge.build/founders-q3",
    status: "Live",
    lastEdited: "1 week ago",
    clicks: 11032,
    shares: 1840,
    iconBg: "#3B4B7A",
    iconImg: "/assets/landing-page/template-2.png",
  },
  {
    id: 4,
    name: "Internal Workshop '26",
    type: "Workshop",
    url: "https://badge.build/workshop-26",
    status: "Archived",
    lastEdited: "9 hours ago",
    clicks: 248,
    shares: 37,
    iconBg: "#2D3A6B",
    iconImg: "/assets/landing-page/template-2.png",
  },
  {
    id: 5,
    name: "Hackathon Berlin",
    type: "Hackathon",
    url: "Not yet published",
    status: "Draft",
    lastEdited: "2 days ago",
    clicks: null,
    shares: null,
    iconBg: "#3BAD7A",
    iconImg: "/assets/landing-page/template-2.png",
  },
];

export const FILTERS: Filter[] = ["All", "Live", "Draft", "Archived"];

export const STATUS_STYLES: Record<
  Status,
  { bg: string; text: string; dot: string; border?: string }
> = {
  Live: {
    bg: "#ECFDF3",
    text: "#15803D",
    dot: "#22C55E",
  },
  Draft: {
    bg: "#F9FAFB",
    text: "#6B7280",
    dot: "#9CA3AF",
    border: "1px solid #E5E7EB",
  },
  Archived: {
    bg: "#FFFBEB",
    text: "#B45309",
    dot: "#F59E0B",
  },
};

export const STATUS_STYLES_LOWERCASE = {
  draft: STATUS_STYLES.Draft,
  live: STATUS_STYLES.Live,
} satisfies Record<
  OrganizerTemplateInstance["status"],
  { bg: string; text: string; dot: string; border?: string }
>;
