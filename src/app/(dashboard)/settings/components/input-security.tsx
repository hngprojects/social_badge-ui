"use client";

import { AuthInput } from "@/app/features/auth/components/auth-input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePasswordSchema, ChangePasswordFormValues } from "@/schemas/auth";
import { useChangePassword } from "@/app/features/settings/hooks/useChangePassword";

export const SettingsResetPasswordForm = () => {
  const { changePassword, isLoading } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangePasswordFormValues>({
    mode: "onChange",
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    changePassword({
      current_password: data.oldPassword,
      new_password: data.newPassword,
      confirm_password: data.confirmNewPassword,
    });
  };

  return (
    <div className="login-form flex flex-col gap-7">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
        <div className="flex flex-col gap-7">
          <AuthInput
            {...register("oldPassword")}
            type="password"
            label="Enter current password"
            placeholder="***********"
            required
          />
          {errors.oldPassword && (
            <p className="text-[#EF4444] text-xs -mt-5">
              {errors.oldPassword.message}
            </p>
          )}

          <AuthInput
            {...register("newPassword")}
            type="password"
            label="Enter new password"
            placeholder="***********"
            required
          />
          {errors.newPassword && (
            <p className="text-[#EF4444] text-xs -mt-5">
              {errors.newPassword.message}
            </p>
          )}

          <AuthInput
            {...register("confirmNewPassword")}
            type="password"
            label="Confirm new password"
            placeholder="***********"
            required
          />
          {errors.confirmNewPassword && (
            <p className="text-[#EF4444] text-xs -mt-5">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="text-[14px] py-2 px-4"
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};
