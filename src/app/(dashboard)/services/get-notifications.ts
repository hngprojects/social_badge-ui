import { apiClient } from "@/lib/api/client";
import type {
  MarkAllNotificationsReadData,
  MarkAllNotificationsReadResponse,
  MarkNotificationReadResponse,
  NotificationsData,
  NotificationsResponse,
  UnreadNotificationCountData,
  UnreadNotificationCountResponse,
} from "../types/dashboard/notifications";

const NOTIFICATIONS_ENDPOINT = "/organiser/notifications/list";
const UNREAD_NOTIFICATION_COUNT_ENDPOINT =
  "/organiser/notifications/unread-count";
const MARK_ALL_NOTIFICATIONS_READ_ENDPOINT =
  "/organiser/notifications/mark-all-read";

export async function getNotifications(
  page = 1,
  limit = 20,
): Promise<NotificationsData> {
  const body = await apiClient<NotificationsResponse>(NOTIFICATIONS_ENDPOINT, {
    method: "GET",
    params: { page, limit },
  });

  return body.data;
}

export async function markAllNotificationsRead(): Promise<MarkAllNotificationsReadData> {
  const body = await apiClient<MarkAllNotificationsReadResponse>(
    MARK_ALL_NOTIFICATIONS_READ_ENDPOINT,
    {
      method: "POST",
    },
  );

  return body.data;
}

export async function markNotificationRead(
  notificationId: string,
): Promise<null> {
  const body = await apiClient<MarkNotificationReadResponse>(
    `/organiser/notifications/${notificationId}/mark-read`,
    {
      method: "POST",
    },
  );

  return body.data;
}

export async function getUnreadNotificationCount(): Promise<UnreadNotificationCountData> {
  const body = await apiClient<UnreadNotificationCountResponse>(
    UNREAD_NOTIFICATION_COUNT_ENDPOINT,
    {
      method: "GET",
    },
  );

  return body.data;
}
