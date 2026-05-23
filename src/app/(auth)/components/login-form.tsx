"use client";
import { AuthInput } from "@/app/features/auth/components/auth-input";
import { GoogleAuth } from "@/app/features/auth/components/google-auth";
import { useLogin } from "@/app/features/auth/hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormValues } from "@/schemas/auth";

export const LoginForm = () => {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginFormValues) => {
    login({ email: data.email, password: data.password });
  };

  return (
    <div className="login-form bg-[#F5F5F5] rounded-lg px-5 py-6 flex flex-col gap-7">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <AuthInput
            type="email"
            placeholder="Enter your email"
            label={"Email"}
            {...register("email")}
            icon={
              touchedFields.email && errors.email ? <Icons.InfoCircle /> : ""
            }
          />

          <div className="">
            <AuthInput
              type="password"
              placeholder="Enter your password"
              label={"Password"}
              {...register("password")}
              icon={
                touchedFields.password && errors.password ? (
                  <Icons.InfoCircle />
                ) : (
                  ""
                )
              }
            />
            <div className="flex items-center justify-between flex-wrap-reverse gap-2 mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-6 w-6 rounded-[5px] border cursor-pointer border-[#727272] accent-[#FA5424]"
                  name="remember-me"
                  id="remember-me"
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm cursor-pointer text-[#978B8A]"
                >
                  Remember me
                </label>
              </div>

              <Link
                href={"/forgot-password"}
                className="text-sm text-[#978B8A] hover:filter hover:brightness-70"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>

        <Button
          disabled={isSubmitting || isLoading}
          type="submit"
          className="py-6 text-[20px] cursor-pointer"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <GoogleAuth />

      <div className="text-center">
        <p className="text-md">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-[#FA5424] hover:text-[#e14b1c]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
