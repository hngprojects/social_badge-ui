import { apiClient } from "@/lib/api/client";
import { ContactPayload, ContactResponse } from "../types/contact";

export const sendContactMessage = async (data: ContactPayload) => {
  return apiClient<ContactResponse>("/contact/", {
    method: "POST",
    data,
  });
};
