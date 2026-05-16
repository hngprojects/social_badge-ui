import { useMutation } from "@tanstack/react-query";
import { verifyEmail as verifyEmailApi } from "../services/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "../types";

export const useVerifyEmail = () => {
  const {
    mutate: verifyEmail,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: verifyEmailApi,

    onSuccess: (data: { message?: string }) => {
      console.log(data);
      toast.success(data?.message || "Email verified successfully!");
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiError>;

      const message =
        axiosError.response?.data?.message ||
        "Failed to verify email. Please try again.";

      toast.error(message);
    },
  });

  return {
    verifyEmail,
    isLoading,
    isError,
  };
};
