import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SettingsSubCard } from "./settings-subcard";
import { Button } from "@/components/ui/button";
import { RowSeparator } from "./row-seperator";

export default function TabAccount() {
  return (
    <Card className="text-[14px] text-[#9CA3AF] font-normal py-0 gap-0">
      <CardHeader className="border-b pt-1">
        <SettingsSubCard
          bg="#ECEFFF"
          src="/assets/dashboard/settings/_ui-user-02.svg"
          alt="user icon"
          head="Account"
          detail="Sign out or close your account"
          showIcon={true}
          isHeader={true}
        />
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="flex flex-col gap-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-0.5 pt-2.5 pb-6">
          <SettingsSubCard
            bg="#FFF0C9"
            head="Log out"
            detail="Log out of this device. You can sign back in any time."
            isHeader={true}
          />{" "}
          <Button
            variant="cta"
            className="text-[14px] text-[#3A3A3A] py-2 px-4 bg-white shadow-none border-[#EEEEEE] hover:bg-[#f2f2f2]"
          >
            Log out
          </Button>
        </div>
      </CardContent>

      <CardContent>
        <RowSeparator />
        <div className="py-2.5">
          <SettingsSubCard
            bg="#EEEEEE"
            head="Danger Zone"
            detail="Permanent and irreversible actions"
            isHeader={true}
          />
        </div>

        <div className="bg-[#FEF2F2] p-4 pt-0.5 border rounded-[12px] border-[#FEE2E2] flex flex-col sm:flex-row items-start sm:items-center sm:gap-4 justify-between mb-6">
          <SettingsSubCard
            bg="#EEEEEE"
            src="/assets/dashboard/settings/megaphone.svg"
            alt="megaphone icon"
            head="Delete your account"
            detail="Permanently delete your account, all your badges, and engagement data. This action can't be undone."
            danger={true}
            isHeader={true}
          />
          <Button className="bg-[#DC2626] border-none text-[14px] py-2 px-4 text-white font-medium shadow-[0px_4px_12px_-4px_rgba(220,38,38,0.4),0px_1px_0px_0px_rgba(0,0,0,0.08)] hover:opacity-90 hover:bg-[bg-[#DC2626]">
            Delete account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
