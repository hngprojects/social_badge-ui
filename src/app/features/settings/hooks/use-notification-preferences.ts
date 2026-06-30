import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "../services/notification-preferences";
import { NotificationPreferencesResponse, UpdateNotificationPreferencesPayload } from "../types";
export const notificationPreferencesKey = ["notification-preferences"];

const defaultNotificationPreferencesResponse: NotificationPreferencesResponse = {
  status: "success",
  message: "",
  data: {
    email_template_published: true,
    email_new_signin: true,
    notify_badge_creation: true,
    notify_daily_digest: true,
    notify_weekly_report: true,
    updated_at: "",
  },
};

export function useNotificationPreferences() {
  return useQuery({
    queryKey: notificationPreferencesKey,
    queryFn: getNotificationPreferences,
  });
}

export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationPreferences,
    onMutate: async (payload: UpdateNotificationPreferencesPayload) => {
      await queryClient.cancelQueries({
        queryKey: notificationPreferencesKey,
      });

      const previousPreferences =
        queryClient.getQueryData<NotificationPreferencesResponse>(
          notificationPreferencesKey,
        );

      queryClient.setQueryData<NotificationPreferencesResponse>(
        notificationPreferencesKey,
        {
          ...(previousPreferences ?? defaultNotificationPreferencesResponse),
          data: {
            ...(previousPreferences?.data ??
              defaultNotificationPreferencesResponse.data),
            ...payload,
          },
        },
      );

      return { previousPreferences };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        notificationPreferencesKey,
        context?.previousPreferences,
      );
    },
    onSuccess: (response) => {
      queryClient.setQueryData<NotificationPreferencesResponse>(
        notificationPreferencesKey,
        response,
      );
    },
  });
}
