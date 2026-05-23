import type { CanvasData } from "./canvas-data";

/** Mirrors auth API envelope: { status, message, data }. */
export interface ApiEnvelope<T> {
  status: string;
  message: string;
  data: T;
}

export interface PlatformTemplate {
  id: string;
  title: string;
  category?: string;
  description?: string;
  thumbnail_url?: string;
  preview_url?: string;
  image_url?: string;
  card_bg?: string;
  usage_count?: number;
  share_rate?: number;
  is_most_picked?: boolean;
  features?: string[];
  canvas_data?: CanvasData;
}

export interface PlatformTemplatesListData {
  templates?: PlatformTemplate[];
  items?: PlatformTemplate[];
  results?: PlatformTemplate[];
  page?: number;
  limit?: number;
  total?: number;
  total_pages?: number;
}

export type PlatformTemplatesResponse = ApiEnvelope<PlatformTemplatesListData>;

export interface PlatformTemplatesQuery {
  page?: number;
  limit?: number;
}
