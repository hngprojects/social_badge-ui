"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  organizerTemplateInstancesKey,
  organizerTemplateInstancesRootKey,
} from "@/app/(dashboard)/hooks/use-organizer-template-instances";
import { badgeAnalyticsKey } from "@/app/(dashboard)/hooks/use-badge-analytics";
import { RECENT_BADGES_LIMIT } from "@/app/(dashboard)/components/dashboard/recent-badges-types";
import type { OrganizerTemplateInstancesResult } from "@/app/(dashboard)/services/get-template-instances";
import type { OrganiserTemplatePayload } from "../types/canvas-data";
import { storePublishedBadgeResult } from "../lib/published-badge-session";
import {
  buildEditTemplateRequest,
  createOrganiserTemplateInstance,
  publishOrganiserTemplate,
  updateOrganiserTemplate,
  uploadLogo,
} from "../services/templates";

interface SaveVariables {
  payload: OrganiserTemplatePayload;
  organiserTemplateId?: string | null;
  pendingLogoFile?: File | null;
}

/**
 * Publish flow (per API):
 * 1. POST /badges — create instance from platform template (new only)
 * 2. PUT /badges/{id}/logo — upload logo if pendingLogoFile is provided
 * 3. PATCH /badges/{id} — persist canvas_data and metadata
 * 4. POST /badges/{id}/publish — go live and receive share_slug
 */
export function useSaveOrganiserTemplate() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ payload, organiserTemplateId, pendingLogoFile }: SaveVariables) => {
      let templateId = organiserTemplateId ?? null;

      if (!templateId) {
        const created = await createOrganiserTemplateInstance(
          payload.platform_template_id,
        );
        templateId = created.data.id;
      }

      let finalPayload = payload;

      if (pendingLogoFile) {
        const uploaded = await uploadLogo(pendingLogoFile, templateId);
        finalPayload = {
          ...payload,
          canvas_data: {
            ...payload.canvas_data,
            logo: {
              url: uploaded.url,
              public_id: uploaded.public_id,
              position: payload.canvas_data.logo?.position ?? "top-center",
            },
          },
        };
      }

      await updateOrganiserTemplate(templateId, buildEditTemplateRequest(finalPayload));

      const published = await publishOrganiserTemplate(templateId);
      return {
        payload: finalPayload,
        published: published.data,
        templateId,
      };
    },
    onSuccess: ({ payload, published, templateId }) => {
      toast.success("Badge template published successfully.");
      const publishedBadge = {
        id: published.id || templateId,
        title: published.title || payload.title || "Untitled badge",
        platform_template_id: payload.platform_template_id,
        is_published: true,
        status: "live" as const,
        share_slug: published.share_slug,
        published_at: published.published_at,
        created_at: published.created_at ?? new Date().toISOString(),
        updated_at: published.updated_at ?? new Date().toISOString(),
      };

      queryClient.setQueriesData<OrganizerTemplateInstancesResult>(
        { queryKey: organizerTemplateInstancesRootKey },
        (prev) => {
          if (!prev) return prev;

          const existingIndex = prev.templates.findIndex(
            (template) => template.id === publishedBadge.id,
          );
          const templates =
            existingIndex >= 0
              ? prev.templates.map((template, index) =>
                  index === existingIndex
                    ? { ...template, ...publishedBadge }
                    : template,
                )
              : [publishedBadge, ...prev.templates];

          return {
            ...prev,
            total: existingIndex >= 0 ? prev.total : prev.total + 1,
            templates: templates.slice(0, prev.limit),
          };
        },
      );
      queryClient.setQueryData<OrganizerTemplateInstancesResult>(
        organizerTemplateInstancesKey(1, RECENT_BADGES_LIMIT),
        (prev) => {
          if (prev) return prev;

          return {
            templates: [publishedBadge],
            total: 1,
            page: 1,
            limit: RECENT_BADGES_LIMIT,
          };
        },
      );
      queryClient.invalidateQueries({
        queryKey: organizerTemplateInstancesRootKey,
      });
      queryClient.invalidateQueries({
        queryKey: badgeAnalyticsKey,
      });

      const slug = published.share_slug;
      if (slug) {
        storePublishedBadgeResult(published);
        router.push(`/badges/published?slug=${encodeURIComponent(slug)}`);
      } else {
        router.push("/dashboard");
      }
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response?.status === 413) {
        toast.error("Logo file is too large. Please upload a smaller image.");
        return;
      }

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
