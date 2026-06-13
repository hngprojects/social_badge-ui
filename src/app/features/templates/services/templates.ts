import { apiClient } from "@/lib/api/client";
import type {
  LogoUploadResponse,
  OrganiserTemplatePayload,
} from "../types/canvas-data";
import type {
  ApiEnvelope,
  PlatformTemplate,
  PlatformTemplatesQuery,
  PlatformTemplatesResponse,
} from "../types/platform-template";
import type {
  CreateTemplateInstanceApiResponse,
  EditTemplateApiResponse,
  EditTemplateRequest,
  OrganiserTemplateDetail,
  OrganiserTemplateListApiResponse,
  OrganiserTemplateListData,
  PublishTemplateApiResponse,
  PublishedTemplateData,
} from "../types/organiser-template";
import type { PublicParticipantPageResponse } from "../types/public-participant";

export async function uploadLogo(file: File, instanceId: string | null) : Promise<LogoUploadResponse> {
  if (!instanceId) {
    throw new Error("Missing organizer template istance id.")
  }

  return apiClient<LogoUploadResponse>(
    `/badges/${instanceId}/logo`,
    {
      method: "PUT",
      data: { file },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
}

/** Step 1 — create a draft instance from a platform template (organiser from JWT). */
export async function createOrganiserTemplateInstance(
  platformTemplateId: string,
): Promise<CreateTemplateInstanceApiResponse> {
  return apiClient<CreateTemplateInstanceApiResponse>(
    "/badges",
    {
      method: "POST",
      data: { platform_template_id: platformTemplateId },
    },
  );
}

/** Step 2 — save customisation (canvas_data, caption, etc.) on the instance. */
export async function updateOrganiserTemplate(
  templateId: string,
  payload: EditTemplateRequest,
): Promise<EditTemplateApiResponse> {
  return apiClient<EditTemplateApiResponse>(
    `/badges/${templateId}`,
    {
      method: "PATCH",
      data: payload,
    },
  );
}

/** Step 3 — publish the instance (sets is_published, generates share_slug on first publish). */
export async function publishOrganiserTemplate(
  templateId: string,
): Promise<PublishTemplateApiResponse> {
  return apiClient<PublishTemplateApiResponse>(
    `/badges/${templateId}/publish`,
    {
      method: "POST",
    },
  );
}

export async function unpublishOrganiserTemplate(
  templateId: string,
): Promise<PublishTemplateApiResponse> {
  return apiClient<PublishTemplateApiResponse>(
    `/badges/${templateId}/unpublish`,
    {
      method: "POST",
    },
  );
}

export async function duplicateOrganiserTemplate(
  templateId: string,
): Promise<CreateTemplateInstanceApiResponse> {
  return apiClient<CreateTemplateInstanceApiResponse>(
    `/badges/${templateId}/duplicate`,
    {
      method: "POST",
    },
  );
}

export async function deleteOrganiserTemplate(
  templateId: string,
): Promise<ApiEnvelope<void>> {
  return apiClient<ApiEnvelope<void>>(
    `/badges/${templateId}`,
    {
      method: "DELETE",
    },
  );
}

export async function getOrganiserTemplateInstances(query?: {
  page?: number;
  limit?: number;
}): Promise<OrganiserTemplateListApiResponse> {
  return apiClient<OrganiserTemplateListApiResponse>(
    "/badges",
    {
      method: "GET",
      params: {
        page: query?.page ?? 1,
        limit: query?.limit ?? 100,
      },
    },
  );
}

export async function getPlatformTemplate(
  templateId: string,
): Promise<ApiEnvelope<PlatformTemplate>> {
  return apiClient<ApiEnvelope<PlatformTemplate>>(
    `/templates/platform/${templateId}`,
  );
}

export async function getPublicParticipantPage(
  shareSlug: string,
): Promise<PublicParticipantPageResponse> {
  return apiClient<PublicParticipantPageResponse>(
    `/badges/public/${encodeURIComponent(shareSlug)}`,
  );
}

export async function validateBadgeAccess(
  shareSlug: string,
  accessCode: string,
): Promise<ApiEnvelope<void>> {
  if (!shareSlug?.trim() || !accessCode?.trim()) {
    throw new Error("Share slug and access code are required");
  }
  return apiClient<ApiEnvelope<void>>(
    `/badges/public/${encodeURIComponent(shareSlug)}/validate-access`,
    {
      method: "POST",
      data: { access_code: accessCode },
    },
  );
}


export async function getOrganiserTemplate(
  templateId: string,
): Promise<OrganiserTemplateDetail> {
  const response = await apiClient<EditTemplateApiResponse>(`/badges/${templateId}`);
  return response.data;
}

export async function getPlatformTemplates(
  query: PlatformTemplatesQuery = { page: 1, limit: 10 },
): Promise<PlatformTemplatesResponse> {
  return apiClient<PlatformTemplatesResponse>("/templates/platform", {
    method: "GET",
    params: {
      page: query.page ?? 1,
      limit: query.limit ?? 10,
    },
  });
}

export function buildEditTemplateRequest(
  payload: OrganiserTemplatePayload,
): EditTemplateRequest {
  return {
    title: payload.title,
    canvas_data: payload.canvas_data,
    default_caption: payload.default_caption,
    hashtags: payload.hashtags,
    access_type: payload.access_type,
    access_code: payload.access_code,
  };
}

export type { OrganiserTemplateListData, PublishedTemplateData };
