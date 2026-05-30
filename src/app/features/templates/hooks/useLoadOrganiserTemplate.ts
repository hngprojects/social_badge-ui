"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrganiserTemplate } from "../services/templates";
import { parseCanvasDataToEditorState } from "../lib/parse-canvas-data";

export function useLoadOrganiserTemplate(organiserTemplateId: string | null) {
  return useQuery({
    queryKey: ["organiser-template", organiserTemplateId],
    queryFn: async () => {
      if (!organiserTemplateId) return null;
      const response = await getOrganiserTemplate(organiserTemplateId);
      return parseCanvasDataToEditorState(
        response.platform_template_id,
        response.canvas_data,
        {
          title: response.title,
          default_caption: response.default_caption,
          destination_link: response.destination_link,
          hashtags: response.hashtags,
          access_type: response.access_type,
          updated_at: response.updated_at,
        },
      );
    },
    enabled: Boolean(organiserTemplateId),
    retry: 1,
  });
}
