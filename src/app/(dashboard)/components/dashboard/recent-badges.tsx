"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { OrganizerTemplateInstance } from "../../types/dashboard/organizer-template-instances";
import { deleteOrganizerTemplate } from "../../services/delete-template";
import {
  organizerTemplateInstancesKey,
  useRecentOrganizerBadges,
} from "../../hooks/use-organizer-template-instances";
import { usePlatformTemplates } from "../../hooks/use-platform-templates";
import { OrganizerTemplateInstancesResult } from "../../services/get-template-instances";
import { DeleteBadgeModal } from "./delete-badge-modal";
import { RecentBadgesHeader } from "./recent-badges-header";
import { RecentBadgesMobileList } from "./recent-badges-mobile-list";
import { RecentBadgesTable } from "./recent-badges-table";
import {
  RECENT_BADGES_LIMIT,
  TemplateFilter,
} from "./recent-badges-types";
import { TemplateInfoModal } from "./template-info-modal";

export default function RecentBadges() {
  const queryClient = useQueryClient();
  const {
    templates,
    isLoading: loading,
    isError,
  } = useRecentOrganizerBadges(RECENT_BADGES_LIMIT);
  const { templates: platformTemplates } = usePlatformTemplates();
  const [activeFilter, setActiveFilter] = useState<TemplateFilter>("All");
  const [selectedTemplate, setSelectedTemplate] =
    useState<OrganizerTemplateInstance | null>(null);
  const [templateToDelete, setTemplateToDelete] =
    useState<OrganizerTemplateInstance | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered =
    activeFilter === "All"
      ? templates
      : templates.filter(
          (template) => template.status === activeFilter.toLowerCase(),
        );
  const platformTemplatesById = new Map(
    platformTemplates.map((template) => [template.id, template]),
  );

  function getTemplateThumbnail(template: OrganizerTemplateInstance) {
    return platformTemplatesById.get(template.platform_template_id)?.thumbnail_url;
  }

  async function handleDeleteTemplate() {
    if (!templateToDelete) return;

    try {
      setIsDeleting(true);
      await deleteOrganizerTemplate(templateToDelete.id);

      queryClient.setQueryData<OrganizerTemplateInstancesResult>(
        organizerTemplateInstancesKey(1, RECENT_BADGES_LIMIT),
        (prev) =>
          prev
            ? {
                ...prev,
                total: Math.max(0, prev.total - 1),
                templates: prev.templates.filter(
                  (template) => template.id !== templateToDelete.id,
                ),
              }
            : prev,
      );
      setTemplateToDelete(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="w-full overflow-hidden overflow-y-visible rounded-2xl border border-[#F0F0EE]">
      <RecentBadgesHeader
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <RecentBadgesMobileList
        templates={filtered}
        onSelectTemplate={setSelectedTemplate}
        onRequestDelete={setTemplateToDelete}
      />

      <RecentBadgesTable
        templates={filtered}
        loading={loading}
        isError={isError}
        onSelectTemplate={setSelectedTemplate}
        onRequestDelete={setTemplateToDelete}
      />

      {selectedTemplate && (
        <TemplateInfoModal
          template={selectedTemplate}
          thumbnailUrl={getTemplateThumbnail(selectedTemplate)}
          onClose={() => setSelectedTemplate(null)}
          onRequestDelete={(template) => {
            setSelectedTemplate(null);
            setTemplateToDelete(template);
          }}
        />
      )}

      {templateToDelete && (
        <DeleteBadgeModal
          title={templateToDelete.title}
          onClose={() => setTemplateToDelete(null)}
          onDelete={handleDeleteTemplate}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
