import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export function NotificationDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-[40px] w-[40px] bg-[#FBF9F6] border border-[#ECE9E4] rounded-full grid place-content-center relative">
          <div className="relative">
            <Image
              src="/assets/dashboard/icons/bell-notification.svg"
              height={18}
              width={18}
              alt="Notification icon"
            />
          </div>
          {/* <span className="absolute bg-primary px-[4px] py-[1px] text-[7.5px] text-white rounded-full border-[2px] border-white font-medium top-0 right-0">
            10
          </span> */}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[360px]">
        <div className="flex justify-between align-center py-[18px] px-[16px]">
          <p className="font-semibold text-[16px] text-[#3A3A3A]">
            Notifications
          </p>
          <button className="text-[#BDBDBD] text-[14px]">
            Mark all as read
          </button>
        </div>
        <DropdownMenuSeparator />

        <div className="w-full h-[360px] flex flex-col items-center justify-center gap-[16px]">
          <div className="bg-[#FFF0EC] h-[56px] w-[56px] rounded-[12px] grid place-content-center">
            <Image
              src="/assets/dashboard/icons/empty-notifications-icon.svg"
              height={24}
              width={24}
              alt="empty notiification"
            />
          </div>
          <p className="text-[16px] font-semibold text-[#3A3A3A]">
            No notifications yet
          </p>

          <p className="text-[#3A3A3A] text-[14px] text-center w-[281px]">
            Start sharing your badge link to see activity here when people scan
            your tags.
          </p>
        </div>

        <DropdownMenuSeparator />

        <Link href="/settings" className="py-[22px] grid place-content-center">
          <p className="text-primary text-[14px] leading-[14px] font-medium">
            Notification Settings
          </p>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
