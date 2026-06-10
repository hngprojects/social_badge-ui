import { cn } from "@/lib/utils";
import {
  formatNotificationTime,
  formatNotificationType,
  notificationTypeStyles,
} from "../../lib/notifications";
import type { NotificationDataProps } from "../../types/dashboard/notifications";

export function NotificationData({
  onMarkRead,
  notifications,
}: NotificationDataProps) {
  return (
    <section className="max-h-116 overflow-y-auto">
      {notifications.map((notification) => {
        const style = notificationTypeStyles[notification.type] ?? {
          bg: "bg-[#FFF0EC]",
          text: "text-primary",
        };
        const message = notification.title || notification.body;

        return (
          <article
            className={cn(
              "flex flex-col gap-1 border-b border-b-[#F2F0EC] border-l-2 p-3 transition-colors sm:p-4",
              notification.is_read
                ? "border-l-[#EEEEEE]"
                : "cursor-pointer border-l-[#FF9B7E] hover:bg-[#FFFDFB]",
            )}
            key={notification.id}
            onClick={() => {
              if (!notification.is_read) {
                onMarkRead?.(notification);
              }
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium leading-none sm:text-[12px] ${
                  notification.is_read
                    ? "bg-[#EEEEEE] text-[#BDBDBD]"
                    : `${style.bg} ${style.text}`
                }`}
              >
                {formatNotificationType(notification.type)}
              </span>
              <span
                className={`shrink-0 text-[12px] leading-4 sm:text-[14px] sm:leading-4.5 ${
                  notification.is_read ? "text-[#BDBDBD]" : "text-[#3A3A3A]"
                }`}
              >
                {formatNotificationTime(notification.created_at)}
              </span>
            </div>
            <p
              className={`text-[14px] leading-5 sm:text-[16px] sm:leading-5.5 ${
                notification.is_read ? "text-[#BDBDBD]" : "text-[#3A3A3A]"
              }`}
            >
              {message}
            </p>
          </article>
        );
      })}
    </section>
  );
}
