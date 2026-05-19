export type Template = {
  id: number;
  title: string;
  type: string;
  creator: string;
  location: string;
  badgeCount: string;
  image: string;
  tag?: string | null;
  hasShadow?: boolean;
  bg: string;
};

export type StatCard = {
  image: string;
  title: string;
  count: string;
  metrics: string;
  bg: string;
};
