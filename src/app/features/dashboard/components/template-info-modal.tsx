"use client";

import { ReactNode } from "react";
import { OrganizerTemplateInstance } from "../../dashboardLayout/types";
import { formatDate, formatLastEditedDate } from "../utilities";
import {
	buildParticipantShareUrl,
	formatShareUrlForDisplay,
} from "@/app/features/badges/lib/badge-share-url";
import StatusPill from "@/app/(dashboard)/components/dashboard/status-pill";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { Lock } from "lucide-react";





export function TemplateInfoModal({
	template,
	thumbnailUrl,
	onClose,
	onRequestDelete,
	onRequestUnpublish,
}: {
	template: OrganizerTemplateInstance;
	thumbnailUrl?: string | null;
	onClose: () => void;
	onRequestDelete: (template: OrganizerTemplateInstance) => void;
	onRequestUnpublish: (template: OrganizerTemplateInstance) => void;
}) {
	const fullUrl = template.share_slug
		? buildParticipantShareUrl(template.share_slug)
		: null;
	const displayUrl = fullUrl
		? formatShareUrlForDisplay(fullUrl)
		: "Not yet published";
	const isLive = template.is_published || template.status === "live";
	const statusDescription = fullUrl
		? "The badge is live and sharable. Participants can claim this badge and share it on social media."
		: "This badge is not yet published. Publish it to create a shareable link for participants.";

	return (
		<Dialog
			open={true}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DialogContent
				className="
					flex flex-col gap-5
					max-h-[calc(100vh-4rem)] max-w-[calc(100%-3rem)] overflow-y-auto rounded-[18px] p-5
					sm:max-w-[min(860px,calc(100%-4rem))] sm:p-6
					md:grid md:grid-cols-[280px_1fr] md:gap-7
				"
				showCloseButton
			>
				<DialogTitle className="sr-only">
					{template.title} badge information
				</DialogTitle>

				{/* Preview image — shrink-0 prevents flex from collapsing it */}
				<div className="relative mx-auto aspect-[4/5] w-full max-w-[240px] shrink-0 overflow-hidden rounded-[14px] sm:max-w-[280px] md:mx-0 md:max-w-none">
					<Image
						src={thumbnailUrl ?? "/assets/dashboard/badge-preview.png"}
						alt={template.title}
						fill
						className="object-cover"
					/>
				</div>

				{/* Content — mt-12 removed; gap-5 on the parent handles spacing */}
				<div className="min-w-0">
					<div className="flex items-center gap-5">
						<h2 className="min-w-0 text-[24px] font-bold leading-[1.08] text-[#1A1A1A] sm:text-[26px]">
							{template.title}
						</h2>

						<StatusPill status={template.status} />
					</div>
					<p className="mt-4 border-b border-[#E8E8E8] pb-4 text-[13px] leading-[1.6] text-[#757575]">
						{statusDescription}
					</p>

					<div className="space-y-3 border-b border-[#E8E8E8] py-4 text-[13px]">
						<InfoRow
							icon={
								<Image
									src="/assets/dashboard/_ui-calendar-date.svg"
									height={20}
									width={20}
									alt="calendar icon"
								/>
							}
							label="Created"
							value={formatDate(template.created_at)}
						/>
						<InfoRow
							icon={
								<Image
									src="/assets/dashboard/_ui-clock.svg"
									height={20}
									width={20}
									alt="clock icon"
								/>
							}
							label="Last used"
							value={formatLastEditedDate(template.updated_at, template.status)}
						/>
						<InfoRow
							icon={
								<Image
									src="/assets/dashboard/icons/share.svg"
									height={20}
									width={20}
									alt="share icon"
								/>
							}
							label="Total shares"
							value={(template.total_shares ?? 0).toLocaleString()}
						/>
						{template.access_code && (
							<InfoRow
								icon={<Lock size={18} />}
								label="Access code"
								value={template.access_code}
							/>
						)}
					</div>

					<div className="pt-4">
						<p className="mb-2 text-[12px] font-semibold text-[#6B6B6B]">
							Shareable link
						</p>

						<Button
							type="button"
							variant="outline"
							disabled={!fullUrl}
							onClick={async () => {
								if (!fullUrl) return;
								await navigator.clipboard.writeText(fullUrl);
								toast.success("Link copied to clipboard");
							}}
							className="flex h-auto w-full justify-start gap-2 rounded-lg border border-[#E8E8E8] px-3 py-2 text-left text-[12px] text-[#121217]"
						>
							<Image
								src="/assets/dashboard/_ui-copy-02.svg"
								height={20}
								width={20}
								alt="copy icon"
							/>
							<p className="min-w-0 truncate">{displayUrl}</p>
						</Button>
					</div>

					<div className="mt-5 flex flex-wrap gap-3">
						<Button
							variant="outline"
							onClick={() => onRequestDelete(template)}
							className="h-auto rounded-full border border-[#F6B6C8] px-5 py-2.5 text-[13px] font-semibold text-[#F43F72] hover:border-[#EF4444] hover:bg-[#EF4444] hover:text-white"
						>
							Delete badge
						</Button>

						{isLive && (
							<Button
								variant="outline"
								onClick={() => {
									onRequestUnpublish(template);
									onClose();
								}}
								className="h-auto rounded-full border border-gray-200 px-5 py-2.5 text-[13px] font-semibold text-gray-600 hover:bg-gray-50"
							>
								Unpublish
							</Button>
						)}

						<Button
							asChild
							className="h-auto flex-1 rounded-full bg-[#242424] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#242424]/90"
						>
							<Link
								href={`/create-badges/customize?id=${encodeURIComponent(template.id)}`}
							>
								Edit badge
							</Link>
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function InfoRow({
	icon,
	label,
	value,
}: {
	icon: ReactNode;
	label: string;
	value: string | number;
}) {
	return (
		<div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
			<div className="flex items-center gap-[10px] min-w-0">
				<span className="shrink-0 text-[#B0B0B0]">{icon}</span>
				<p className="truncate text-[13px] text-[#8B8B8B]">{label}</p>
			</div>
			<p className="text-right text-[14px] font-medium text-[#333]">{value}</p>
		</div>
	);
}
