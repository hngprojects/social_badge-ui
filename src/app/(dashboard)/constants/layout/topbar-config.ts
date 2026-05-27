import { TopBarConfigItem } from "../../types/dashboard/topbar";

export const topBarConfig: TopBarConfigItem[] = [
  {
    match: "/dashboard",
    search: "Search for Events, Badges, Attendees...",
    action: {
      label: "Create new badge",
      isOrange: true,
      href: "/create-badges",
    },
  },
  {
    match: "/create-badges",
    backButton: true,
    title: "New badge",
    step: "1",
    stepCount: "2",
  },
  {
    match: "/create-badges/customize",
    backButton: true,
    title: "Customize",
    step: "2",
    stepCount: "2",
    actions: [
      {
        label: "Preview as attendee",
        href: "",
        icon: "/assets/dashboard/icons/arrow-left.svg",
      },
      { label: "Save draft", href: "" },
      {
        label: "Publish",
        isOrange: true,
        href: "/badges/published",
        icon: "/assets/dashboard/icons/arrow-narrow-up-right.svg",
      },
    ],
  },
  {
    match: "/badges/published",
    title: "Published badge",
  },
  {
    match: "/settings",
    search: "Search for Events, Badges, Attendees...",
    action: {
      label: "Create new badge",
      isOrange: true,
      href: "/create-badges",
    },
  },
  {
    match: "/support",
    title: "Help",
  },
];
