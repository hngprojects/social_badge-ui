import { apiClient } from "@/lib/api/client";

export type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

export const changePassword = async ({
  current_password,
  new_password,
  confirm_password,
}: {
  current_password: string;
  new_password: string;
  confirm_password: string;
}) => {
  return apiClient<{ status: string; message: string; data: null }>(
    "/profile/password/change",
    {
      method: "PUT",
      data: {
        current_password,
        new_password,
        confirm_password,
      },
    },
  );
};
