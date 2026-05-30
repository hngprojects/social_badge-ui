import { useQuery } from "@tanstack/react-query";
import { getBadgeAnalytics } from "../services/get-badge-analytics";

export const badgeAnalyticsKey = ["badge-analytics"];

export function useBadgeAnalytics() {
  return useQuery({
    queryKey: badgeAnalyticsKey,
    queryFn: getBadgeAnalytics,
  });
}
