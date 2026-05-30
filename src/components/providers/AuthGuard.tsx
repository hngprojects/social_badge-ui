"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/app/features/auth/services/auth";
import Loading from "@/app/loading";
import { AxiosError } from "axios";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { data, error, isLoading, isFetching } = useQuery({
		queryKey: ["auth", "me"],
		queryFn: async () => {
			const response = await getCurrentUser();
			return response.data;
		},
		retry: false,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		const status = (error as AxiosError | undefined)?.response?.status;
		if (!isLoading && !isFetching && !data && (status === 401 || status === 403)) {
			router.replace("/login");
		}
	}, [data, error, isLoading, isFetching, router]);

	if (isLoading) {
		return <Loading />;
	}

	if (!data) {
		return null;
	}

	return <>{children}</>;
}
