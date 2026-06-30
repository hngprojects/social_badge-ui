import type { NotificationListProps } from "../types";
import { NotificationsEmptyState } from "./notifications-empty-state";
import { NotificationRow } from "./notification-row";

export function NotificationList({
  notifications,
  emptyState,
  onMarkRead,
}: NotificationListProps) {
  if (!notifications.length) {
    return <NotificationsEmptyState {...emptyState} />;
  }

  return (
    <section className="w-full overflow-hidden border-[#F2F0EC] bg-white">
      {notifications.map((notification) => (
        <NotificationRow
          key={notification.id}
          notification={notification}
          onMarkRead={onMarkRead}
        />
      ))}
    </section>
  );
}
