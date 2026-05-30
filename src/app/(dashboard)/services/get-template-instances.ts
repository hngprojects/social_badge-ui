import {
  OrganizerTemplateInstance,
  OrganizerTemplatesResponse,
} from "../types/dashboard/organizer-template-instances";
import { apiClient } from "@/lib/api/client";

const ORGANIZER_TEMPLATE_INSTANCES_ENDPOINT = "/badges";

export type OrganizerTemplateInstancesResult = Omit<
  OrganizerTemplatesResponse["data"],
  "badges" | "templates"
> & {
  templates: OrganizerTemplateInstance[];
};

export async function getOrganizerTemplateInstances(
  page = 1,
  limit = 20,
): Promise<OrganizerTemplateInstancesResult> {
  const body = await apiClient<OrganizerTemplatesResponse>(
    ORGANIZER_TEMPLATE_INSTANCES_ENDPOINT,
    {
      method: "GET",
      params: { page, limit },
    },
  );

  const badges = body.data.badges ?? body.data.templates ?? [];

  const templates: OrganizerTemplateInstance[] = badges.map(
    (t) => ({
      ...t,
      status:
        t.is_published || t.status === "published" || t.status === "live"
          ? "live"
          : "draft",
    }),
  );

  return {
    ...body.data,
    templates,
  };
}
