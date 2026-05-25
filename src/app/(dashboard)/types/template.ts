export type Template = {
  id: number | string;
  title: string;
  type: string;
  creator: string;
  location: string;
  badgeCount: string;
  image: string;
  tag: string | null;
  hasShadow?: boolean;
  bg?: string;
};
