import { OrganizerTemplateInstance, Status } from "../dashboardLayout/types";
import { TemplateFilter } from "./types";
import { StatCard } from "./types";

export const FILTERS: TemplateFilter[] = ["All", "Draft", "Live"];

export const FILTER_TABS = [
  "All layouts",
  "Summit",
  "Conference",
  "Internship",
];

export const RECENT_BADGES_LIMIT = 3;

export const STATS: StatCard[] = [
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

};

export const STATUS_STYLES_LOWERCASE = {
  draft: STATUS_STYLES.Draft,
  live: STATUS_STYLES.Live,
} satisfies Record<
  OrganizerTemplateInstance["status"],
  { bg: string; text: string; dot: string; border?: string }
>;