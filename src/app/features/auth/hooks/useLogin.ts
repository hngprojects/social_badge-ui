import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ApiError } from "@/app/features/auth/types";
import { useUserStore } from "@/stores/use-user-store";
import { resendVerifyEmail } from "../services/auth";
import { getCurrentUser } from "../services/auth";
export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const {
    mutate: login,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: loginApi,

    onSuccess: async () => {
      const profile = await getCurrentUser();
      setUser(profile.data);
      console.log("PROFILE USER", profile);
      toast.success("Login successful!");
      router.push("/dashboard");
    },
    onError: async (error, data) => {
      const axiosError = error as AxiosError<ApiError>;
      const status = axiosError.response?.status;
      const message =
        axiosError.response?.data?.message || "Login failed. Please try again.";

      if (status === 403 && message === "Please verify your email") {
        const email = data.email;
        try {
          await resendVerifyEmail({ email });
          toast.error(
            "Your email is not verified. We've sent you a new verification link — please check your inbox.",
          );
        } catch {
          toast.error(
            "Your email is not verified. We couldn't resend the verification email right now. Please try again.",
          );
        }
        return;
      }

      if (status === 401) {
        toast.error("Invalid Email or Password. Please try again.");
        return;
      }

      toast.error(message);
    },
  });

  return { login, isLoading, isError };
};
