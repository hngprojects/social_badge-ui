import { apiClient } from "@/lib/api/client";
import { BadgeAnalyticsData, BadgeAnalyticsResponse } from "../types";

const BADGE_ANALYTICS_ENDPOINT = "/badges/analytics";

export async function getBadgeAnalytics(): Promise<BadgeAnalyticsData> {
  const body = await apiClient<BadgeAnalyticsResponse>(BADGE_ANALYTICS_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": undefined,
    },
  });

  return body.data;
}