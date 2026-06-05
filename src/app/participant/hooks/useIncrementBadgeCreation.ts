import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { incrementBadgeCreation } from "../services/badge";
import { badgeAnalyticsKey } from "@/app/(dashboard)/hooks/use-badge-analytics";

export const useIncrementBadgeCreation = () => {
	const queryClient = useQueryClient();

	const { mutate: incrementCreation, isPending: isLoading } = useMutation({
		mutationFn: incrementBadgeCreation,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: badgeAnalyticsKey,
			});
		},

		onError: () => {
			toast.error("Failed to update creation count. Please try again.");
		},
	});

	return {
		incrementCreation,
		isLoading,
	};
};
