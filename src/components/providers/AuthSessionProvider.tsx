"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/app/features/auth/services/auth";
import { useUserStore } from "@/stores/use-user-store";

/** Hydrates the user store from /auth/me when dashboard cookies are valid. */
export default function AuthSessionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  const { data, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await getCurrentUser();
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) setUser(data);
  }, [data, setUser]);

  useEffect(() => {
    if (isError) clearUser();
  }, [isError, clearUser]);

  return children;
}
