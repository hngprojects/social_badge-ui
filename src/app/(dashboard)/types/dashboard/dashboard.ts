import type { CanvasData } from "@/app/features/templates/types/canvas-data";

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
  metrics?: string;
  bg: string;
};

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

  /** Passed to /customize only - gallery cards use thumbnail_url. */
  canvasData?: CanvasData;
}

export type Status = "Live" | "Draft" | "Archived";
export type Filter = "All" | Status;

export interface Badge {
  id: number;
  name: string;
  type: string;
  url: string;
  status: Status;
  lastEdited: string;
  clicks: number | null;
  shares: number | null;
  iconBg: string;
  iconImg: string;
}
