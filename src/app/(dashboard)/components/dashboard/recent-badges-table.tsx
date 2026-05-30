import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { MoreMenu } from "./more-menu";
import { RecentBadgesListProps } from "./recent-badges-types";
import { formatDate } from "./recent-badges-utils";
import { StatusPill } from "./status-pill";
import Image from "next/image";
import { cn } from "@/lib/utils";

const TABLE_COLUMNS = [
	{ label: "BADGE", className: "w-[36%]" },
	{ label: "STATUS" },
	{ label: "LAST EDITED" },
	{ label: "", className: "w-[40px]" },
];

export function RecentBadgesTable({
	templates,
	loading,
	isError,
	getTemplateThumbnail,
	onSelectTemplate,
	onRequestDelete,
}: RecentBadgesListProps) {
	const hasTemplates = templates.length > 0;

	return (
		<div className="hidden md:block">
			<Table className="border-collapse text-[13px]">
				<TableHeader>
					<TableRow className="bg-[#FBF9F6]">
						{TABLE_COLUMNS.map((col) => (
							<TableHead
								key={col.label}
								scope="col"
								className={cn(
									"whitespace-nowrap border-b border-t border-[#F0F0EE] px-4 py-[10px] text-left text-[12px] font-semibold tracking-[0.05em] text-[#595959]",
									col.className,
								)}
							>
								{col.label}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>
					{loading && !hasTemplates ? (
						<RecentBadgesTableMessage>
							Loading recent badges...
						</RecentBadgesTableMessage>
					) : isError && !hasTemplates ? (
						<RecentBadgesTableMessage className="text-red-500">
							Could not load recent badges.
						</RecentBadgesTableMessage>
					) : !hasTemplates ? (
						<RecentBadgesTableMessage>
							No badges match this filter.
						</RecentBadgesTableMessage>
					) : (
						templates.map((template) => {
							const thumbnailUrl = getTemplateThumbnail?.(template);

							return (
								<TableRow
									key={template.id}
									onClick={() => onSelectTemplate(template)}
									className="cursor-pointer border-b border-[#F0F0EE] transition-colors hover:bg-[#FAFAF8]"
								>
									<TableCell className="px-[16px] py-[14px] whitespace-normal">
										<div className="flex items-center gap-[12px]">
											<div className="rounded-[10px] overflow-hidden">
												{thumbnailUrl && (
													<Image
														src={thumbnailUrl}
														height={44}
														width={44}
														alt="badge thumbnail"
													/>
												)}
											</div>
											<div>
												<div className="font-semibold text-[14px] leading-[1.3] text-gray-900">
													{template.title}
												</div>
												<div className="mt-[2px] text-[12px] text-gray-600">
													Template instance &middot;{" "}
													<span
														className={
															template.share_slug
																? "text-gray-600"
																: "text-gray-500"
														}
													>
														{template.share_slug ?? "Not yet published"}
													</span>
												</div>
											</div>
										</div>
									</TableCell>

									<TableCell className="px-[16px] py-[14px]">
										<StatusPill status={template.status} />
									</TableCell>

									<TableCell className="whitespace-nowrap px-[16px] py-[14px] text-[13px] text-gray-500">
										{formatDate(template.updated_at)}
									</TableCell>

									<TableCell
										onClick={(event) => event.stopPropagation()}
										className="py-[14px] pl-0 pr-[12px] text-right"
									>
										<MoreMenu
											onViewInfo={() => onSelectTemplate(template)}
											onDelete={() => onRequestDelete(template)}
											editHref={`/create-badges/customize?id=${encodeURIComponent(template.id)}`}
										/>
									</TableCell>
								</TableRow>
							);
						})
					)}
				</TableBody>
			</Table>
		</div>
	);
}

function RecentBadgesTableMessage({
	children,
	className = "text-gray-400",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<TableRow className="hover:bg-transparent">
			<TableCell
				colSpan={TABLE_COLUMNS.length}
				className={`px-[16px] py-[40px] text-center text-[14px] ${className}`}
			>
				{children}
			</TableCell>
		</TableRow>
	);
}
