import { apiClient } from "@/lib/api/client";
import { SubscribePayload, SubscribeResponse } from "../types/newsletter";

export const subscribe = async (data: SubscribePayload) => {
	const body = await apiClient<SubscribeResponse>(
		"/newsletter/subscribe",
		{
			method: "POST",
			data,
		},
	);

	return body;
};
