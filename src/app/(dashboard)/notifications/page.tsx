import NotificationsHeader from "./notifiaction-header";
import NotificationsTabs from "./notification-tabs";

export default function Notifications() {
  return (
    <section className="flex min-h-[calc(100dvh-160px)] w-full flex-col gap-[6px] px-4 pt-8 sm:px-9">
      <NotificationsHeader />
      <NotificationsTabs />
    </section>
  );
}
