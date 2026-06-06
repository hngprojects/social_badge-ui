export type NotificationPreferences = {
  email_template_published: boolean;
  email_new_signin: boolean;
  notify_badge_creation: boolean;
  notify_daily_digest: boolean;
  notify_weekly_report: boolean;
  updated_at: string;
};

export type UpdateNotificationPreferencesPayload = Partial<
  Pick<
    NotificationPreferences,
    | "notify_badge_creation"
    | "notify_daily_digest"
    | "notify_weekly_report"
  >
>;

export type ImplementedNotificationPreference =
  keyof UpdateNotificationPreferencesPayload;

export type NotificationPreferenceCardKey =
  | "badgeClaims"
  | "dailyDigest"
  | "weeklyReport";

export type NotificationPreferencesResponse = {
  status: "success";
  message: string;
  data: NotificationPreferences;
};

export type UpdateNotificationPreferencesResponse =
  NotificationPreferencesResponse;
