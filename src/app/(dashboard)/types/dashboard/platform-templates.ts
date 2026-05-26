export type PlatformTemplate = {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string | null;
  canvas_data: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
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
