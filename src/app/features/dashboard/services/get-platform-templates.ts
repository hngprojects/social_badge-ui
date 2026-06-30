import { apiClient } from "@/lib/api/client";
import { PlatformTemplatesResponse } from "../../dashboardLayout/types";

const PLATFORM_TEMPLATES_ENDPOINT = "/templates/platform";

export async function getPlatformTemplates(page = 1, limit = 100) {
  const body = await apiClient<PlatformTemplatesResponse>(
    PLATFORM_TEMPLATES_ENDPOINT,
    {
      method: "GET",
      params: { page, limit },
    },
  );

  return body.data;
}
