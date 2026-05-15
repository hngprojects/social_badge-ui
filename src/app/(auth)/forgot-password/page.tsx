"use client";
import { AuthInput } from "@/app/features/auth/components/auth-input";
import { AuthModal } from "@/app/features/auth/components/auth-modal";
import { useForgotPassword } from "@/app/features/auth/hooks/useForgotPassword";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const { forgotPassword, isLoading } = useForgotPassword();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>();
  const email = useWatch({
    control,
    name: "email",
  });

  const onSubmit = (data: { email: string }) => {
    forgotPassword(
      { email: data.email },
      {
        onSuccess: () => setShowModal(true),
      },
    );
  };

  return (
    <>
      <div className="h-full flex flex-col justify-center gap-7">
        <div className="page-info sm:leading-20">
          <h1 className="page-title font-semibold text-[40px] sm:text-[52px] ">
            Reset Password
          </h1>
          <p className="font-medium text-base sm:text-[18px] text-[#978B8A] w-[70%]">
            Enter your registered email address to receive password reset
            link{" "}
          </p>
        </div>

        <div className="login-form bg-[#F5F5F5] rounded-lg px-5 py-6 flex flex-col gap-7">
          <form
            className=" flex flex-col gap-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4">
              <AuthInput
                disabled={isSubmitting || isLoading}
                type="email"
                placeholder="usersocialbadge@hng.com"
                label={"Email"}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-[#EF4444] text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button disabled={isSubmitting || isLoading} type="submit">
              {isLoading ? "Sending reset link..." : "Send Reset Link"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-md">
              Go back to{" "}
              <a
                href="/login"
                className="font-bold text-[#FA5424] hover:text-[#e14b1c]"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <AuthModal
          closeModal={() => setShowModal(false)}
          email={email}
          imageSrc="/assets/auth-flow/mail-img.png"
          title="We’ve sent you a reset link"
          description={
            <>
              <p>We’ve sent instructions to your registered email address.</p>
              <p>Click the link in the email to reset your password.</p>
            </>
          }
        />
      )}
    </>
  );
};

export default Page;
