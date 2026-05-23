export async function deleteOrganizerTemplate(templateId: string) {
  const token = localStorage.getItem("access_token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/templates/organizer/${templateId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to delete template");
  }
}
