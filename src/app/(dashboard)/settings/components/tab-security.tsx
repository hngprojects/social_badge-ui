import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SettingsSubCard } from "./settings-subcard";

export default function TabSecurity() {
  return (
    <Card className="text-[14px] text-[#9CA3AF] font-normal py-0 gap-0">
      <CardHeader className="border-b pt-1">
        <SettingsSubCard
          src="/assets/dashboard/settings/_ui-lock-01.svg"
          alt="Lock icon"
          head="Security"
          detail="Change your password and protect your account."
          bg="#FFF0EC"
          showIcon={true}
        />
      </CardHeader>

      <CardAction className="w-full py-6 px-6 flex items-center justify-between">
        <p className="text-[#3A3A3A] font-semibold">Change password</p>
        <Button
          variant="outline"
          className="text-[#3A3A3A] border-[#EEEEEE] hover:bg-[#EEEEEE]"
        >
          Send link to reset password
        </Button>
      </CardAction>
    </Card>
  );
}
