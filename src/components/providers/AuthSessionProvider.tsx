"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getCurrentUser } from "@/app/features/auth/services/auth";
import { useUserStore } from "@/stores/use-user-store";
import { clearAuthSession } from "@/lib/api/auth-session";

/** Hydrates the user store from /auth/me when dashboard cookies are valid. */
export default function AuthSessionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const setUser = useUserStore((state) => state.setUser);

  const { data, error, isError, isFetching } = useQuery({
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
    const status = (error as AxiosError | undefined)?.response?.status;
    if (isError && !data && !isFetching && (status === 401 || status === 403)) {
      clearAuthSession();
    }
  }, [isError, data, isFetching, error]);

  return children;
}
