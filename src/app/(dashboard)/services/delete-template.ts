const ORGANIZER_TEMPLATE_ENDPOINT = "/templates/organizer";

export async function deleteOrganizerTemplate(templateId: string) {
  void `${ORGANIZER_TEMPLATE_ENDPOINT}/${templateId}`;

  return Promise.resolve();
}
