import Image from "next/image";
import { ActionButton } from "./ActionButton";
import { TopBarConfigItem } from "../../types/dashboard/topbar";

export function DashboardBar({ config }: { config: TopBarConfigItem }) {
  const searchPlaceholder =
    config.search ?? "Search for events, badges, attendees";

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
          {searchPlaceholder}
        </label>
        <input
          id="dashboard-search"
          aria-label={searchPlaceholder}
          className="w-full bg-transparent outline-none"
          type="text"
          placeholder={searchPlaceholder}
        />
      </div>

      {config.action && (
        <div className="flex shrink-0 items-center">
          <ActionButton action={config.action} />
        </div>
      )}
    </>
  );
}
