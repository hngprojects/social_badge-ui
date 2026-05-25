"use client";
import { useState } from "react";
import { OrganizerTemplateInstance } from "../../types/dashboard/organizer-template-instances";
import { useRecentOrganizerBadges } from "../../hooks/use-organizer-template-instances";
import { useDeleteOrganizerTemplate } from "../../hooks/use-delete-template";
import { usePlatformTemplates } from "../../hooks/use-platform-templates";
import { DeleteBadgeModal } from "./delete-badge-modal";
import { RecentBadgesHeader } from "./recent-badges-header";
import { RecentBadgesMobileList } from "./recent-badges-mobile-list";
import { RecentBadgesTable } from "./recent-badges-table";
import { RECENT_BADGES_LIMIT, TemplateFilter } from "./recent-badges-types";
import { TemplateInfoModal } from "./template-info-modal";

export default function RecentBadges() {
  const deleteMutation = useDeleteOrganizerTemplate();

  // GET RECENT ORGANIZERS BADGES WITH HOOK
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
    return (
      platformTemplatesById.get(template.platform_template_id)?.thumbnail_url ??
      undefined
    );
  }

  function handleDeleteTemplate() {
    if (!templateToDelete) return;
    deleteMutation.mutate(templateToDelete.id, {
      onSuccess: () => setTemplateToDelete(null),
    });
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
        getTemplateThumbnail={getTemplateThumbnail}
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
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}
