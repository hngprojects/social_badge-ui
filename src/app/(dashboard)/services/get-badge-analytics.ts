import { apiClient } from "@/lib/api/client";
import type {
  BadgeAnalyticsData,
  BadgeAnalyticsResponse,
} from "../types/dashboard/badge-analytics";

const BADGE_ANALYTICS_ENDPOINT = "/badges/analytics";

export async function getBadgeAnalytics(): Promise<BadgeAnalyticsData> {
  const body = await apiClient<BadgeAnalyticsResponse>(
    BADGE_ANALYTICS_ENDPOINT,
    {
      method: "GET",
    },
  );

  return body.data;
}
