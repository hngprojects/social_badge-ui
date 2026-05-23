import { OrganizerTemplatesResponse } from "../types/organizer-template-instances";
import { apiClient } from "@/lib/api/client";

import { mockOrganizerTemplateInstances } from "../services/mockData";
const USE_MOCKS = false;

export async function getOrganizerTemplateInstances(page = 1, limit = 20) {
  if (USE_MOCKS) {
    console.log("service called");
    console.log("base url", process.env.NEXT_PUBLIC_API_URL);
    return {
      templates: mockOrganizerTemplateInstances,
      total: mockOrganizerTemplateInstances.length,
      page,
      limit,
    };
  }
  const body = await apiClient<OrganizerTemplatesResponse>(
    "/templates/organizer/instances",
    {
      method: "GET",
      params: { page, limit },
    },
  );

  return body.data;
}
