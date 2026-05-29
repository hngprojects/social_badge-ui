import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProfile, updateProfilePhoto } from "../services/settings";
import { useUserStore } from "@/stores/use-user-store";

export const useUpdateProfile = () => {
  const { setUser } = useUserStore();

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
  });

  const updatePhotoMutation = useMutation({
    mutationFn: updateProfilePhoto,
  });

  const saveProfile = async ({
    profilePayload,
    photoFile,
  }: {
    profilePayload?: {
      first_name?: string;
      last_name?: string;
      role?: string;
    };
    photoFile?: File | null;
  }) => {
    try {
      let latestUser = null;

      if (profilePayload && Object.keys(profilePayload).length > 0) {
        const response =
          await updateProfileMutation.mutateAsync(profilePayload);

        latestUser = response.data;
      }

      if (photoFile) {
        const response = await updatePhotoMutation.mutateAsync(photoFile);

        latestUser = response.data;
      }

      if (latestUser) {
        setUser(latestUser);
        toast.success("Profile updated successfully.");
        return true;
      }

      toast.info("No changes to save.");
    } catch {
      toast.error("Could not update profile. Please try again.");
      return false;
    }
  };
  return {
    saveProfile,
    isLoading: updateProfileMutation.isPending || updatePhotoMutation.isPending,
  };
};
