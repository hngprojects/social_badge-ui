"use client";

import { AuthInput } from "@/app/features/auth/components/auth-input";
import { AuthModal } from "@/app/features/auth/components/auth-modal";
import { Button } from "@/app/features/auth/components/button";
import { GoogleAuth } from "@/app/features/auth/components/google-auth";
import { useSignup } from "@/app/features/auth/hooks/useSignup";
import { SignupPayload } from "@/app/features/auth/types";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

type SignupFormValues = SignupPayload & {
  confirmPassword: string;
};

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<SignupFormValues>({ mode: "onChange" });
  const { signup, isLoading } = useSignup();
  const [modalMessage, setModalMessage] = useState<string | undefined>();

  const password = useWatch({
    control,
    name: "password",
  });

  const email = useWatch({
    control,
    name: "email",
  });

  let passwordInputClassName = "";
  if (errors.password) {
    passwordInputClassName = "border-[#EF4444]";
  } else if (password) {
    passwordInputClassName = "border-[#22C55E]";
  }

  let confirmPasswordInputClassName = "";
  if (errors.confirmPassword) {
    confirmPasswordInputClassName = "border-[#EF4444]";
  } else if (touchedFields.confirmPassword) {
    confirmPasswordInputClassName = "border-[#22C55E]";
  }

  const onSubmit = (data: SignupFormValues) => {
    signup(
      {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          if (data.message.includes("Verification email failed to send")) {
            setModalMessage(data.message);
          }
          setShowModal(true);
          reset();
        },
      },
    );
  };

  return (
    <>
      <div className="page-info sm:leading-20">
        <h1 className="page-title font-semibold text-[40px] sm:text-[52px] ">
          Create Account
        </h1>
        <p className="font-medium text-base sm:text-[18px] text-[#978B8A]">
          Sign up and create an account with Social Badge{" "}
        </p>
      </div>

      <div className="login-form bg-[#F5F5F5] rounded-lg px-5 py-6 flex flex-col gap-7">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-5"
        >
          <div className="flex flex-col gap-4">
            <div className="first flex justify-between gap-4 w-full ">
              <div className="w-full">
                <AuthInput
                  {...register("first_name", {
                    required: "First name is required",
                  })}
                  type="text"
                  placeholder="John"
                  label={"First Name"}
                  disabled={isSubmitting || isLoading}
                  icon={errors.first_name ? <Icons.InfoCircle /> : null}
                  className={errors.first_name ? "border-[#EF4444]" : ""}
                />
                {errors.first_name && (
                  <p className="text-[#EF4444] text-xs mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <AuthInput
                  {...register("last_name", {
                    required: "Last name is required",
                  })}
                  type="text"
                  placeholder="Doe"
                  label={"Last Name"}
                  disabled={isSubmitting || isLoading}
                  icon={errors.last_name ? <Icons.InfoCircle /> : null}
                  className={errors.last_name ? "border-[#EF4444]" : ""}
                />
                {errors.last_name && (
                  <p className="text-[#EF4444] text-xs mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full">
              <AuthInput
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                disabled={isSubmitting || isLoading}
                placeholder="usersocialbadge@hng.com"
                label={"Email"}
                id="email"
                icon={errors.email ? <Icons.InfoCircle /> : null}
                className={errors.email ? "border-[#EF4444]" : ""}
              />
              {errors.email && (
                <p className="text-[#EF4444] text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="">
              <AuthInput
                {...register("password", {
                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password should have at least a CAPITAL letter",

                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) ||
                      "Password should have at least a small letter",

                    hasNumber: (value) =>
                      /\d/.test(value) ||
                      "Password should have at least a number",

                    hasSpecialCharacter: (value) =>
                      /[^\p{L}\p{N}\s_]/u.test(value) ||
                      "Password should have at least a special character",

                    minLength: (value) =>
                      value.length >= 6 ||
                      "Password should be at least six characters",
                  },
                  required: "Password is required",
                })}
                disabled={isSubmitting || isLoading}
                type="password"
                placeholder="***********"
                label={"Password"}
                className={passwordInputClassName}
              />
              {errors.password && (
                <p className="text-[#EF4444] text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="">
              <div className="w-full">
                <AuthInput
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match!",
                  })}
                  disabled={isSubmitting || isLoading}
                  type="password"
                  placeholder="***********"
                  label={"Confirm Password"}
                  icon={errors.confirmPassword ? <Icons.InfoCircle /> : null}
                  className={confirmPasswordInputClassName}
                />
                {errors.confirmPassword && (
                  <p className="text-[#EF4444] text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded-[5px] border border-[#727272] accent-[#FA5424]"
                  name="remember-me"
                  id="remember-me"
                  disabled={isSubmitting || isLoading}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  checked={isChecked}
                />
                <label htmlFor="remember-me" className="text-xs text-[#978B8A]">
                  I agree to Social Badge Terms of Service and Privacy Policy. I
                  may receive product update emails.
                </label>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isChecked || isSubmitting || isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        {/* google auth */}
        <GoogleAuth />

        <div className="text-center">
          <p className="text-md">
            Don&apos;t have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#FA5424] hover:text-[#e14b1c]"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      {showModal && (
        <AuthModal
          closeModal={() => setShowModal(false)}
          email={email}
          title="Verify your email address"
          description={
            modalMessage ? (
              <p>{modalMessage}</p>
            ) : (
              <>
                <p>We have sent a link to verify your email address. </p>
                <p>
                  Check your email for the link to verify your email address
                </p>
              </>
            )
          }
        />
      )}
    </>
  );
};

export default Page;
