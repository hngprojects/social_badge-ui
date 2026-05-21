import axios from "axios";
import { apiClient } from "@/lib/api/client";
import type {
  LogoUploadResponse,
  OrganiserTemplatePayload,
  OrganiserTemplateResponse,
} from "../types/canvas-data";
import type {
  PlatformTemplatesQuery,
  PlatformTemplatesResponse,
} from "../types/platform-template";

export async function uploadLogo(file: File): Promise<LogoUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<LogoUploadResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/uploads/logo`,
    formData,
    { withCredentials: true },
  );

  return response.data;
}

export async function createOrganiserTemplate(
  payload: OrganiserTemplatePayload,
): Promise<OrganiserTemplateResponse> {
  return apiClient<OrganiserTemplateResponse>("/templates", {
    method: "POST",
    data: payload,
  });
}

export async function updateOrganiserTemplate(
  templateId: string,
  payload: OrganiserTemplatePayload,
): Promise<OrganiserTemplateResponse> {
  return apiClient<OrganiserTemplateResponse>(`/templates/${templateId}`, {
    method: "PATCH",
    data: payload,
  });
}

export async function getOrganiserTemplate(
  templateId: string,
): Promise<OrganiserTemplateResponse> {
  return apiClient<OrganiserTemplateResponse>(`/templates/${templateId}`);
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
