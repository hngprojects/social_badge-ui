import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deleteProfile as deleteProfileApi } from "../services/profile";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "../../auth/types";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/use-user-store";

export const useDeleteProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { clearUser } = useUserStore();

  const {
    mutate: deleteProfile,
    isPending: isDeleting,
    isError,
  } = useMutation({
    mutationFn: deleteProfileApi,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
      clearUser();
      toast.success("Profile deleted successfully");

      // Delay briefly so the success toast is visible before redirecting.
      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiError>;
      const status = axiosError.response?.status;
      const message =
        axiosError.response?.data?.message ||
        "Could not delete profile. Please try again";

      if (status === 401) {
        queryClient.removeQueries({ queryKey: ["auth", "me"] });
        clearUser();
        toast.error("You are not authenticated. Please log in again.");
        router.replace("/login");
        return;
      }

      if (status === 429) {
        toast.error("Too many attempts. Please try again later.");
        return;
      }

      toast.error(message);
    },
  });
  return { deleteProfile, isDeleting, isError };
};
