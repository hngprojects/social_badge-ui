import NotificationsHeader from "../components/notifications/notifiaction-header";
import NotificationsTabs from "../components/notifications/notification-tabs";

export default function Notifications() {
  return (
    <section className="flex min-h-[calc(100dvh-160px)] w-full flex-col gap-[6px] px-4 pt-8 sm:px-9">
      <NotificationsHeader />
      <NotificationsTabs />
    </section>
  );
}
