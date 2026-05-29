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
  }): Promise<boolean> => {
    const hasProfileChanges =
      !!profilePayload && Object.keys(profilePayload).length > 0;

    const hasPhotoChanges = !!photoFile;

    if (!hasProfileChanges && !hasPhotoChanges) {
      toast.info("No changes to save.");
      return false;
    }

    try {
      if (hasProfileChanges) {
        const response =
          await updateProfileMutation.mutateAsync(profilePayload);

        setUser(response.data);
      }

      if (hasPhotoChanges) {
        const response = await updatePhotoMutation.mutateAsync(photoFile);

        setUser(response.data);
      }

      toast.success("Profile updated successfully.");
      return true;
    } catch {
      if (hasProfileChanges && hasPhotoChanges) {
        toast.error(
          "Some profile changes may have been saved, but the photo update failed.",
        );
      } else {
        toast.error("Could not update profile. Please try again.");
      }

      return false;
    }
  };

  return {
    saveProfile,
    isLoading: updateProfileMutation.isPending || updatePhotoMutation.isPending,
  };
};
