import { apiClient } from "@/lib/api/client";

export async function deleteOrganizerTemplate(templateId: string) {
  await apiClient<void>(`/templates/organizer/${templateId}`, {
    method: "DELETE",
  });
}
