import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { incrementBadgeShare } from "../services/badge";
import { badgeAnalyticsKey } from "@/app/(dashboard)/hooks/use-badge-analytics";
import { organizerTemplateInstancesRootKey } from "@/app/(dashboard)/hooks/use-organizer-template-instances";

export const useIncrementBadgeShare = () => {
	const queryClient = useQueryClient();

	const { mutate: incrementShare, isPending: isLoading } = useMutation({
		mutationFn: incrementBadgeShare,

		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: badgeAnalyticsKey,
				type: "active",
			});
			queryClient.refetchQueries({
				queryKey: organizerTemplateInstancesRootKey,
				type: "active",
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
