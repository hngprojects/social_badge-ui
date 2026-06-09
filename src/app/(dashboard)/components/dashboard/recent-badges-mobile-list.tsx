import Image from "next/image";
import { MoreMenu } from "./more-menu";
import { RecentBadgesListProps } from "./recent-badges-types";
import { formatLastEditedDate } from "./recent-badges-utils";
import { StatusPill } from "./status-pill";

export function RecentBadgesMobileList({
	templates,
	loading,
	getTemplateThumbnail,
	onSelectTemplate,
	onRequestDelete,
	onRequestUnpublish,
}: RecentBadgesListProps) {
	return (
		<div className="md:hidden">
			{/* Header */}
			<div className="grid grid-cols-[1fr_auto_32px] sm:grid-cols-[2fr_0.8fr_0.9fr_0.5fr_32px] items-center border-b border-t border-[#F0F0EE] bg-[#ECE9E4] px-3 py-3">
				<p className="text-[11px] font-semibold tracking-[0.12em] text-[#757575]">
					BADGE
				</p>
				<p className="text-[11px] font-semibold tracking-[0.12em] text-[#757575]">
					STATUS
				</p>
				<p className="hidden sm:block text-[11px] font-semibold tracking-[0.12em] text-[#757575]">
					LAST EDITED
				</p>
				<p className="hidden sm:block text-[11px] font-semibold tracking-[0.12em] text-[#757575]">
					SHARES
				</p>
				<span />
			</div>

			{loading ? (
				<div className="flex justify-center gap-2 py-10">
					<span className="h-3 w-3 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.3s]" />
					<span className="h-3 w-3 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.15s]" />
					<span className="h-3 w-3 animate-bounce rounded-full bg-primary-500" />
				</div>
			) : (
				templates.map((template) => {
					const canUnpublish =
						template.is_published || template.status === "live";

					return (
						<div
							key={template.id}
							role="button"
							tabIndex={0}
							onClick={() => onSelectTemplate(template)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									onSelectTemplate(template);
								}
							}}
							className="grid grid-cols-[1fr_auto_32px] sm:grid-cols-[2fr_0.8fr_0.9fr_0.5fr_32px] items-center border-b border-[#F0F0EE] px-3 py-4"
						>
							{/* Badge — always visible */}
							<div className="flex min-w-0 items-center gap-2">
								{getTemplateThumbnail?.(template) && (
									<div className="shrink-0 overflow-hidden rounded-[8px]">
										<Image
											src={getTemplateThumbnail(template)!}
											height={36}
											width={36}
											alt="badge thumbnail"
										/>
									</div>
								)}
								<div className="min-w-0">
									<h3 className="truncate text-[13px] font-semibold leading-tight text-[#3A3A3A]">
										{template.title}
									</h3>
									{/* On xs: show status inline under title since the Status column is hidden */}
									<p className="mt-0.5 truncate text-[11px] text-[#B0B0B0] sm:hidden">
										{formatLastEditedDate(template.updated_at, template.status)}
										{template.total_shares != null && (
											<> &middot; {template.total_shares} shares</>
										)}
									</p>
									<p className="mt-0.5 truncate text-[11px] text-[#B0B0B0] hidden sm:block">
										Template instance
									</p>
								</div>
							</div>

							{/* Status — always visible */}
							<div>
								<StatusPill status={template.status} />
							</div>

							{/* Last Edited — sm+ only */}
							<p className="hidden sm:block text-[13px] text-[#B0B0B0]">
								{formatLastEditedDate(template.updated_at, template.status)}
							</p>

							{/* Shares — sm+ only */}
							<p className="hidden sm:block text-[13px] text-[#B0B0B0]">
								{template.total_shares ?? 0}
							</p>

							{/* More menu — always visible */}
							<div onClick={(event) => event.stopPropagation()}>
								<MoreMenu
									onViewInfo={() => onSelectTemplate(template)}
									onUnpublish={
										canUnpublish
											? () => onRequestUnpublish(template)
											: undefined
									}
									onDelete={() => onRequestDelete(template)}
								/>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
}
