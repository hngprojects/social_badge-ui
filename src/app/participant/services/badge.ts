import { apiClient } from "@/lib/api/client";

const incrementBadge = async (slug: string, type: "share" | "creation") => {
	const safeSlug = encodeURIComponent(slug.trim());
	if (!safeSlug) throw new Error("Missing badge slug");
	return apiClient<{ status: string; message: string; data: null }>(
		`/badges/public/${safeSlug}/increment-${type}`,
		{ method: "POST" },
	);
};

export const incrementBadgeShare = async (slug: string) => {
	return incrementBadge(slug, "share");
};

export const incrementBadgeCreation = async (slug: string) => {
	return incrementBadge(slug, "creation");
};
