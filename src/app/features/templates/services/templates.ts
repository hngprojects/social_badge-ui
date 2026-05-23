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
  const formData = new FormData();
  formData.append("file", file);

  return apiClient<LogoUploadResponse>(
    `/templates/organizer/instances/${instanceId}/logo`,
    {
      method: "PUT",
      data: formData,
    },
  );
}

/** Step 1 — create a draft instance from a platform template (organiser from JWT). */
export async function createOrganiserTemplateInstance(
  platformTemplateId: string,
): Promise<CreateTemplateInstanceApiResponse> {
  return apiClient<CreateTemplateInstanceApiResponse>(
    "/templates/organizer/instances",
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
    `/templates/organizer/${templateId}`,
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
    `/templates/organizer/${templateId}/publish`,
    {
      method: "POST",
    },
  );
}

export async function getOrganiserTemplateInstances(query?: {
  page?: number;
  limit?: number;
}): Promise<OrganiserTemplateListApiResponse> {
  return apiClient<OrganiserTemplateListApiResponse>(
    "/templates/organizer/instances",
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
    `/templates/organizer/public/${encodeURIComponent(shareSlug)}`,
  );
}


export async function getOrganiserTemplate(
  templateId: string,
): Promise<OrganiserTemplateDetail> {
  const listResponse = await getOrganiserTemplateInstances({ page: 1, limit: 100 });
  const summary = listResponse.data.templates.find((tpl) => tpl.id === templateId);

  if (!summary) {
    throw new Error("Organiser template not found.");
  }

  const platformResponse = await getPlatformTemplate(summary.platform_template_id);
  const platform = platformResponse.data;

  if (!platform.canvas_data) {
    throw new Error("Platform template canvas data is missing.");
  }

  return {
    id: summary.id,
    platform_template_id: summary.platform_template_id,
    title: summary.title,
    canvas_data: platform.canvas_data,
    default_caption: null,
    destination_link: null,
    access_type: 0,
    hashtags: [],
    is_published: summary.is_published,
    share_slug: summary.share_slug,
    published_at: summary.published_at,
  };
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
    destination_link: payload.destination_link,
    hashtags: payload.hashtags,
    access_type: payload.access_type,
  };
}

export type { OrganiserTemplateListData, PublishedTemplateData };
