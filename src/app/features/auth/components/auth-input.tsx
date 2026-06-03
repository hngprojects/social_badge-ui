"use client";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

type InputProps = {
  label: string;
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const AuthInput = React.forwardRef<HTMLInputElement, InputProps>(
  function AuthInput({ label, icon, type, className, id, ...props }, ref) {
    const [isVisible, setIsVisible] = React.useState(false);
    const generatedId = React.useId();
    const resolvedId = id ?? generatedId;

    const passwordIcon =
      type === "password" ? (
        <PasswordEyeIcon isVisible={isVisible} setIsVisible={setIsVisible} />
      ) : null;

    return (
      <div className="w-full relative">
        <Label htmlFor={resolvedId} className="block text-sm font-medium text-[#121217]">
          {label} <span className="text-[#F53D6B]">*</span>
        </Label>

        <Input
          ref={ref}
          {...props}
          id={resolvedId}
          type={type === "password" ? (isVisible ? "text" : "password") : type}
          className={cn(
            "h-12.5 p-4 mt-1 rounded-md text-black placeholder:text-[#6C6C89] border border-[#D1D1DB] bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#1212170D] focus-visible:border-[#7d7777] focus-visible:ring-0 text-sm",
            className,
          )}
        />
        <span className="absolute right-3 top-[67%] translate-y-[-50%] text-[#6C6C89]">
          {icon ? icon : passwordIcon}
        </span>
      </div>
    );
  },
);

const PasswordEyeIcon = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}) => {
  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={() => setIsVisible(!isVisible)}
      aria-label={isVisible ? "Hide password" : "Show password"}
      aria-pressed={isVisible}
    >
      {isVisible ? <Icons.EyeClosed /> : <Icons.EyeOpen />}
    </button>
  );
};
