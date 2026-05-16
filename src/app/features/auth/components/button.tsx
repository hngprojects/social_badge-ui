import { cva } from "class-variance-authority";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const buttonVariants = cva(
  "w-full bg-[#FA5424] cursor-pointer text-base sm:text-[20px] font-semibold text-white py-2 px-4 rounded-full hover:bg-[#e14b1c] focus:outline-none disabled:bg-[#FF9475] disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        outline:
          "bg-transparent border border-[#FA5424] !text-[#FA5424] hover:bg-transparent hover:text-white disabled:border-[#FF9475] disabled:text-[#FF9475] disabled:hover:bg-transparent",
      },
    },
  },
);

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={buttonVariants({
        className: props.className,
        variant: props.variant,
      })}
      {...props}
    >
      {props.children}
    </button>
  );
};
