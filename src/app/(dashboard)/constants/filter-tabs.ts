export const filterTabs = [
  "all",
  "trending",
  // "festivals",
  // "hackathons",
  "conferences",
  // "community",
  // "bootcamp",
  // "meetups",
  // "speakers",
] as const;

export type FilterTab = (typeof filterTabs)[number];
