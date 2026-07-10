import { apiClient } from "@/lib/api/client";

export type ChangePasswordPayload = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

export const changePassword = async (data: ChangePasswordPayload) => {
  return apiClient<{ status: string; message: string; data: null }>(
    "/profile/password/change",
    {
      method: "PUT",
      data,
    },
  );
};
