"use client";
import { useState, useMemo, useCallback } from "react";
import { OrganizerTemplateInstance } from "../../types/dashboard/organizer-template-instances";
import { useAllOrganizerBadges } from "../../hooks/use-organizer-template-instances";
import { usePlatformTemplates } from "../../hooks/use-platform-templates";
import { useDeleteOrganizerTemplate } from "../../hooks/use-delete-template";
import { useUnpublishTemplate } from "../../hooks/use-unpublish-template";
import { RecentBadgesHeader } from "./recent-badges-header";
import { RecentBadgesMobileList } from "./recent-badges-mobile-list";
import { RecentBadgesTable } from "./recent-badges-table";
import { RECENT_BADGES_LIMIT, TemplateFilter } from "./recent-badges-types";
import { TemplateInfoModal } from "./template-info-modal";
import { DeleteBadgeModal } from "./delete-badge-modal";

export default function RecentBadges() {
	// GET RECENT ORGANIZERS BADGES WITH HOOK
	const deleteMutation = useDeleteOrganizerTemplate();
	const unpublishMutation = useUnpublishTemplate();
	const [page, setPage] = useState(1);

	const { templates, isLoading, isError } = useAllOrganizerBadges();

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

	const totalPages = Math.max(
		1,
		Math.ceil(filtered.length / RECENT_BADGES_LIMIT),
	);
	const clampedPage = Math.min(page, totalPages);
	const pagedTemplates = filtered.slice(
		(clampedPage - 1) * RECENT_BADGES_LIMIT,
		clampedPage * RECENT_BADGES_LIMIT,
	);

	function handleFilterChange(filter: TemplateFilter) {
		setActiveFilter(filter);
		setPage(1);
	}

	const platformTemplatesById = useMemo(
		() => new Map(platformTemplates.map((template) => [template.id, template])),
		[platformTemplates],
	);

	const getTemplateThumbnail = useCallback(
		(template: OrganizerTemplateInstance) => {
			return (
				platformTemplatesById.get(template.platform_template_id)
					?.thumbnail_url ?? undefined
			);
		},
		[platformTemplatesById],
	);

	function handleNextPage() {
		setPage((p) => Math.min(p + 1, totalPages));
	}

	function handlePreviousPage() {
		setPage((p) => Math.max(p - 1, 1));
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
				onFilterChange={handleFilterChange}
			/>

			<RecentBadgesMobileList
				templates={pagedTemplates}
				loading={isLoading}
				getTemplateThumbnail={getTemplateThumbnail}
				onSelectTemplate={setSelectedTemplate}
				onRequestDelete={setTemplateToDelete}
				onRequestUnpublish={(template) => unpublishMutation.mutate(template.id)}
			/>
			<RecentBadgesTable
				templates={pagedTemplates}
				loading={isLoading}
				getTemplateThumbnail={getTemplateThumbnail}
				isError={isError}
				onSelectTemplate={setSelectedTemplate}
				onRequestDelete={setTemplateToDelete}
				onRequestUnpublish={(template) => unpublishMutation.mutate(template.id)}
			/>

			{/* Previous and next buttons with page indicator */}
			<div className="flex items-center justify-center gap-3 border-t border-[#F0F0EE] p-4 sm:justify-end">
				<button
					onClick={handlePreviousPage}
					disabled={clampedPage === 1}
					className="min-w-[80px] rounded-md border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-[#FAFAF8] disabled:cursor-not-allowed disabled:opacity-40"
				>
					Previous
				</button>

				<span className="shrink-0 text-[13px] text-[#595959]">
					Page {clampedPage} of {totalPages}
				</span>

				<button
					onClick={handleNextPage}
					disabled={clampedPage === totalPages}
					className="min-w-[80px] rounded-md border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-[#FAFAF8] disabled:cursor-not-allowed disabled:opacity-40"
				>
					Next
				</button>
			</div>

			{selectedTemplate && (
				<TemplateInfoModal
					template={selectedTemplate}
					thumbnailUrl={getTemplateThumbnail(selectedTemplate)}
					onClose={() => setSelectedTemplate(null)}
					onRequestDelete={(template) => {
						setSelectedTemplate(null);
						setTemplateToDelete(template);
					}}
					onRequestUnpublish={(template) =>
						unpublishMutation.mutate(template.id)
					}
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
