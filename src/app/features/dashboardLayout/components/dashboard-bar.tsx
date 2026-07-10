"use client";
import { ActionButton } from "./action-button";
import { TopBarSearch } from "./topbar-search";
import { NotificationDropDown } from "./notification";
import { TopBarConfigItem } from "@/app/features/dashboardLayout/types";

export function DashboardBar({ config }: { config: TopBarConfigItem }) {
  const searchPlaceholder = config.search ?? "search badge layouts...";

  return (
    <>
      <TopBarSearch
        placeholder={searchPlaceholder}
        className="min-w-0 max-w-[70%] flex-1"
      />

      <div className="flex gap-[24px]">
        <NotificationDropDown />
        {config.action && (
          <div className="flex shrink-0 items-center">
            <ActionButton action={config.action} />
          </div>
        )}
      </div>
    </>
  );
}


