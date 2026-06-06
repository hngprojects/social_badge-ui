import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsRead,
  markNotificationRead,
} from "../services/get-notifications";
import type {
  NotificationsData,
  UnreadNotificationCountData,
} from "../types/dashboard/notifications";

export const notificationsRootKey = ["notifications"];
export const unreadNotificationCountKey = [
  ...notificationsRootKey,
  "unread-count",
];

export const notificationsKey = (page: number, limit: number) => [
  ...notificationsRootKey,
  page,
  limit,
];

export function useNotifications(page = 1, limit = 20, enabled = true) {
  return useQuery({
    queryKey: notificationsKey(page, limit),
    queryFn: () => getNotifications(page, limit),
    enabled,
  });
}

export function useUnreadNotificationCount(enabled = true) {
  return useQuery({
    queryKey: unreadNotificationCountKey,
    queryFn: getUnreadNotificationCount,
    enabled,
  });
}

function isNotificationsData(value: unknown): value is NotificationsData {
  return (
    typeof value === "object" &&
    value !== null &&
    "notifications" in value &&
    Array.isArray((value as NotificationsData).notifications)
  );
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsRead,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: notificationsRootKey });

      const previousUnreadCount =
        queryClient.getQueryData<UnreadNotificationCountData>(
          unreadNotificationCountKey,
        );
      const previousNotifications = queryClient.getQueriesData({
        queryKey: notificationsRootKey,
      });

      queryClient.setQueryData<UnreadNotificationCountData>(
        unreadNotificationCountKey,
        { unread_count: 0 },
      );

      queryClient.setQueriesData({ queryKey: notificationsRootKey }, (prev) => {
        if (!isNotificationsData(prev)) return prev;

        return {
          ...prev,
          notifications: prev.notifications.map((notification) => ({
            ...notification,
            is_read: true,
          })),
        };
      });

      return { previousUnreadCount, previousNotifications };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;

      queryClient.setQueryData(
        unreadNotificationCountKey,
        context.previousUnreadCount,
      );

      context.previousNotifications.forEach(([queryKey, value]) => {
        queryClient.setQueryData(queryKey, value);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationsRootKey });
    },
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationRead,
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: notificationsRootKey });

      const previousUnreadCount =
        queryClient.getQueryData<UnreadNotificationCountData>(
          unreadNotificationCountKey,
        );
      const previousNotifications = queryClient.getQueriesData({
        queryKey: notificationsRootKey,
      });

      const wasUnread = previousNotifications.some(([, value]) =>
        isNotificationsData(value)
          ? value.notifications.some(
              (notification) =>
                notification.id === notificationId && !notification.is_read,
            )
          : false,
      );

      queryClient.setQueriesData({ queryKey: notificationsRootKey }, (prev) => {
        if (!isNotificationsData(prev)) return prev;

        return {
          ...prev,
          notifications: prev.notifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, is_read: true }
              : notification,
          ),
        };
      });

      if (wasUnread) {
        queryClient.setQueryData<UnreadNotificationCountData>(
          unreadNotificationCountKey,
          (prev) => ({
            unread_count: Math.max(0, (prev?.unread_count ?? 1) - 1),
          }),
        );
      }

      return { previousUnreadCount, previousNotifications };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;

      queryClient.setQueryData(
        unreadNotificationCountKey,
        context.previousUnreadCount,
      );

      context.previousNotifications.forEach(([queryKey, value]) => {
        queryClient.setQueryData(queryKey, value);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationsRootKey });
    },
  });
}
