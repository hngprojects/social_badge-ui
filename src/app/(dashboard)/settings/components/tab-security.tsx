"use client";

import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SettingsSubCard } from "./settings-subcard";
import { useForgotPassword } from "@/app/features/auth/hooks/useForgotPassword";
import { useUserStore } from "@/stores/use-user-store";
import { useState } from "react";
import { AuthModal } from "@/app/features/auth/components/auth-modal";

export default function TabSecurity() {
  const [showModal, setShowModal] = useState(false);
  const { forgotPassword, isLoading } = useForgotPassword();
  const { user } = useUserStore();

  const handleResetPassword = () => {
    if (user?.email) {
      forgotPassword(
        { email: user.email },
        { onSuccess: () => setShowModal(true) }
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

        <CardAction className="w-full py-6 px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <p className="text-[#3A3A3A] font-semibold">Change password</p>
          <Button
            variant="outline"
            className="text-[#3A3A3A] border-[#EEEEEE] hover:bg-[#EEEEEE]"
            onClick={handleResetPassword}
            disabled={isLoading || !user?.email}
          >
            {isLoading ? "Sending..." : "Send link to reset password"}
          </Button>
        </CardAction>
      </Card>

      <AuthModal
        open={showModal}
        onOpenChange={setShowModal}
        email={user?.email || ""}
        imageSrc="/assets/auth-flow/mail-img.png"
        title="We've sent you a reset link"
        description={
          <>
            <p>We&apos;ve sent instructions to your registered email address.</p>
            <p>Click the link in the email to reset your password.</p>
          </>
        }
      />
    </>
  );
}

