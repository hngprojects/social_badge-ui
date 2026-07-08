import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAxiosApiErrorMessage } from "@/lib/api/error-messages";
import { clearAuthSession } from "@/lib/api/auth-session";
import { changePassword as changePasswordApi } from "../services/change-password";

export const useChangePassword = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: changePassword,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: (data: { message?: string }) => {
      toast.success(
        data?.message || "Password updated successfully. Please log in again.",
      );

      setTimeout(async () => {
        queryClient.removeQueries({ queryKey: ["auth", "me"] });
        await clearAuthSession();
        router.replace("/login");
      }, 1200);
    },
    onError: (error) => {
      const status = isAxiosError(error) ? error.response?.status : undefined;

      const fallback =
        status === 401
          ? "Your current password is incorrect."
          : status === 422
            ? "Please check your password requirements."
            : status === 429
              ? "Too many attempts. Please try again later."
              : "Failed to update password. Please try again.";

      toast.error(getAxiosApiErrorMessage(error, fallback));
    },
  });

  return {
    changePassword,
    isLoading,
    isError,
  };
};
