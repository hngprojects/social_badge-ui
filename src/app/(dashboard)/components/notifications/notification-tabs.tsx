"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import {
  useMarkNotificationRead,
  useNotifications,
} from "../../../features/dashboard/hooks/use-notifications";
import { NotificationList } from "../../../features/notifications/components/notification-list";
import { NotificationsPagination } from "../../../features/notifications/components/notifications-pagination";
import type { NotificationsTabValue } from "../../../features/notifications/types";
import { sortNotificationsByReadState } from "../../../features/notifications/utilities";

const NOTIFICATIONS_PAGE_SIZE = 8;

export default function NotificationsTabs() {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<NotificationsTabValue>("all");
  const { data, isError, isLoading } = useNotifications(
    page,
    NOTIFICATIONS_PAGE_SIZE,
  );
  const markNotificationReadMutation = useMarkNotificationRead();
  const notifications = data?.notifications ?? [];
  const orderedNotifications = sortNotificationsByReadState(notifications);
  const unreadNotifications = orderedNotifications.filter(
    (notification) => !notification.is_read,
  );
  const totalNotifications = data?.total ?? 0;

  const handleTabChange = (value: string) => {
    setActiveTab(value as NotificationsTabValue);
    setPage(1);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="flex w-full flex-1 flex-col gap-[6px]"
    >
      <div className="w-fit max-w-full overflow-hidden rounded-[12px] border bg-white">
        <TabsList className="flex gap-1.5 p-1.5 bg-white">
          <TabsTrigger
            value="all"
            className="py-2 px-3.5 leading-[19.5px] rounded-[12px]"
          >
            All
          </TabsTrigger>

          <TabsTrigger
            value="unread"
            className="py-2 px-3.5 leading-[19.5px] rounded-[12px]"
          >
            Unread
          </TabsTrigger>
        </TabsList>
      </div>

      {isLoading ? (
        <div className="w-full rounded-[12px] bg-white px-4 py-8 text-center text-[14px] text-[#9CA3AF]">
          Loading notifications...
        </div>
      ) : isError ? (
        <div className="w-full rounded-[12px] bg-white px-4 py-8 text-center text-[14px] text-[#9CA3AF]">
          Could not load notifications.
        </div>
      ) : (
        <>
          <TabsContent value="all">
            <NotificationList
              notifications={orderedNotifications}
              onMarkRead={(notification) =>
                markNotificationReadMutation.mutate(notification.id, {
                  onError: () => {
                    toast.error("Could not mark notification as read.");
                  },
                })
              }
              emptyState={{
                title: "No notifications yet",
                message:
                  "Start sharing your badge link to see activity here when people scan your tags.",
                showDashboardLink: true,
              }}
            />
          </TabsContent>

          <TabsContent value="unread">
            <NotificationList
              notifications={unreadNotifications}
              onMarkRead={(notification) =>
                markNotificationReadMutation.mutate(notification.id, {
                  onError: () => {
                    toast.error("Could not mark notification as read.");
                  },
                })
              }
              emptyState={{
                title: "No unread notifications",
                message:
                  "You are all caught up. New unread activity will appear here.",
              }}
            />
          </TabsContent>

          <NotificationsPagination
            currentPage={page}
            onPageChange={setPage}
            pageSize={NOTIFICATIONS_PAGE_SIZE}
            totalItems={totalNotifications}
          />
        </>
      )}
    </Tabs>
  );
}
