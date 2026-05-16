import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { resetPassword as resetPasswordApi } from "../services/auth";
import { toast } from "sonner";
import { getAxiosApiErrorMessage } from "@/lib/api/error-messages";

export const useResetPassword = () => {
  const {
    mutate: resetPassword,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: resetPasswordApi,

    onSuccess: (data: { message?: string }) => {
      toast.success(
        data?.message || "Password reset successful! You can now log in.",
      );
    },
    onError: (error) => {
      const status = isAxiosError(error) ? error.response?.status : undefined;
      const fallback =
        status === 404 || status === 410 || status === 401
          ? "This reset link is invalid or has expired. Please request a new password reset from the login page."
          : "Failed to reset password. Please try again.";
      toast.error(getAxiosApiErrorMessage(error, fallback));
    },
  });

  return {
    resetPassword,
    isLoading,
    isError,
  };
};
