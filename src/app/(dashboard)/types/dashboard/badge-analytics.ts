export type BadgeAnalyticsData = {
  total_organiser_badges: number;
  total_active_badges: number;
  total_shares: number;
  total_badges_created: number;
  platform_template_usage: Array<{
    platform_template_id: string;
    count: number;
  }>;
};

export type BadgeAnalyticsResponse = {
  status: "success";
  message: string;
  data: BadgeAnalyticsData;
};
