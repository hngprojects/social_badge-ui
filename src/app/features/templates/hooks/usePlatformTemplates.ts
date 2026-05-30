"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatformTemplates } from "../services/templates";
import {
  extractPlatformTemplates,
  mapPlatformTemplatesToLayouts,
} from "../lib/map-platform-template";
import type { PlatformTemplatesQuery } from "../types/platform-template";
import type { LayoutTemplate } from "@/app/(dashboard)/types/dashboard/dashboard";

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
