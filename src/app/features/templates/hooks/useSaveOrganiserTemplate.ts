"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  organizerTemplateInstancesRootKey,
} from "@/app/(dashboard)/hooks/use-organizer-template-instances";
import { badgeAnalyticsKey } from "@/app/(dashboard)/hooks/use-badge-analytics";
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
  shouldPublish?: boolean;
}

/**
 * Save flow:
 * 1. POST /badges — create instance from platform template (new only)
 * 2. PUT /badges/{id}/logo — upload logo if pendingLogoFile is provided
 * 3. PATCH /badges/{id} — persist canvas_data and metadata
 * 4. POST /badges/{id}/publish — go live (only if shouldPublish is true)
 */
export function useSaveOrganiserTemplate() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ payload, organiserTemplateId, pendingLogoFile, shouldPublish }: SaveVariables) => {
      let templateId = organiserTemplateId ?? null;

      // Step 1: Create only if new
      if (!templateId) {
        const created = await createOrganiserTemplateInstance(
          payload.platform_template_id,
        );
        templateId = created.data.id;
      }

      let finalPayload = payload;

      // Step 2: Upload logo if provided
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

      // Step 3: Patch metadata
      await updateOrganiserTemplate(templateId, buildEditTemplateRequest(finalPayload));

      // Step 4: Publish only if requested
      let publishedData = null;
      if (shouldPublish) {
        const published = await publishOrganiserTemplate(templateId);
        publishedData = published.data;
      }

      return {
        payload: finalPayload,
        published: publishedData,
        templateId,
        isNew: !organiserTemplateId,
        wasPublished: shouldPublish,
      };
    },
    onSuccess: ({ payload, published, templateId, wasPublished, isNew }) => {
      const message = wasPublished
        ? "Badge template published successfully."
        : isNew
          ? "Draft saved successfully."
          : "Changes saved successfully.";
      toast.success(message);

      const updatedBadge = {
        id: published?.id || templateId,
        title: published?.title || payload.title || "Untitled badge",
        platform_template_id: payload.platform_template_id,
        is_published: !!wasPublished,
        status: wasPublished ? ("live" as const) : ("draft" as const),
        share_slug: published?.share_slug || null,
        total_shares: published?.total_shares ?? 0,
        published_at: published?.published_at || null,
        created_at: published?.created_at || new Date().toISOString(),
        updated_at: published?.updated_at || new Date().toISOString(),
      };

      queryClient.setQueriesData<OrganizerTemplateInstancesResult>(
        { queryKey: organizerTemplateInstancesRootKey },
        (prev) => {
          if (!prev) return prev;

          const existingIndex = prev.templates.findIndex(
            (template) => template.id === updatedBadge.id,
          );
          const templates =
            existingIndex >= 0
              ? prev.templates.map((template, index) =>
                  index === existingIndex
                    ? { ...template, ...updatedBadge }
                    : template,
                )
              : [updatedBadge, ...prev.templates];

          return {
            ...prev,
            total: existingIndex >= 0 ? prev.total : prev.total + 1,
            templates: templates.slice(0, prev.limit),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: organizerTemplateInstancesRootKey,
      });
      queryClient.invalidateQueries({
        queryKey: badgeAnalyticsKey,
      });

      if (wasPublished && published?.share_slug) {
        storePublishedBadgeResult(published);
        router.push(`/badges/published?slug=${encodeURIComponent(published.share_slug)}`);
      } else {
        // Redirect to dashboard on draft save or published update
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
