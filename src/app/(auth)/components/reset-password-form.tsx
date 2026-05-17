"use client";
import { AuthInput } from "@/app/features/auth/components/auth-input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useForm, useWatch } from "react-hook-form";
import { useResetPassword } from "@/app/features/auth/hooks/useResetPassword";
import { resetPasswordSchema, ResetPasswordFormValues } from "@/schemas/auth";
import Link from "next/link";
export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { resetPassword, isLoading } = useResetPassword();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<ResetPasswordFormValues>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = useWatch({ control, name: "password" });
  const setBorder = password && !errors.password ? "border-[#22C55E]" : "";

  const onSubmit = (data: ResetPasswordFormValues) => {
    if (!token) {
      toast.error(
        "This page needs a valid reset link. Open the link from your password reset email, or request a new reset from the login page.",
      );
      return;
    }
    resetPassword({
      token,
      new_password: data.password,
      confirm_password: data.confirmPassword,
    });
  };

  return (
		<div className="login-form bg-[#F5F5F5] rounded-lg px-5 py-6 flex flex-col gap-7">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
				<div className="flex flex-col gap-4">
					<div>
						<AuthInput
							{...register("password")}
							type="password"
							placeholder="***********"
							label="Password"
							icon={
								password && !errors.password ? (
									<Icons.Check stroke="#22C55E" />
								) : null
							}
							className={errors.password ? "border-[#EF4444]" : setBorder}
						/>
						{errors.password && (
							<p className="text-[#EF4444] text-xs mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="w-full">
						<AuthInput
							{...register("confirmPassword")}
							type="password"
							placeholder="***********"
							label="Confirm Password"
							icon={errors.confirmPassword ? <Icons.InfoCircle /> : null}
							className={errors.confirmPassword ? "border-[#EF4444]" : ""}
						/>
						{errors.confirmPassword && (
							<p className="text-[#EF4444] text-xs mt-1">
								{errors.confirmPassword.message}
							</p>
						)}
						{!errors.confirmPassword && touchedFields.confirmPassword && (
							<p className="text-[#15803D] text-xs mt-1">Passwords match!</p>
						)}
					</div>
				</div>

				<Button
					type="submit"
					disabled={!isValid || isLoading}
					className={!isValid ? "opacity-50 cursor-not-allowed" : ""}
				>
					{" "}
					{isLoading ? "Saving..." : "Reset & save password"}
				</Button>
			</form>

			<div className="text-center">
				<p className="text-md">
					Go back to{" "}
					<Link
						href="/login"
						className="font-bold text-[#FA5424] hover:text-[#e14b1c]"
					>
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
};