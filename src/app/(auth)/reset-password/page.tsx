import { Suspense } from "react";
import { ResetPasswordForm } from "../components/reset-password-form";

const Page = () => {
  return (
    <div className="h-full flex flex-col justify-center gap-7">
      <div className="page-info sm:leading-20">
        <h1 className="page-title font-semibold text-[40px] sm:text-[52px]">
          Reset Password
        </h1>
        <p className="font-medium text-base sm:text-[18px] text-[#978B8A] w-[70%]">
          Enter your new password below. Ensure the password matches
        </p>
      </div>

      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default Page;