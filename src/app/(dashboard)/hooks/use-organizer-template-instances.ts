import { useQuery } from "@tanstack/react-query";
import { getOrganizerTemplateInstances } from "../services/get-template-instances";

// CACHE NAME
export const organizerTemplateInstancesKey = (page: number, limit: number) => [
  "organizer-template-instances",
  page,
  limit,
];

// HOOK 1
export function useOrganizerTemplateInstances(page = 1, limit = 20) {
  return useQuery({
    queryKey: organizerTemplateInstancesKey(page, limit),
    queryFn: () => getOrganizerTemplateInstances(page, limit),
  });
}

// HOOK 2
export function useRecentOrganizerBadges(limit = 20) {
  const query = useOrganizerTemplateInstances(1, limit);
  const totalBadges = query.data?.total ?? 0;
  const activeBadges = 0;

  return {
    ...query,
    templates: query.data?.templates ?? [],
    total: totalBadges,
    totalBadges,
    activeBadges,
  };
}
