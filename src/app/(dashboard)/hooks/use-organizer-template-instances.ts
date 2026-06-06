import { useQuery } from "@tanstack/react-query";
import { getOrganizerTemplateInstances } from "../services/get-template-instances";
import {
	DASHBOARD_REFETCH_INTERVAL_MS,
	DASHBOARD_STALE_TIME_MS,
} from "../constants/query-refresh";

// CACHE NAME
export const organizerTemplateInstancesRootKey = [
	"organizer-template-instances",
];

export const organizerTemplateInstancesKey = (page: number, limit: number) => [
	...organizerTemplateInstancesRootKey,
	page,
	limit,
];

// HOOK 1
export function useOrganizerTemplateInstances(page = 1, limit = 20) {
	return useQuery({
		queryKey: organizerTemplateInstancesKey(page, limit),
		queryFn: () => getOrganizerTemplateInstances(page, limit),
		refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
		refetchIntervalInBackground: false,
		refetchOnWindowFocus: false,
		staleTime: DASHBOARD_STALE_TIME_MS,
	});
}

// HOOK 2
export function useRecentOrganizerBadges(page = 1, limit = 20) {
	const query = useOrganizerTemplateInstances(page, limit);

	const templates = query.data?.templates ?? [];
	const totalBadges = query.data?.total ?? 0;

	const activeBadges = templates.filter(
		(template) => template.is_published || template.status === "live",
	).length;

	return {
		...query,
		templates,
		total: totalBadges,
		totalBadges,
		activeBadges,
	};
}
