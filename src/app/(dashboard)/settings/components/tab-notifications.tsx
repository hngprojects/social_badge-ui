import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { SettingsSubCard } from "./settings-subcard";
import { Button } from "@/components/ui/button";

export default function TabNotifications() {
  return (
    <Card className="text-[14px] text-[#9CA3AF] font-normal py-0">
      <CardHeader className="border-b pt-1">
        <SettingsSubCard
          bg="#FFF0C9"
          src="/assets/dashboard/settings/_ui-bell-02.svg"
          alt="notification icon"
          head="Notifications"
          detail="Choose which emails you'd like to receive"
          showIcon={true}
          isHeader={true}
        />
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="flex flex-col gap-0">
        <h3 className="uppercase text-[12px] font-bold">Event Activity</h3>

        <SettingsSubCard
          id="badge-icon"
          bg="#FFEDDC"
          src="/assets/dashboard/icons/badges-active.svg"
          alt="Badge icon"
          head="Badge claims"
          detail="Email me when someone claims a badge from one of my events"
          showIcon={true}
          showSwitch={true}
        />

        <SettingsSubCard
          id="daily-digest"
          bg="#DCFFDC"
          src="/assets/dashboard/settings/_ui-bar-chart-01.svg"
          alt="Chart icon"
          head="Daily digest"
          detail="Summary of claims, shares, and clicks"
          showIcon={true}
          showSwitch={true}
        />

        <SettingsSubCard
          id="weekly-performance-report"
          bg="#DCECFF"
          src="/assets/dashboard/settings/_ui-calendar-date.svg"
          alt="Calendar icon"
          head="Weekly performance report"
          detail="Engagement rates, top sharing platforms and trends"
          showIcon={true}
          showSwitch={true}
        />
      </CardContent>

      {/* BUTTON */}
      <CardAction className="py-3.5 px-6 flex justify-end w-full border-t bg-[#FBFAF7]">
        <Button
          variant="cta"
          className="text-[14px] text-[#3A3A3A] py-2 px-4 bg-white shadow-none border-[#EEEEEE] hover:bg-[#f2f2f2]"
        >
          Unsubscribe from all
        </Button>
      </CardAction>
    </Card>
  );
}
