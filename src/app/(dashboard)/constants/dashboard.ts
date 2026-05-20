import { Template, StatCard } from "../types/dashboard";

export const templates: Template[] = [
  {
    id: 1,
    title: "Achieveher",
    type: "summit",
    creator: "@techevents",
    target: "High engagement",
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
    target: "High engagement",
    badgeCount: "4,230",
    image: "/assets/landing-page/template-2.png",
    tag: "Trending",
    hasShadow: true,
    bg: "#F0F0E8",
  },
  {
    id: 2,
    title: "Next Gen Meetup",
    type: "meetup",
    creator: "@techevents",
    target: "Newcomer",
    badgeCount: "1,650",
    image: "/assets/landing-page/template-7.png",
    tag: null,
    bg: "#B1F4E7",
  },
  {
    id: 3,
    title: "Founder's Circle",
    type: "vip event",
    creator: "@techevents",
    target: "VIP audience",
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
    bg: "#DCFCE7",
  },
  {
    image: "/assets/dashboard/icons/CheckCircle.svg",
    title: "active badges",
    count: "0",
    bg: "#DCFCE7",
  },
  {
    image: "/assets/dashboard/icons/total-links.svg",
    title: "total links",
    count: "0",
    bg: "#DCE6FD",
  },
  {
    image: "/assets/dashboard/icons/total-shares.svg",
    title: "total shares",
    count: "0",
    bg: "#FEF3C7",
  },
];
