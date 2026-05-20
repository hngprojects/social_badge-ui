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


export interface TemplateData {
  id: string;
  title: string;
  category: string;
  image_url: string;
}


export interface LayoutTemplate {
  id: string;
  title: string;
  category: string;
  image_url: string;
  card_bg: string;
  usageCount: string;
  shareRate: string;
  isMostPicked: boolean;
  description: string;
  features: string[];
}
