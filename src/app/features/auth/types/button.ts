import React from "react";

export type ButtonProps = {
  children: React.ReactNode;
  variant?: "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
