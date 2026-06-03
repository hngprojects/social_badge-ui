import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrganizerTemplate } from "../services/delete-template";
import { OrganizerTemplateInstancesResult } from "../services/get-template-instances";
import {
  organizerTemplateInstancesKey,
  organizerTemplateInstancesRootKey,
} from "./use-organizer-template-instances";
import { badgeAnalyticsKey } from "./use-badge-analytics";
import { RECENT_BADGES_LIMIT } from "../components/dashboard/recent-badges-types";
import { toast } from "sonner";

export function useDeleteOrganizerTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrganizerTemplate,

    onSuccess: (_, deletedTemplateId) => {
      queryClient.setQueryData<OrganizerTemplateInstancesResult>(
        organizerTemplateInstancesKey(1, RECENT_BADGES_LIMIT),
        (prev) =>
          prev
            ? {
                ...prev,
                total: Math.max(0, prev.total - 1),

                templates: prev.templates.filter(
                  (template) => template.id !== deletedTemplateId,
                ),
              }
            : prev,
      );
      queryClient.invalidateQueries({
        queryKey: organizerTemplateInstancesRootKey,
      });
      queryClient.invalidateQueries({
        queryKey: badgeAnalyticsKey,
      });
      toast.success("Badge deleted successfully");
    },

    onError: () => {
      toast.error("Failed to delete badge");
    },
  });
}
