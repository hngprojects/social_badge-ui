export type OrganizerTemplateInstanceRaw = {
  id: string;
  title: string;
  platform_template_id: string;
  is_published: boolean;
  status: "draft" | "published";
  share_slug: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
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
    templates: OrganizerTemplateInstanceRaw[];
    total: number;
    page: number;
    limit: number;
  };
};
