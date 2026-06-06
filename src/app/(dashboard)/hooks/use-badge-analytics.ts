import { useQuery } from "@tanstack/react-query";
import { getBadgeAnalytics } from "../services/get-badge-analytics";

export const badgeAnalyticsKey = ["badge-analytics"];

const REALTIME_REFETCH_INTERVAL_MS = 3000;

export function useBadgeAnalytics() {
  return useQuery({
    queryKey: badgeAnalyticsKey,
    queryFn: getBadgeAnalytics,
    refetchInterval: REALTIME_REFETCH_INTERVAL_MS,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}
