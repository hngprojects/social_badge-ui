"use client";

import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query";;
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clearAuthSession } from "@/lib/api/auth-session";
import { logout } from "../services/auth";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logout,
    onSettled: async () => {
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
      await clearAuthSession();
      router.replace("/login");
    },
    onSuccess: () => {
      toast.success("Logged out successfully.");
    },
    onError: () => {
      toast.message("Signed out locally.");
    },
  });

  return {
    logout: mutation.mutate,
    logoutAsync: mutation.mutateAsync,
    isLoggingOut: mutation.isPending,
  };
}
