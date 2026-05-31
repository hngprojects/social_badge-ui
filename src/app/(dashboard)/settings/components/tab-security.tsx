"use client";

import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SettingsSubCard } from "./settings-subcard";
import { useForgotPassword } from "@/app/features/auth/hooks/useForgotPassword";
import { useUserStore } from "@/stores/use-user-store";
import { useState } from "react";
import { SettingsResetPasswordForm } from "./input-security";

export default function TabSecurity() {
  const [showModal, setShowModal] = useState(false);
  const { forgotPassword, isLoading } = useForgotPassword();
  const { user } = useUserStore();

  const handleResetPassword = () => {
    if (user?.email) {
      forgotPassword(
        { email: user.email },
        { onSuccess: () => setShowModal(true) },
      );
    }
  };

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

        <div className="w-full py-6 px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <p className="text-[#3A3A3A] font-semibold">Change password</p>
        </div>

        <div className="px-6 pb-6">
          <SettingsResetPasswordForm />
        </div>
      </Card>
    </>
  );
}
