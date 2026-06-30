"use client";

import { useQuery } from "@tanstack/react-query";
import { LayoutTemplate } from "../../dashboardLayout/types";
import {
  extractPlatformTemplates,
  mapPlatformTemplateToLayout,
} from "../lib/map-platform-template";
import {
  getPlatformTemplate,
  getPlatformTemplates,
} from "../services/templates";


/** Loads platform template + canvas_data for /customize (gallery uses thumbnails only). */
export function useLoadPlatformTemplate(platformTemplateId: string | null) {
  return useQuery({
    queryKey: ["platform-template", platformTemplateId],
    enabled: Boolean(platformTemplateId),
    queryFn: async (): Promise<LayoutTemplate | null> => {
      if (!platformTemplateId) return null;

      try {
        const response = await getPlatformTemplate(platformTemplateId);
        if (!response.data) {
          throw new Error("Platform template detail response was empty");
        }
        return mapPlatformTemplateToLayout(response.data);
      } catch {
        // Fallback: search in list if detail fails
        const listResponse = await getPlatformTemplates({
          page: 1,
          limit: 100,
        });
        const items = extractPlatformTemplates(listResponse.data);
        const match = items.find((tpl) => tpl.id === platformTemplateId);
        return match ? mapPlatformTemplateToLayout(match) : null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
