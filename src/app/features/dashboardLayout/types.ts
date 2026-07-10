
import type { CanvasData } from "@/app/features/customize/canvas-data";

// Topbar
type TopBarActionBase = {
  label: string;
  icon?: string;
  isOrange?: boolean;
};

export type TopBarAction =
  | (TopBarActionBase & {
      href: string;
      onClick?: never;
    })
  | (TopBarActionBase & {
      href?: never;
      onClick: () => void;
    });

export type TopBarConfigItem = {
  match: string;
  search?: string;
  backButton?: boolean;
  title?: string;
  step?: string;
  stepCount?: string;
  action?: TopBarAction;
  actions?: TopBarAction[];
};

export type CustomizeBarProps = {
  config: TopBarConfigItem;
  title: string;
};

export type PublishedBarProps = {
  status: string;
  editHref: string;
  title: string;
};

// SideNav
export type NavigationLink = {
  label: string;
  icon: string;
  activeIcon: string;
  href: string;
};

// Search
export type SearchItem = {
  title: string;
  description: string;
  href: string;
  group: string;
  searchText: string;
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
  /** Passed to /customize only — gallery cards use thumbnail_url. */
  canvasData?: CanvasData;
}

export interface TemplateData {
  id: string;
  title: string;
  category: string;
  image_url: string;
}

export type Status = "Live" | "Draft" ;
export type Filter = "All" | Status;


// Platform Templates
export type PlatformTemplate = {
  id: string;
  title: string;
  category: string;
   thumbnail_url: string | null;
  canvas_data: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PlatformTemplatesResponse = {
  status: "success";
  message: string;
  data: {
    templates: PlatformTemplate[];
    total: number;
    page: number;
    limit: number;
    prev?: string | null;
    next?: string | null;
  };
};

// Templates
export type OrganizerTemplateInstanceRaw = {
  id: string;
  title: string;
  platform_template_id: string;
  is_published: boolean;
  status: "draft" | "published" | "live";
  share_slug: string | null;
  total_shares: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  access_type?: number;
  access_code?: string | null;
};

export type OrganizerTemplateInstance = Omit<
  OrganizerTemplateInstanceRaw,
  "status"
> & {
  status: "draft" | "live";
};

export type OrganizerTemplatesResponse = {
  status: "success";
  message: string;
  data: {
    badges?: OrganizerTemplateInstanceRaw[];
    templates?: OrganizerTemplateInstanceRaw[];
    total: number;
    page: number;
    limit: number;
  };
};

