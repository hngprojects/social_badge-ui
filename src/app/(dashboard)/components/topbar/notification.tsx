"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
  useUnreadNotificationCount,
} from "../../hooks/use-notifications";
import { NotificationData } from "./notifications-data";
import { cn } from "@/lib/utils";
import { sortNotificationsByReadState } from "../../lib/notifications";

export function NotificationDropDown() {
  const [open, setOpen] = useState(false);
  const {
    data,
    isError,
    isFetching,
    isLoading,
    refetch: refetchNotifications,
  } = useNotifications(
    1,
    20,
    false,
  );
  const { data: unreadCountData, refetch: refetchUnreadCount } =
    useUnreadNotificationCount();
  const notifications = data?.notifications ?? [];
  const orderedNotifications = sortNotificationsByReadState(notifications);
  const dropdownNotifications = orderedNotifications.slice(0, 5);
  const unreadCount = unreadCountData?.unread_count ?? 0;
  const unreadLabel = unreadCount > 99 ? "99+" : unreadCount.toString();
  const hasNotifications = orderedNotifications.length > 0;
  const hasUnreadNotifications = unreadCount > 0;
  const markAllReadMutation = useMarkAllNotificationsRead();
  const markNotificationReadMutation = useMarkNotificationRead();
  const canMarkAllRead =
    hasNotifications && hasUnreadNotifications && !markAllReadMutation.isPending;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      void refetchNotifications();
      void refetchUnreadCount();
    }
  };

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="h-[40px] w-[40px] bg-[#FBF9F6] hover:bg-[#eeeeed] transition duration-300 border border-[#ECE9E4] rounded-full grid place-content-center relative"
        >
          <div className="relative">
            <Image
              src="/assets/dashboard/icons/bell-notification.svg"
              height={18}
              width={18}
              alt="Notification icon"
            />
          </div>
          {unreadCount > 0 ? (
            <span className="absolute bg-primary px-[4px] py-[1px] text-[7.5px] text-white rounded-full border-[2px] border-white font-medium top-0 right-0">
              {unreadLabel}
            </span>
          ) : null}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[calc(100vw-2rem)] max-w-[438px] overflow-hidden rounded-[12px] p-0">
        <div className="flex items-center justify-between px-4 py-5">
          <p className="font-semibold text-[18px] leading-[22px] text-[#3A3A3A]">
            Notifications
          </p>
          {/* MARK ALL AS READ */}
          <button
            type="button"
            disabled={!canMarkAllRead}
            onClick={() =>
              markAllReadMutation.mutate(undefined, {
                onSuccess: () => {
                  toast.success("All notifications marked as read.");
                },
                onError: () => {
                  toast.error("Could not mark notifications as read.");
                },
              })
            }
            className={cn(
              "text-[16px] leading-5 transition-colors",
              canMarkAllRead
                ? "text-primary hover:text-primary/80"
                : "cursor-not-allowed text-[#BDBDBD]",
            )}
          >
            Mark all as read
          </button>
        </div>
        <DropdownMenuSeparator />

        {(isLoading || isFetching) && notifications.length === 0 ? (
          <div className="flex h-[360px] items-center justify-center px-4 text-center text-[14px] text-[#6B6B6B]">
            Loading notifications...
          </div>
        ) : isError && notifications.length === 0 ? (
          <div className="flex h-[360px] items-center justify-center px-4 text-center text-[14px] text-[#6B6B6B]">
            Could not load notifications.
          </div>
        ) : orderedNotifications.length > 0 ? (
          <NotificationData
            notifications={dropdownNotifications}
            onMarkRead={(notification) =>
              markNotificationReadMutation.mutate(notification.id, {
                onError: () => {
                  toast.error("Could not mark notification as read.");
                },
              })
            }
          />
        ) : (
          <div className="px-4 w-full h-[360px] flex flex-col items-center justify-center gap-[16px] ">
            <div className="bg-[#FFF0EC] h-[56px] w-[56px] rounded-[12px] grid place-content-center">
              <Image
                src="/assets/dashboard/icons/empty-notifications-icon.svg"
                height={24}
                width={24}
                alt="empty notiification"
              />
            </div>
            <p className="text-[14px] sm:text-[16px] font-semibold text-[#3A3A3A]">
              No notifications yet
            </p>

            <p className="text-[#3A3A3A] text-[12px] sm:text-[14px] text-center max-w-[281px]">
              Start sharing your badge link to see activity here when people
              scan your tags.
            </p>
          </div>
        )}

        <DropdownMenuSeparator />

        <Link
          href={
            notifications.length > 0
              ? "/notifications"
              : "/settings?tab=notifications"
          }
          onClick={() => setOpen(false)}
          className="grid place-content-center py-5"
        >
          <p className="text-[15px] font-medium leading-[19px] text-primary">
            {notifications.length > 0
              ? "View all notifications"
              : "Notification Settings"}
          </p>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
