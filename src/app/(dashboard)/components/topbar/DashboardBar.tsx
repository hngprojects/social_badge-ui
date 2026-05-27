import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getActionButtonClass } from "./ActionButton";
import { TopBarConfigItem } from "../../types/dashboard/topbar";

export function DashboardBar({ config }: { config: TopBarConfigItem }) {
  return (
    <>
      <div className="flex w-full max-w-[70%] items-center gap-[4.35px] rounded-[10.41px] bg-[#F8F8F8] py-2.5 pl-[12.5px] text-[14px] font-medium">
        <Image
          src="/assets/dashboard/icons/search-icon.svg"
          height={24}
          width={24}
          alt="search icon"
        />
        <label htmlFor="dashboard-search" className="sr-only">
          Search for events, badges, attendees
        </label>
        <input
          id="dashboard-search"
          aria-label="Search for events, badges, attendees"
          className="w-full bg-transparent outline-none"
          type="text"
          placeholder="Search for Events, Badges, Attendees..."
        />
      </div>

      {config.action && (
        <div className="flex shrink-0 items-center">
          <Button className={getActionButtonClass(config.action.isOrange)}>
            <Link href={config.action.href} className="flex items-center gap-2">
              {config.action.icon && (
                <Image src={config.action.icon} alt="" width={16} height={16} />
              )}
              <span>{config.action.label}</span>
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
