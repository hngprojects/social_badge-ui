import { useQuery } from "@tanstack/react-query";
import { getBadgeAnalytics } from "../services/get-badge-analytics";
import {
  DASHBOARD_REFETCH_INTERVAL_MS,
  DASHBOARD_STALE_TIME_MS,
} from "../constants/query-refresh";

export const badgeAnalyticsKey = ["badge-analytics"];

export function useBadgeAnalytics() {
  return useQuery({
    queryKey: badgeAnalyticsKey,
    queryFn: getBadgeAnalytics,
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    staleTime: DASHBOARD_STALE_TIME_MS,
  });
}
