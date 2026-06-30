import { NavigationLink, SearchItem } from "./types";


// Refresh Time
export const DASHBOARD_REFETCH_INTERVAL_MS = 10000;
export const DASHBOARD_STALE_TIME_MS = 5000;


export const SEARCH_ITEMS: SearchItem[] = [
  {
    title: "Design Week Lagos",
    description: "summit badge layout",
    href: "/create-badges/customize?template=bold_name_pink_v1",
    group: "Badge layouts",
    searchText: "design week lagos summit pink",
  },
  {
    title: "Dark Circle",
    description: "conference badge layout",
    href: "/create-badges/customize?template=circle_photo_dark_v1",
    group: "Badge layouts",
    searchText: "dark circle conference",
  },
  {
    title: "Dark Name Card",
    description: "conference badge layout",
    href: "/create-badges/customize?template=dark_name_photo_v1",
    group: "Badge layouts",
    searchText: "dark name card conference",
  },
  {
    title: "Split Purple Teal",
    description: "conference badge layout",
    href: "/create-badges/customize?template=split_purple_teal_v1",
    group: "Badge layouts",
    searchText: "split purple teal conference",
  },
];

// SideBar
export const navigationLinks: NavigationLink[] = [
  {
    label: "Dashboard",
    icon: "/assets/dashboard/icons/home.svg",
    activeIcon: "/assets/dashboard/icons/home-active.svg",
    href: "/dashboard",
  },
  {
    label: "Badges",
    icon: "/assets/dashboard/icons/badges.svg",
    activeIcon: "/assets/dashboard/icons/badges-active.svg",
    href: "/create-badges",
  },
  {
    label: "Settings",
    icon: "/assets/dashboard/icons/settings.svg",
    activeIcon: "/assets/dashboard/icons/settings-active.svg",
    href: "/settings",
  },
  {
    label: "Help",
    icon: "/assets/dashboard/icons/help.svg",
    activeIcon: "/assets/dashboard/icons/help.svg",
    href: "/contact",
  },
  // Not functional yet — re-enable when routes are ready.
  // {
  //   label: "Templates",
  //   icon: "/assets/dashboard/icons/template.svg",
  //   activeIcon: "/assets/dashboard/icons/template-active.svg",
  //   href: "/templates",
  // },
];

