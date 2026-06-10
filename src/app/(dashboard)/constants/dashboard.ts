import { StatCard } from "../types/dashboard/dashboard";
import { Badge, Filter, Status } from "../types/dashboard/dashboard";
import { OrganizerTemplateInstance } from "../types/dashboard/organizer-template-instances";

export const stats: StatCard[] = [
  {
    image: "/assets/dashboard/icons/CheckCircle.svg",
    title: "total badges",
    count: "0",
    bg: "#DCFCE7",
  },
  {
    image: "/assets/dashboard/icons/active-badges.svg",
    title: "live badges",
    count: "0",
    bg: "#DCFCE7",
  },
  {
    image: "/assets/dashboard/icons/ui-link.svg",
    title: "total link clicks",
    count: "0",
    bg: "#DCE6FD",
  },
  {
    image: "/assets/dashboard/icons/ui-share.svg",
    title: "total shares",
    count: "0",
    bg: "#FEF3C7",
  },
  {
    image: "/assets/dashboard/icons/folder-open.svg",
    title: "total drafts",
    count: "0",
    bg: "#DCEFFC",
  },
];

export const FILTER_TABS = [
  "All layouts",
  "Summit",
  "Conference",
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
