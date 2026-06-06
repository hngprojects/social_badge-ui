"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { SettingsSubCard } from "./settings-subcard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useNotificationPreferences,
  useUpdateNotificationPreferences,
} from "@/app/features/settings/hooks/useNotificationPreferences";
import type {
  ImplementedNotificationPreference,
  NotificationPreferenceCardKey,
  UpdateNotificationPreferencesPayload,
} from "@/app/features/settings/types/notification-preferences";

const implementedPreferences: Record<
  NotificationPreferenceCardKey,
  ImplementedNotificationPreference
> = {
  badgeClaims: "notify_badge_creation",
  dailyDigest: "notify_daily_digest",
  weeklyReport: "notify_weekly_report",
};

const preferenceLabels: Record<ImplementedNotificationPreference, string> = {
  notify_badge_creation: "Badge claims",
  notify_daily_digest: "Daily digest",
  notify_weekly_report: "Weekly performance report",
};

const defaultPreferences: Required<UpdateNotificationPreferencesPayload> = {
  notify_badge_creation: true,
  notify_daily_digest: true,
  notify_weekly_report: true,
};

const turnedOffPreferences: Required<UpdateNotificationPreferencesPayload> =
  {
    notify_badge_creation: false,
    notify_daily_digest: false,
    notify_weekly_report: false,
  };

export default function TabNotifications() {
  const notificationPreferences = useNotificationPreferences();
  const updatePreferences = useUpdateNotificationPreferences();
  const isUpdating =
    updatePreferences.isPending || notificationPreferences.isLoading;
  const preferences = {
    notify_badge_creation:
      notificationPreferences.data?.data.notify_badge_creation ??
      defaultPreferences.notify_badge_creation,
    notify_daily_digest:
      notificationPreferences.data?.data.notify_daily_digest ??
      defaultPreferences.notify_daily_digest,
    notify_weekly_report:
      notificationPreferences.data?.data.notify_weekly_report ??
      defaultPreferences.notify_weekly_report,
  };

  const updatePreference = async (
    key: ImplementedNotificationPreference,
    checked: boolean,
  ) => {
    try {
      await updatePreferences.mutateAsync({ [key]: checked });
      toast.success(
        `${preferenceLabels[key]} notifications ${checked ? "enabled" : "disabled"}.`,
      );
    } catch {
      toast.error("Could not update notification preferences.");
    }
  };

  const turnOffAllNotifications = async () => {
    try {
      await updatePreferences.mutateAsync(turnedOffPreferences);
      toast.success("All notifications turned off.");
    } catch {
      toast.error("Could not turn off notifications.");
    }
  };

  return (
    <Card className="text-[14px] text-[#9CA3AF] font-normal py-0">
      <CardHeader className="border-b pt-1">
        <SettingsSubCard
          bg="#FFF0C9"
          src="/assets/dashboard/settings/_ui-bell-02.svg"
          alt="notification icon"
          head="Notifications"
          detail="Choose which notifications you'd like to receive"
          showIcon={true}
          isHeader={true}
        />
      </CardHeader>

      <CardContent className="flex flex-col gap-0">
        <h3 className="uppercase text-[12px] font-bold">Event Activity</h3>

        <SettingsSubCard
          id="badge-icon"
          bg="#FFEDDC"
          src="/assets/dashboard/icons/badges-active.svg"
          alt="Badge icon"
          head="Badge claims"
          detail="Notify me when someone claims a badge from one of my events"
          showIcon={true}
          showSwitch={true}
          switchChecked={preferences[implementedPreferences.badgeClaims]}
          switchDisabled={isUpdating}
          onSwitchChange={(checked) =>
            updatePreference(implementedPreferences.badgeClaims, checked)
          }
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
          switchChecked={preferences[implementedPreferences.dailyDigest]}
          switchDisabled={isUpdating}
          onSwitchChange={(checked) =>
            updatePreference(implementedPreferences.dailyDigest, checked)
          }
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
          switchChecked={preferences[implementedPreferences.weeklyReport]}
          switchDisabled={isUpdating}
          onSwitchChange={(checked) =>
            updatePreference(implementedPreferences.weeklyReport, checked)
          }
        />
      </CardContent>

      <CardAction className="py-3.5 px-6 flex justify-end w-full border-t bg-[#FBFAF7]">
        <Button
          variant="cta"
          disabled={isUpdating}
          onClick={turnOffAllNotifications}
          className="text-[14px] text-[#3A3A3A] py-2 px-4 bg-white shadow-none border-[#EEEEEE] hover:bg-[#f2f2f2]"
        >
          Turn off all
        </Button>
      </CardAction>
    </Card>
  );
}
