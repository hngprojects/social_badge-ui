"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@/stores/use-user-store";
import { logout } from "../services/auth";

export function useLogout() {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const mutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearUser();
      router.push("/login");
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
