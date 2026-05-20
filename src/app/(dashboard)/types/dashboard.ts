export type Template = {
  id: number;
  title: string;
  type: string;
  creator: string;
  target: string;
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
  bg: string;
};
