import { cn } from "@/lib/utils";
import {
  formatNotificationTime,
  formatNotificationType,
  notificationTypeStyles,
} from "../../lib/notifications";
import type { NotificationRowProps } from "../../types/dashboard/notifications";

export function NotificationRow({
  notification,
  onMarkRead,
}: NotificationRowProps) {
  const style = notificationTypeStyles[notification.type] ?? {
    bg: "bg-[#FFF0EC]",
    text: "text-primary",
  };

  return (
    <article
      className={cn(
        "flex flex-col gap-1 border-b border-b-[#F2F0EC] border-l-2 p-3 transition-colors sm:p-4",
        notification.is_read
          ? "border-l-transparent"
          : "cursor-pointer border-l-[#FF9B7E] hover:bg-[#FFFDFB]",
      )}
      onClick={() => {
        if (!notification.is_read) {
          onMarkRead(notification);
        }
      }}
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-medium leading-none sm:text-[12px]",
            notification.is_read
              ? "bg-[#EEEEEE] text-[#BDBDBD]"
              : `${style.bg} ${style.text}`,
          )}
        >
          {formatNotificationType(notification.type)}
        </span>
        <span
          className={cn(
            "shrink-0 text-[12px] leading-4 sm:text-[14px] sm:leading-4.5",
            notification.is_read ? "text-[#BDBDBD]" : "text-[#3A3A3A]",
          )}
        >
          {formatNotificationTime(notification.created_at, "Today")}
        </span>
      </div>
      <p
        className={cn(
          "text-[14px] leading-5 sm:text-[16px] sm:leading-5.5",
          notification.is_read ? "text-[#BDBDBD]" : "text-[#3A3A3A]",
        )}
      >
        {notification.body || notification.title}
      </p>
    </article>
  );
}
