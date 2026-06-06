import { useQuery } from "@tanstack/react-query";
import { getBadgeAnalytics } from "../services/get-badge-analytics";

export const badgeAnalyticsKey = ["badge-analytics"];

export function useBadgeAnalytics() {
  return useQuery({
    queryKey: badgeAnalyticsKey,
    queryFn: getBadgeAnalytics,
    refetchInterval: 10000, // Poll every 10s for real-time stats
    refetchIntervalInBackground: true, // Keep polling even if window is blurred
    staleTime: 0, // Ensure every poll actually triggers a network request
  });
}
