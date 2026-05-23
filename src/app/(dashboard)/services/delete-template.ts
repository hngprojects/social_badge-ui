import { apiClient } from "@/lib/api/client";

const ORGANIZER_TEMPLATE_ENDPOINT = "/templates/organizer";

export async function deleteOrganizerTemplate(templateId: string) {
  await apiClient<void>(`${ORGANIZER_TEMPLATE_ENDPOINT}/${templateId}`, {
    method: "DELETE",
  });
}
