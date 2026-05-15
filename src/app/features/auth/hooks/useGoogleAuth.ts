import { initiateGoogleAuth } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

export const useGoogleAuth = () => {
  const { mutate: loginWithGoogle, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      initiateGoogleAuth();
    },
  });

  return {
    loginWithGoogle,
    isLoading,
  };
};
