"use client";
import { Button } from "@/app/features/auth/components/button";
import { VerifyEmailModal } from "@/app/features/auth/components/verify-email-modal";
import { useVerifyEmail } from "@/app/features/auth/hooks/useVerifyEmail";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { verifyEmail, isError, isLoading } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      verifyEmail({ token });
    }
  }, [token, verifyEmail]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      {token && isLoading && (
        <div className="w-full max-w-md rounded-[24px] bg-white p-8 shadow-[0px_20px_60px_rgba(0,0,0,0.12)]">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="h-14 w-14 rounded-full border-4 border-[#FA5424]/20 border-t-[#FA5424] animate-spin" />

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#121217]">
                Verifying Email
              </h2>

              <p className="text-sm leading-6 text-[#6C6C89]">
                Please wait while we verify your email address.
              </p>
            </div>
          </div>
        </div>
      )}

      {(!token || isError) && (
        <div className="w-full max-w-md rounded-[24px] bg-white p-8 shadow-[0px_20px_60px_rgba(0,0,0,0.12)]">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEF2F2]">
              <span className="text-2xl text-[#EF4444]">✕</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#121217]">
                Verification Failed
              </h2>

              <p className="text-sm leading-6 text-[#6C6C89]">
                We couldn’t verify your email address. The link may have
                expired.
              </p>
              <Button>Resend verification email</Button>
            </div>
          </div>
        </div>
      )}

      {token && !isLoading && !isError && <VerifyEmailModal />}
    </div>
  );
};

export default Page;
