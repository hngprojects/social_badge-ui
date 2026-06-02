"use client";

import { useChangePassword } from "@/app/features/settings/hooks/useChangePassword";
import { AuthInput } from "@/app/features/auth/components/auth-input";
import { Button } from "@/components/ui/button";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
            <p className="-mt-5 text-xs text-[#EF4444]">
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
            <p className="-mt-5 text-xs text-[#EF4444]">
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
            <p className="-mt-5 text-xs text-[#EF4444]">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="px-4 py-2 text-[14px]"
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};
