"use client";
import { useState, useMemo, useCallback } from "react";
import { OrganizerTemplateInstance } from "../../types/dashboard/organizer-template-instances";
import { useRecentOrganizerBadges } from "../../hooks/use-organizer-template-instances";
import { usePlatformTemplates } from "../../hooks/use-platform-templates";
import { useDeleteOrganizerTemplate } from "../../hooks/use-delete-template";
import { useUnpublishTemplate } from "../../hooks/use-unpublish-template";
import { RecentBadgesHeader } from "./recent-badges-header";
import { RecentBadgesMobileList } from "./recent-badges-mobile-list";
import { RecentBadgesTable } from "./recent-badges-table";
import { RECENT_BADGES_LIMIT, TemplateFilter } from "./recent-badges-types";
import { TemplateInfoModal } from "./template-info-modal";
import { DeleteBadgeModal } from "./delete-badge-modal";
import { AnimatePresence, motion } from "motion/react";

export default function RecentBadges() {
	// GET RECENT ORGANIZERS BADGES WITH HOOK
	const deleteMutation = useDeleteOrganizerTemplate();
	const unpublishMutation = useUnpublishTemplate();
	const [page, setPage] = useState(1);

	const {
		templates,
		total,
		isLoading: loading,
		isError,
	} = useRecentOrganizerBadges(page, RECENT_BADGES_LIMIT);
	const totalPages = Math.ceil(total / RECENT_BADGES_LIMIT);

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

	const [direction, setDirection] = useState(1);

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 30 : -30,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction > 0 ? -30 : 30,
			opacity: 0,
		}),
	};

	function handleNextPage() {
		setDirection(1);
		setPage((p) => Math.min(p + 1, totalPages));
	}

	function handlePreviousPage() {
		setDirection(-1);
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
				onFilterChange={setActiveFilter}
			/>

			<RecentBadgesMobileList
				templates={filtered}
				onSelectTemplate={setSelectedTemplate}
				onRequestDelete={setTemplateToDelete}
				onRequestUnpublish={(template) => unpublishMutation.mutate(template.id)}
			/>

			<AnimatePresence mode="wait" custom={direction}>
				<motion.div
					key={page}
					custom={direction}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{ duration: 0.35 }}
				>
					<RecentBadgesTable
						templates={filtered}
						getTemplateThumbnail={getTemplateThumbnail}
						loading={loading}
						isError={isError}
						onSelectTemplate={setSelectedTemplate}
						onRequestDelete={setTemplateToDelete}
						onRequestUnpublish={(template) => unpublishMutation.mutate(template.id)}
					/>
				</motion.div>
			</AnimatePresence>

			{/* Previous and next buttons with page indicator */}
			<div className="flex justify-end gap-2 border-t border-[#F0F0EE] p-4">
				<button
					onClick={handlePreviousPage}
					disabled={page === 1}
					className="rounded-md border px-4 py-2 disabled:opacity-50"
				>
					Previous
				</button>

				<span className="flex items-center text-sm">
					Page {page} of {totalPages}
				</span>

				<button
					onClick={handleNextPage}
					disabled={page === totalPages}
					className="rounded-md border px-4 py-2 disabled:opacity-50"
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
					onRequestUnpublish={(template) => unpublishMutation.mutate(template.id)}
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
