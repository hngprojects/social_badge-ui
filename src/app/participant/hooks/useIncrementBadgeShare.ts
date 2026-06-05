import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { incrementBadgeShare } from "../services/badge";
import { badgeAnalyticsKey } from "@/app/(dashboard)/hooks/use-badge-analytics";

export const useIncrementBadgeShare = () => {
	const queryClient = useQueryClient();

	const { mutate: incrementShare, isPending: isLoading } = useMutation({
		mutationFn: incrementBadgeShare,

		onSuccess: () => {
			// refresh analytics so total_shares updates
			queryClient.invalidateQueries({
				queryKey: badgeAnalyticsKey,
			});
		},

		onError: () => {
			toast.error("Failed to update share count. Please try again.");
		},
	});

	return {
		incrementShare,
		isLoading,
	};
};
