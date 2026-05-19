import { useMutation } from "@tanstack/react-query";
import { resendVerifyEmail as resendVerifyEmailApi } from "../services/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "../types";

export const useResendVerifyEmail = () => {
  const {
    mutate: resendVerifyEmail,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: ({ email }: { email: string }) => resendVerifyEmailApi({ email }),

    onSuccess: (data: { message?: string }) => {
      toast.success(data?.message || "Verification email resent successfully!");
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiError>;

      const message =
        axiosError.response?.data?.message ||
        "Failed to resend verification email. Please try again.";

      toast.error(message);
    },
  });

  return {
    resendVerifyEmail,
    isLoading,
    isError,
  };
};