"use client";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import React from "react";

type InputProps = {
  label: string;
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const AuthInput = (props: InputProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const inputType = isVisible ? "text" : "password";

  const passwordIcon =
    props.type === "password" ? (
      <PasswordEyeIcon isVisible={isVisible} setIsVisible={setIsVisible} />
    ) : null;

  return (
    <div className="w-full relative">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-[#121217]"
      >
        {props.label} <span className="text-[#F53D6B]">*</span>
      </label>

      <input
        {...props}
        type={props.type === "password" ? inputType : props.type}
        className={cn(
          " w-full h-12.5 p-4 mt-1 rounded-md text-black placeholder:text-[#6C6C89] outline-none border border-[#D1D1DB] bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#1212170D] focus:border-[#7d7777]  text-sm",
          props.className,
        )}
        placeholder={props.placeholder}
      />
      {/* icons */}
      <span className="absolute right-3 top-[67%] translate-y-[-50%] text-[#6C6C89]">
        {props.icon ? props.icon : passwordIcon}
      </span>
    </div>
  );
};

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
    >
      {isVisible ? <Icons.EyeClosed /> : <Icons.EyeOpen />}
    </button>
  );
};
