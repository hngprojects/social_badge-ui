"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCard from "./tab-profile";
import TabSecurity from "./tab-security";
import TabNotifications from "./tab-notifications";
import TabAccount from "./tab-account";

export default function SettingTabs() {
  return (
    <Tabs defaultValue="profile" className="w-full  flex gap-4.5">
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
            className="h-auto flex-none rounded-[12px] px-3.5 py-1.75 text-[14px] font-medium leading-5"
          >
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="py-1.75 px-3.5">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="account" className="py-1.75 px-3.5">
            Account
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="profile">
        <ProfileCard />
      </TabsContent>

      <TabsContent value="security">
        <TabSecurity />
      </TabsContent>
      <TabsContent value="notifications">
        <TabNotifications />
      </TabsContent>
      <TabsContent value="account">
        <TabAccount />
      </TabsContent>
    </Tabs>
  );
}
