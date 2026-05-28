import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "@/app/features/auth/types";
import { useUserStore } from "@/stores/use-user-store";
import { useState } from "react";

export const useSignup = () => {
	const { setUser } = useUserStore();
	const [isRateLimited, setIsRateLimited] = useState(false);

	const {
		mutate: signup,
		isPending: isLoading,
		isError,
	} = useMutation({
		mutationFn: signupApi,

		onSuccess: (data) => {
			setUser(data.data);
			toast.success(
				"Signup successful! Please check your email to verify your account.",
			);
		},

		onError: (error) => {
			const axiosError = error as AxiosError<ApiError>;
			const status = axiosError.response?.status;
			const message =
				axiosError.response?.data?.message ||
				"Signup failed. Please try again.";

			if (status === 429) {
				toast.error(
					"Too many attempts. Please try again later",
				);

				setIsRateLimited(true);

				// Automatically unblock after a cooldown period (e.g., 60 seconds)
				setTimeout(() => {
					setIsRateLimited(false);
				}, 60000);
				return;
			}

			toast.error(message);
		},
	});

	
	// ADDED HERE: Guard interceptor function
	const handleSignup = (...args: Parameters<typeof signup>) => {
		if (isRateLimited) {
			toast.error("Too many attempts. Please try again later");
			return;
		}
		// Spreads and forwards the data payload AND the onSuccess callbacks safely
		signup(...args);
	};

	
	return { signup: handleSignup, isLoading, isError, isRateLimited };
};