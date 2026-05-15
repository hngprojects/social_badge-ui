"use server";
import axios from "axios";

import { cookies } from "next/headers";
import { apiClient } from "@/lib/api/client";
import { LoginPayload, SignupPayload } from "../types";

export const signup = async (data: SignupPayload) => {
  const response = await apiClient<{ status: string; message: string }>(
    "/auth/signup",
    {
      method: "POST",
      data,
    },
  );

  return response;
};
export const login = async (data: LoginPayload) => {
  const { data: body } = await axios.post<{
    status: string;
    message: string;
    data: {
      access_token: string;
      token_type?: string;
      user: Record<string, unknown>;
    };
  }>("/api/auth/login", data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  const cookie = await cookies();

  cookie.set("access-token", body.data.access_token);
  return body;
};

export const forgotPassword = async ({ email }: { email: string }) => {
  return apiClient<{ status: string; message: string }>(
    "/auth/forgot-password",
    {
      method: "POST",
      data: { email },
    },
  );
};

export const resetPassword = async ({
  token,
  new_password,
  confirm_password,
}: {
  token: string;
  new_password: string;
  confirm_password: string;
}) => {
  return apiClient<{ status: string; message: string }>(
    "/auth/reset-password",
    {
      method: "POST",
      data: { token, new_password, confirm_password },
    },
  );
};

export const verifyEmail = async ({ token }: { token: string }) => {
  return apiClient<{ status: string; message: string }>("/auth/verify-email", {
    method: "POST",
    data: { token },
  });
};

// export const checkEmailAvailability = async (email: string) => {
//   return apiClient<CheckEmailResponse>(`/auth/check-email`, {
//     method: 'POST',
//     data: { email },
//   });
// };

// export const logout = async () => {
//   return apiClient('/auth/logout', {
//     method: 'POST',
//   });
// };

// export const getCurrentUser = async () => {
//   return apiClient<AuthResponse>('/auth/me');
// };
