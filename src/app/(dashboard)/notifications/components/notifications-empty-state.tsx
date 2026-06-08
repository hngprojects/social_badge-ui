import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import type { NotificationsEmptyStateConfig } from "../../types/dashboard/notifications";

export function NotificationsEmptyState({
  title,
  message,
  showDashboardLink,
}: NotificationsEmptyStateConfig) {
  return (
    <div className="flex min-h-[560px] w-full items-center justify-center rounded-[12px] bg-white px-4 py-12">
      <div className="flex w-full max-w-[300px] flex-col items-center text-center">
        <div className="mb-6 grid size-14 place-content-center rounded-[12px] bg-[#FFF0EC]">
          <Image
            src="/assets/dashboard/icons/empty-notifications-icon.svg"
            height={28}
            width={28}
            alt="No notifications"
          />
        </div>
        <h2 className="mb-4 text-[16px] font-semibold leading-5 text-[#3A3A3A]">
          {title}
        </h2>
        <p className="mb-6 max-w-[286px] text-[13px] leading-[18px] text-[#3A3A3A]">
          {message}
        </p>
        {showDashboardLink ? (
          <Button
            asChild
            className="h-11 rounded-full px-8 text-[14px] font-semibold"
            variant="cta"
          >
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
