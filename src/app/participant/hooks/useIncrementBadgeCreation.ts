import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { incrementBadgeCreation } from "../services/badge";
import { badgeAnalyticsKey } from "@/app/(dashboard)/hooks/use-badge-analytics";
import { notificationsRootKey } from "@/app/(dashboard)/hooks/use-notifications";

export const useIncrementBadgeCreation = () => {
	const queryClient = useQueryClient();

	const { mutate: incrementCreation, isPending: isLoading } = useMutation({
		mutationFn: incrementBadgeCreation,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: badgeAnalyticsKey,
			});
			queryClient.invalidateQueries({
				queryKey: notificationsRootKey,
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
