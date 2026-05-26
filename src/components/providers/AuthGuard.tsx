"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/app/features/auth/services/auth";
import Loading from "@/app/loading";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { data, isLoading, isFetching } = useQuery({
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
		if (!isLoading && !isFetching && !data) {
			router.replace("/login");
		}
	}, [data, isLoading, isFetching, router]);

	if (isLoading) {
		return <Loading />;
	}

	if (!data) {
		return null;
	}

	return <>{children}</>;
}
