type BadgeTag = "Trending" | "New" | null;

export type Template = {
  id: number;
  title: string;
  type: string;
  creator: string;
  location: string;
  badgeCount: string;
  image: string;
  tag: BadgeTag;
  hasShadow?: boolean;
};
