"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { OrganiserTemplatePayload } from "../types/canvas-data";
import { storePublishedBadgeResult } from "../lib/published-badge-session";
import {
  buildEditTemplateRequest,
  createOrganiserTemplateInstance,
  publishOrganiserTemplate,
  updateOrganiserTemplate,
} from "../services/templates";

interface SaveVariables {
  payload: OrganiserTemplatePayload;
  organiserTemplateId?: string | null;
}

/**
 * Publish flow (per API):
 * 1. POST /templates/organizer/instances — create instance from platform template (new only)
 * 2. PATCH /templates/organizer/{id} — persist canvas_data and metadata
 * 3. POST /templates/organizer/{id}/publish — go live and receive share_slug
 */
export function useSaveOrganiserTemplate() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ payload, organiserTemplateId }: SaveVariables) => {
      let templateId = organiserTemplateId ?? null;

      if (!templateId) {
        const created = await createOrganiserTemplateInstance(
          payload.platform_template_id,
        );
        templateId = created.data.instance_id;
      }

      await updateOrganiserTemplate(templateId, buildEditTemplateRequest(payload));

      const published = await publishOrganiserTemplate(templateId);
      return published.data;
    },
    onSuccess: (data) => {
      toast.success("Badge template published successfully.");
      const slug = data.share_slug;
      if (slug) {
        storePublishedBadgeResult(data);
        router.push(`/badges/published?slug=${encodeURIComponent(slug)}`);
      } else {
        router.push("/dashboard");
      }
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ??
        "Failed to publish template. Please try again.";
      toast.error(message);
    },
  });

  return {
    saveTemplate: mutation.mutate,
    saveTemplateAsync: mutation.mutateAsync,
    isSaving: mutation.isPending,
    error: mutation.error,
  };
}
