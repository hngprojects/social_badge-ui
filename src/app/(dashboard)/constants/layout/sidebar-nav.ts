import { NavigationLink } from "../../types/dashboard/sidebar-nav";

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
    label: "Support",
    icon: "/assets/dashboard/icons/support.svg",
    activeIcon: "/assets/dashboard/icons/support.svg",
    href: "/support",
  },
  // Not functional yet — re-enable when routes are ready.
  // {
  //   label: "Templates",
  //   icon: "/assets/dashboard/icons/template.svg",
  //   activeIcon: "/assets/dashboard/icons/template-active.svg",
  //   href: "/templates",
  // },
];
