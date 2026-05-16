import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "@/app/features/auth/types";

export const useSignup = () => {
  const {
    mutate: signup,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: signupApi,

    onSuccess: (data) => {
      console.log(data);
      toast.success(
        "Signup successful! Please check your email to verify your account.",
      );
    },

    onError: (error) => {
      const axiosError = error as AxiosError<ApiError>;

      const message =
        axiosError.response?.data?.message ||
        "Signup failed. Please try again.";

      toast.error(message);
    },
  });

  return {
    signup,
    isLoading,
    isError,
  };
};
