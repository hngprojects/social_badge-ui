import { apiClient } from "@/lib/api/client";
import {
  DeleteProfileResponse,
  UpdateProfileResponse,
} from "../types";

export const deleteProfile = async () => {
  return apiClient<DeleteProfileResponse>("/profile", {
    method: "DELETE",
  });
};

type UpdateProfilePayload = {
  first_name?: string;
  last_name?: string;
  role?: string;
};

export async function updateProfile(payload: UpdateProfilePayload) {
  return apiClient<UpdateProfileResponse>("/profile", {
    method: "PUT",
    data: payload,
  });
}

export async function updateProfilePhoto(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient<UpdateProfileResponse>("/profile/photo", {
    method: "PUT",
    data: formData,
  });
}
