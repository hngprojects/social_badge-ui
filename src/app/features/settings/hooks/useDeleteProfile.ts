import { useMutation } from "@tanstack/react-query";
import { deleteProfile as deleteProfileApi } from "../services/settings";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "../../auth/types";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/use-user-store";

export const useDeleteProfile = () => {
  const router = useRouter();
  const { clearUser } = useUserStore();

  const {
    mutate: deleteProfile,
    isPending: isDeleting,
    isError,
  } = useMutation({
    mutationFn: deleteProfileApi,
    onSuccess: () => {
      clearUser();
      toast.success("Profile deleted successfully");
      router.push("/login");
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiError>;
      const status = axiosError.response?.status;
      const message =
        axiosError.response?.data?.message ||
        "Could not delete profile. Please try again";

      if (status === 401) {
        clearUser();
        toast.error("You are not authenticated. Please log in again.");
        router.push("/login");
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
