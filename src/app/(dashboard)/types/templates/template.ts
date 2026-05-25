import type { LayoutTemplate } from "../dashboard/dashboard";

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

export type AllTemplatesProps = {
  templates: LayoutTemplate[];
  isLoading?: boolean;
  activeTab?: string;
  currentPage?: number;
  postsPerPage?: number;
  limit?: number;
};
