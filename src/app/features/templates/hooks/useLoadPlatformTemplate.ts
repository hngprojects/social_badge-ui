"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { LayoutTemplate } from "@/app/(dashboard)/types/dashboard";
import {
  extractPlatformTemplates,
  mapPlatformTemplateToLayout,
} from "../lib/map-platform-template";
import { getPlatformTemplate, getPlatformTemplates } from "../services/templates";

function findInPlatformTemplateCache(
  queryClient: ReturnType<typeof useQueryClient>,
  templateId: string,
): LayoutTemplate | null {
  const entries = queryClient.getQueriesData<LayoutTemplate[]>({
    queryKey: ["platform-templates"],
  });

  for (const [, templates] of entries) {
    const match = templates?.find((tpl) => tpl.id === templateId);
    if (match) return match;
  }

  return null;
}

/** Loads platform template + canvas_data for /customize (gallery uses thumbnails only). */
export function useLoadPlatformTemplate(platformTemplateId: string | null) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["platform-template", platformTemplateId],
    enabled: Boolean(platformTemplateId),
    queryFn: async (): Promise<LayoutTemplate | null> => {
      if (!platformTemplateId) return null;

      const cached = findInPlatformTemplateCache(queryClient, platformTemplateId);
      if (cached) return cached;

      try {
        const response = await getPlatformTemplate(platformTemplateId);
        return mapPlatformTemplateToLayout(response.data);
      } catch {
        const listResponse = await getPlatformTemplates({ page: 1, limit: 100 });
        const items = extractPlatformTemplates(listResponse.data);
        const match = items.find((tpl) => tpl.id === platformTemplateId);
        return match ? mapPlatformTemplateToLayout(match) : null;
      }
    },
    retry: 1,
  });
}
