import NotificationsHeader from "./notifiaction-header";
import NotificationsTabs from "./notification-tabs";

export default function Notifications() {
  return (
    <section className="flex max-w-[700px] flex-col gap-[6px] px-4 pt-8 sm:px-9">
      <NotificationsHeader />
      <NotificationsTabs />
    </section>
  );
}
