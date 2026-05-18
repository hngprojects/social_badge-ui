import React from "react";
import type { ButtonProps } from "../types/button";
import { buttonVariants } from "../constants/button";

export { buttonVariants };
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
