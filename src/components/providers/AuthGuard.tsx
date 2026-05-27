"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/app/features/auth/services/auth";
import Loading from "@/app/loading";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { data, isLoading } = useQuery({
		queryKey: ["auth", "me"],
		queryFn: async () => {
			const response = await getCurrentUser();
			return response.data;
		},
		retry: false,
		staleTime: 5 * 60 * 1000,
	});

	useEffect(() => {
		if (!isLoading && !data) {
			router.replace("/login");
		}
	}, [data, isLoading, router]);

	if (isLoading) {
		return <Loading />;
	}

	if (!data) {
		return <Loading />;
	}

	return <>{children}</>;
}
