import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../services/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "../types";

export const useForgotPassword = () => {
  const {
    mutate: forgotPassword,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: forgotPasswordApi,

    onSuccess: (data: { message?: string }) => {
      console.log(data);
      toast.success(
        data?.message || "Password reset email sent! Please check your email.",
      );
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiError>;

      const message =
        axiosError.response?.data?.message ||
        "Failed to send password reset email. Please try again.";

      toast.error(message);
    },
  });

  return {
    forgotPassword,
    isLoading,
    isError,
  };
};
