import {
  OrganizerTemplateInstance,
  OrganizerTemplatesResponse,
} from "../types/dashboard/organizer-template-instances";
import { apiClient } from "@/lib/api/client";

const ORGANIZER_TEMPLATE_INSTANCES_ENDPOINT = "/templates/organizer/instances";

export type OrganizerTemplateInstancesResult = Omit<
  OrganizerTemplatesResponse["data"],
  "templates"
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

  const templates: OrganizerTemplateInstance[] = body.data.templates.map(
    (t) => ({
      ...t,
      status: t.status === "published" ? "live" : "draft",
    }),
  );

  return {
    ...body.data,
    templates,
  };
}
