import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password should be at least eight characters")
      .regex(/[A-Z]/, "Password should have at least a CAPITAL letter")
      .regex(/[a-z]/, "Password should have at least a small letter")
      .regex(/\d/, "Password should have at least a number")
      .regex(
        /[^\p{L}\p{N}\s_]/u,
        "Password should have at least a special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password should be at least six characters")
      .regex(/[A-Z]/, "Password should have at least a CAPITAL letter")
      .regex(/[a-z]/, "Password should have at least a small letter")
      .regex(/\d/, "Password should have at least a number")
      .regex(
        /[^\p{L}\p{N}\s_]/u,
        "Password should have at least a special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;