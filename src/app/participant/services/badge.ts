import { apiClient } from "@/lib/api/client";

export const incrementBadgeShare = async (slug: string) => {
	return apiClient<{ status: string; message: string; data: null }>(
		`/badges/public/${slug}/increment-share`,
		{
			method: "POST",
		},
	);
};
