import type { ApiEnvelope } from "./platform-template";
import type { CanvasData } from "./canvas-data";

export interface CreateTemplateInstanceRequest {
  platform_template_id: string;
}

export interface TemplateInstanceResponse {
  id: string;
  platform_template_id: string;
  organiser_id: string;
  created_at: string;
}

export interface EditTemplateRequest {
  title?: string | null;
  canvas_data?: CanvasData | null;
default_caption?: string | null | undefined;
destination_link?: string | null | undefined;
  thumbnail_url?: string | null;
  access_type?: number | null;
  access_code?: string | null;
  hashtags?: string[] | null;
}

export interface OrganiserTemplateDetail {
  id: string;
  platform_template_id: string;
  title: string;
  canvas_data: CanvasData;
  default_caption?: string | null;
  destination_link?: string | null;
  thumbnail_url?: string | null;
  logo_url?: string | null;
  access_type: number;
  access_code?: string | null;
  is_published?: boolean;
  share_slug?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
  hashtags?: string[];
}

export interface PublishedTemplateData {
  id: string;
  title: string;
  is_published: boolean;
  total_shares?: number;
  published_at: string | null;
  share_slug: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface OrganiserTemplateSummary {
  id: string;
  title: string;
  platform_template_id: string;
  thumbnail_url?: string | null;
  is_published: boolean;
  share_slug?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  status: string;
}

export interface OrganiserTemplateListData {
  badges?: OrganiserTemplateSummary[];
  templates?: OrganiserTemplateSummary[];
  total: number;
  page: number;
  limit: number;
  prev?: string | null;
  next?: string | null;
}

export type CreateTemplateInstanceApiResponse = ApiEnvelope<TemplateInstanceResponse>;
export type EditTemplateApiResponse = ApiEnvelope<OrganiserTemplateDetail>;
export type PublishTemplateApiResponse = ApiEnvelope<PublishedTemplateData>;
export type OrganiserTemplateListApiResponse = ApiEnvelope<OrganiserTemplateListData>;
