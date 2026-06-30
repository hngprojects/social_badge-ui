"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { SettingsSubCard } from "./settings-subcard";
import { SettingsResetPasswordForm } from "./input-security";

export default function TabSecurity() {
  return (
    <>
      <Card className="text-[14px] text-[#9CA3AF] font-normal py-0 gap-0">
        <CardHeader className="border-b pt-1">
          <SettingsSubCard
            src="/assets/dashboard/settings/_ui-lock-01.svg"
            alt="Lock icon"
            head="Security"
            detail="Change your password and protect your account."
            bg="#FFF0EC"
            showIcon={true}
            isHeader={true}
          />
        </CardHeader>

        <div className="flex w-full flex-col items-start justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center">
          <p className="text-[#3A3A3A] font-semibold">Change password</p>
        </div>

        <div className="px-6 pb-6">
          <SettingsResetPasswordForm />
        </div>
      </Card>
    </>
  );
}
