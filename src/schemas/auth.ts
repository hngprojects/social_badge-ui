import { z } from "zod";
const nameRegex = /^[a-zA-Z\s'-]+$/;
export const loginSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters")
      .regex(nameRegex, "First name contains invalid characters"),
    last_name: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name cannot exceed 50 characters")
      .regex(nameRegex, "Last name contains invalid characters"),
    email: z
      .email("Invalid email address")
      .min(1, "Email is required")
      .max(254, "Email is too long"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password should be at least eight characters")
      .max(128, "Password is too long")
      .regex(/[A-Z]/, "Password should have at least a CAPITAL letter")
      .regex(/[a-z]/, "Password should have at least a small letter")
      .regex(/\d/, "Password should have at least a number")
      .regex(
        /[^\p{L}\p{N}\s_]/u,
        "Password should have at least a special character",
      )
      .regex(/^\S+$/, "Password cannot contain spaces"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(254, "Email is too long"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password should be at least eight characters")
      .regex(/[A-Z]/, "Password should have at least a CAPITAL letter")
      .regex(/[a-z]/, "Password should have at least a small letter")
      .regex(/\d/, "Password should have at least a number")
      .regex(
        /[^\p{L}\p{N}\s_]/u,
        "Password should have at least a special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),

    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password should be at least eight characters")
      .max(128, "Password is too long")
      .regex(/[A-Z]/, "Password should have at least a CAPITAL letter")
      .regex(/[a-z]/, "Password should have at least a small letter")
      .regex(/\d/, "Password should have at least a number")
      .regex(
        /[^\p{L}\p{N}\s_]/u,
        "Password should have at least a special character",
      )
      .regex(/^\S+$/, "Password cannot contain spaces"),

    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match!",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from your current password",
    path: ["newPassword"],
  });

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
