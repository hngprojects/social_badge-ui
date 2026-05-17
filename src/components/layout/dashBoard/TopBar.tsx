import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TopBar() {
  return (
    <section className="flex items-center w-full justify-between gap-6 ">
      <div className="flex w-full max-w-[70%] items-center gap-[4.35px] rounded-[10.41px] bg-[#F8F8F8] py-2.5 pl-[12.5px] text-[14px] font-medium">
        <Image
          src="/assets/dashboard/icons/search-icon.svg"
          height={24}
          width={24}
          alt="search icon"
        />

        <input
          className="w-full bg-transparent outline-none"
          type="text"
          placeholder="Search for Events, Badges, Attendees..."
        />
      </div>

      <div className="flex shrink-0 gap-5 ">
        <div className="relative grid h-11 w-11 place-content-center rounded-full bg-[#F7F7F8] cursor-pointer">
          <div className="absolute grid h-auto w-[15.59px] items-center rounded-full bg-[#FA5424] px-1 py-px text-[7.31px] text-white">
            10
          </div>

          <Image
            src="/assets/dashboard/icons/notification.svg"
            alt="notification icon"
            width={22}
            height={22}
          />
        </div>

        <Link href="/create-badges">
          <Button className="h-auto! bg-[#FA5424] px-6 py-3.5! text-[14px] font-semibold">
            Create new badge
          </Button>
        </Link>
      </div>
    </section>
  );
}
