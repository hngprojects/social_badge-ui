import { apiClient } from "@/lib/api/client";
import { LoginPayload, SignupPayload } from "../types";
import { User } from "@/stores/use-user-store";

export const signup = async (data: SignupPayload) => {
	const response = await apiClient<{ status: string; message: string, data:User }>(
		"/auth/signup",
		{
			method: "POST",
			data,
		},
	);

	return response;
};
export const login = async (data: LoginPayload) => {
	const body = await apiClient<{
		status: string;
		message: string;
		data: {
			access_token: string;
			token_type?: string;
			user: User;
		};
	}>("/auth/login", {
		method: "POST",
		data,
	});

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
export const resendVerifyEmail = async ({ email }: { email: string }) => {
	return apiClient<{ status: string; message: string }>(
		"/auth/resend-verification-email",
		{
			method: "POST",
			data: { email },
		},
	);
};

// export const checkEmailAvailability = async (email: string) => {
//   return apiClient<CheckEmailResponse>(`/auth/check-email`, {
//     method: 'POST',
//     data: { email },
//   });
// };

export const logout = async () => {
	return apiClient<{ status: string; message: string }>("/auth/logout", {
		method: "POST",
	});
};

/** Uses the httpOnly refresh_token cookie to issue a new access_token cookie. */
export const refreshSession = async () => {
	return apiClient<{ status: string; message: string }>("/auth/refresh", {
		method: "POST",
	});
};

export const getCurrentUser = async () => {
	return apiClient<{ status: string; message: string; data: User }>("/auth/me");
};
