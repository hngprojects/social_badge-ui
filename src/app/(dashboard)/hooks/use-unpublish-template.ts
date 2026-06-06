"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { unpublishOrganiserTemplate } from "@/app/features/templates/services/templates";
import { badgeAnalyticsKey } from "./use-badge-analytics";
import { organizerTemplateInstancesRootKey } from "./use-organizer-template-instances";

export function useUnpublishTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unpublishOrganiserTemplate,
    onSuccess: () => {
      // Refresh list to show 'Draft' status
      queryClient.invalidateQueries({
        queryKey: organizerTemplateInstancesRootKey,
      });
      // Refresh analytics to update active count
      queryClient.invalidateQueries({
        queryKey: badgeAnalyticsKey,
      });
      toast.success("Badge unpublished successfully");
    },
    onError: () => {
      toast.error("Failed to unpublish badge. Please try again.");
    },
  });
}
