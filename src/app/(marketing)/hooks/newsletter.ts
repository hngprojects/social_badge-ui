import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { subscribe } from "../services/newsletter";
import { SubscribePayload } from "../types/newsletter";

type ApiError = {
	message?: string;
};

export const useSubscribe = () => {
	const {
		mutate: subscribeToNewsletter,
		isPending: isLoading,
		isError,
	} = useMutation({
		mutationFn: (data: SubscribePayload) => subscribe(data),

		onSuccess: (response) => {
			toast.success(response.message || "Subscribed successfully");
		},

		onError: (error) => {
			const err = error as AxiosError<ApiError>;

			toast.error(err.response?.data?.message || "Failed to subscribe");
		},
	});

	return {
		subscribeToNewsletter,
		isLoading,
		isError,
	};
};
