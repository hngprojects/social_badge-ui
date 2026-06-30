import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { incrementBadgeCreation } from "../services/badge";
import { badgeAnalyticsKey } from "@/app/features/dashboard/hooks/use-badge-analytics";
import {
	notificationsRootKey,
	unreadNotificationCountKey,
} from "@/app/features/dashboard/hooks/use-notifications";

export const useIncrementBadgeCreation = () => {
	const queryClient = useQueryClient();

	const refreshNotificationQueries = () => {
		queryClient.invalidateQueries({
			queryKey: notificationsRootKey,
		});
		queryClient.refetchQueries({
			queryKey: notificationsRootKey,
			type: "active",
		});
		queryClient.refetchQueries({
			queryKey: unreadNotificationCountKey,
		});
	};

	const {
		mutate: incrementCreation,
		mutateAsync: incrementCreationAsync,
		isPending: isLoading,
	} = useMutation({
		mutationFn: incrementBadgeCreation,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: badgeAnalyticsKey,
			});
			refreshNotificationQueries();
			setTimeout(refreshNotificationQueries, 1500);
		},

		onError: () => {
			toast.error("Failed to update creation count. Please try again.");
		},
	});

	return {
		incrementCreation,
		incrementCreationAsync,
		isLoading,
	};
};
