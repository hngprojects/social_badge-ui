import type {
  NotificationItem,
  NotificationTypeStyle,
} from "../types/dashboard/notifications";

export const notificationTypeLabels: Record<string, string> = {
  badge_alert: "Badge Alert",
  badge_creation: "Badge Creation",
  daily_digest: "Daily Digest",
  weekly_report: "Weekly Report",
  system_update: "System Update",
};

export const notificationTypeStyles: Record<string, NotificationTypeStyle> = {
  badge_alert: {
    bg: "bg-[#FFF0EC]",
    text: "text-primary",
  },
  badge_creation: {
    bg: "bg-[#FFF0EC]",
    text: "text-primary",
  },
  daily_digest: {
    bg: "bg-[#DCFFDC]",
    text: "text-[#3F9226]",
  },
  weekly_report: {
    bg: "bg-[#E5ECFF]",
    text: "text-[#2C60CF]",
  },
  system_update: {
    bg: "bg-[#EEEEEE]",
    text: "text-[#9CA3AF]",
  },
};

export function formatNotificationType(type: string) {
  return (
    notificationTypeLabels[type] ??
    type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function formatNotificationTime(
  createdAt: string,
  recentLabel = "Just now",
) {
  const timestamp = new Date(createdAt).getTime();
  const diffInSeconds = Math.floor((Date.now() - timestamp) / 1000);

  if (Number.isNaN(timestamp)) return "";
  if (diffInSeconds < 60) return recentLabel;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInDays < 14) return "Last Week";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(createdAt));
}

function getNotificationTimestamp(notification: NotificationItem) {
  const timestamp = new Date(notification.created_at).getTime();

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function sortNotificationsByReadState(
  notifications: NotificationItem[],
) {
  return [...notifications].sort((firstNotification, secondNotification) => {
    if (firstNotification.is_read !== secondNotification.is_read) {
      return firstNotification.is_read ? 1 : -1;
    }

    return (
      getNotificationTimestamp(secondNotification) -
      getNotificationTimestamp(firstNotification)
    );
  });
}
