"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCard from "./tab-profile";
import TabSecurity from "./tab-security";
import TabAccount from "./tab-account";
import TabNotifications from "./tab-notifications";
import { useSearchParams } from "next/navigation";

export default function SettingTabs() {
  const searchParams = useSearchParams();
  const rawTab = searchParams.get("tab");
  const allowedTabs = new Set([
    "profile",
    "security",
    "notifications",
    "account",
  ]);
  const tab = rawTab && allowedTabs.has(rawTab) ? rawTab : "profile";

  return (
    <Tabs key={tab} defaultValue={tab} className="w-full flex flex-col gap-4.5">
      <div className="w-full border rounded-[12px] bg-white">
        <TabsList className="flex gap-1.5 bg-transparent  p-1.5">
          <TabsTrigger
            value="profile"
            className="py-2 px-3.5 leading-[19.5px] rounded-[12px]"
          >
            Profile
          </TabsTrigger>

          <TabsTrigger
            value="security"
            className="py-2 px-3.5 leading-[19.5px] rounded-[12px]"
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="py-2 px-3.5 leading-[19.5px] rounded-[12px]"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="py-2 px-3.5 leading-[19.5px] rounded-[12px]"
          >
            Account
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        forceMount
        className="data-[state=inactive]:hidden"
        value="profile"
      >
        <ProfileCard />
      </TabsContent>

      <TabsContent
        forceMount
        className="data-[state=inactive]:hidden"
        value="security"
      >
        <TabSecurity />
      </TabsContent>
      <TabsContent
        forceMount
        className="data-[state=inactive]:hidden"
        value="notifications"
      >
        <TabNotifications />
      </TabsContent>
      <TabsContent
        forceMount
        className="data-[state=inactive]:hidden"
        value="account"
      >
        <TabAccount />
      </TabsContent>
    </Tabs>
  );
}
