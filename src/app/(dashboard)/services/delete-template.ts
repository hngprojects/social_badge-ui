import { apiClient } from "@/lib/api/client";

const ORGANIZER_TEMPLATE_ENDPOINT = "/badges";

export async function deleteOrganizerTemplate(templateId: string) {
  const id = templateId.trim();

  if (!id) {
    throw new Error("Template id is required");
  }

  await apiClient<void>(
    `${ORGANIZER_TEMPLATE_ENDPOINT}/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    },
  );
}
