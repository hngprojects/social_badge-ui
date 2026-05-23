export type NavigationLink = {
  label: string;
  icon: string;
  activeIcon: string;
  href: string;
};

export const navigationLinks: NavigationLink[] = [
  {
    label: "Dashboard",
    icon: "/assets/dashboard/icons/home.svg",
    activeIcon: "/assets/dashboard/icons/home-active.svg",
    href: "/dashboard",
  },
  {
    label: "Create Badges",
    icon: "/assets/dashboard/icons/badges.svg",
    activeIcon: "/assets/dashboard/icons/badges-active.svg",
    href: "/create-badges",
  },
  {
    label: "Templates",
    icon: "/assets/dashboard/icons/template.svg",
    activeIcon: "/assets/dashboard/icons/template-active.svg",
    href: "/templates",
  },
];
