import { apiClient } from "@/lib/api/client";
import { NotificationPreferencesResponse, UpdateNotificationPreferencesPayload, UpdateNotificationPreferencesResponse } from "../types";

const NOTIFICATION_PREFERENCES_ENDPOINT = "/organiser/notifications";

export async function getNotificationPreferences() {
  return apiClient<NotificationPreferencesResponse>(
    NOTIFICATION_PREFERENCES_ENDPOINT,
    {
      method: "GET",
    },
  );
}

export async function updateNotificationPreferences(
  payload: UpdateNotificationPreferencesPayload,
) {
  return apiClient<UpdateNotificationPreferencesResponse>(
    NOTIFICATION_PREFERENCES_ENDPOINT,
    {
      method: "PATCH",
      data: payload,
    },
  );
}
