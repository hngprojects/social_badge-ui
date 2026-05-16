import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ApiError } from "@/app/features/auth/types";

export const useLogin = () => {
  const router = useRouter();

  const {
    mutate: login,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: loginApi,

    onSuccess: () => {
      toast.success("Login successful!");
      router.push("/coming-soon");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<ApiError>;

      const message =
        axiosError.response?.data?.message || "Login failed. Please try again.";

      toast.error(message);
    },
  });

  return {
    login,
    isLoading,
    isError,
  };
};
