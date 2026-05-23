export const filterTabs = ["all", "trending", "conferences"] as const;

export type FilterTab = (typeof filterTabs)[number];
