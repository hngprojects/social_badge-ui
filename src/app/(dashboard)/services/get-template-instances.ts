import { OrganizerTemplatesResponse } from "../types/dashboard/organizer-template-instances";
import { apiClient } from "@/lib/api/client";

export async function getOrganizerTemplateInstances(page = 1, limit = 20) {
  const body = await apiClient<OrganizerTemplatesResponse>(
    "/templates/organizer/instances",
    {
      method: "GET",
      params: { page, limit },
    },
  );

  return {
    ...body.data,
    templates: body.data.templates.map((t) => ({
      ...t,
      status: t.status === "published" ? "live" : t.status,
    })),
  };
}