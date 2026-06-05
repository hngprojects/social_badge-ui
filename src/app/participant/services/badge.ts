import { apiClient } from "@/lib/api/client";

export const incrementBadgeShare = async (slug: string) => {
	const safeSlug = encodeURIComponent(slug.trim());
	if (!safeSlug) throw new Error("Missing badge slug");
	return apiClient<{ status: string; message: string; data: null }>(
		`/badges/public/${safeSlug}/increment-share`,
		{
			method: "POST",
		},
	);
};

export const incrementBadgeCreation = async (slug: string) => {
	const safeSlug = encodeURIComponent(slug.trim());

	if (!safeSlug) {
		throw new Error("Missing badge slug");
	}

	return apiClient<{ status: string; message: string; data: null }>(
		`/badges/public/${safeSlug}/increment-creation`,
		{
			method: "POST",
		},
	);
};
