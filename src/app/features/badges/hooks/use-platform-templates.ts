"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatformTemplates } from "../services/templates";
import {
  extractPlatformTemplates,
  mapPlatformTemplatesToLayouts,
} from "../lib/map-platform-template";
import { LayoutTemplate } from "../../dashboardLayout/types";
import { PlatformTemplatesQuery } from "../components/badge-preview/types";

export function usePlatformTemplates(
  query: PlatformTemplatesQuery = { page: 1, limit: 10 },
) {
  return useQuery({
    queryKey: ["platform-templates", query.page ?? 1, query.limit ?? 10],
    queryFn: async (): Promise<LayoutTemplate[]> => {
      const response = await getPlatformTemplates(query);
      const items = extractPlatformTemplates(response.data);
      return mapPlatformTemplatesToLayouts(items);
    },
  });
}
