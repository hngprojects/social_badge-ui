import { useQuery } from "@tanstack/react-query";
import { getOrganizerTemplateInstances } from "../services/get-template-instances";

export const organizerTemplateInstancesKey = (page: number, limit: number) => [
  "organizer-template-instances",
  page,
  limit,
];

export function useOrganizerTemplateInstances(page = 1, limit = 20) {
  return useQuery({
    queryKey: organizerTemplateInstancesKey(page, limit),
    queryFn: () => getOrganizerTemplateInstances(page, limit),
  });
}

export function useRecentOrganizerBadges(limit = 20) {
  const query = useOrganizerTemplateInstances(1, limit);
  const totalBadges = query.data?.total ?? 0;
  const countsQuery = useQuery({
    queryKey: ["organizer-template-instance-counts", totalBadges],
    queryFn: () => getOrganizerTemplateInstances(1, totalBadges),
    enabled: totalBadges > 0,
  });
  const countTemplates = countsQuery.data?.templates ?? [];

  return {
    ...query,
    templates: query.data?.templates ?? [],
    total: totalBadges,
    totalBadges,
    activeBadges: countTemplates.filter((template) => template.status === "live")
      .length,
  };
}
