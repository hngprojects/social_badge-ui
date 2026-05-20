"use client";

import { useState } from "react";
import { Filter, Status } from "../types/dashboard";
import Image from "next/image";
import { BADGES, FILTERS, STATUS_STYLES } from "../constants/dashboard";

// ── Helper ─────────────────────────────────────────────────────────────────
function fmt(n: number): string {
	return n.toLocaleString("en-US");
}

// ── Sub-components ─────────────────────────────────────────────────────────
function StatusPill({ status }: { status: Status }) {
	const s = STATUS_STYLES[status];
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: 6,
				padding: "3px 10px",
				borderRadius: 20,
				fontSize: 12,
				fontWeight: 500,
				background: s.bg,
				color: s.text,
				border: s.border ?? "none",
				whiteSpace: "nowrap",
			}}
		>
			<span
				style={{
					width: 6,
					height: 6,
					borderRadius: "50%",
					background: s.dot,
					flexShrink: 0,
				}}
			/>
			{status}
		</span>
	);
}

function MoreMenu() {
	return (
		<button
			aria-label="More options"
			style={{
				background: "none",
				border: "none",
				cursor: "pointer",
				padding: "4px 6px",
				borderRadius: 6,
				color: "#9CA3AF",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
			onMouseEnter={(e) => {
				(e.currentTarget as HTMLButtonElement).style.background = "#F3F4F6";
				(e.currentTarget as HTMLButtonElement).style.color = "#374151";
			}}
			onMouseLeave={(e) => {
				(e.currentTarget as HTMLButtonElement).style.background = "none";
				(e.currentTarget as HTMLButtonElement).style.color = "#9CA3AF";
			}}
		>
			{/* Vertical ellipsis */}
			<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
				<circle cx="8" cy="3" r="1.25" />
				<circle cx="8" cy="8" r="1.25" />
				<circle cx="8" cy="13" r="1.25" />
			</svg>
		</button>
	);
}

// ── Main component ─────────────────────────────────────────────────────────
export default function RecentBadges() {
	const [activeFilter, setActiveFilter] = useState<Filter>("All");

	const filtered =
		activeFilter === "All"
			? BADGES
			: BADGES.filter((badge) => badge.status === activeFilter);

	return (
		<div className="rounded-2xl border border-[#F0F0EE] overflow-hidden w-full">
			{/* ── Header ── */}
			<div className="flex items-start justify-between p-[20px_24px_16px] flex-wrap gap-3">
				<div>
					<h2 className="text-[17px] font-sans font-bold text-[#1A1A1A] m-0 leading-[1.4]">
						Recent badges
					</h2>
					<p className="font-sans text-[12.5px] text-[#9CA3AF] mt-0.5">
						Your latest events and their performance.
					</p>
				</div>

				{/* Filter tabs + View all */}
				<div className="flex items-center gap-[10px]">
					<div className="flex border bg-[#f4f2f0] border-gray-200 rounded-[10px] overflow-hidden p-1">
						{FILTERS.map((f) => (
							<button
								key={f}
								onClick={() => setActiveFilter(f)}
								className={`text-[14px] font-sans border-none rounded-sm cursor-pointer transition-colors duration-150 ${
									activeFilter === f
										? "font-semibold bg-white text-[#3A3A3A] shadow-[inset_0_0_0_1px_#E5E7EB]"
										: "font-normal bg-transparent text-[#757575]"
								} ${
									f !== "Archived" ? "border-r border-gray-200" : ""
								} px-[14px] py-[6px]`}
							>
								{f}
							</button>
						))}
					</div>

					<button className="text-[13px] font-sans font-medium text-[#FF693E] bg-transparent border-none cursor-pointer whitespace-nowrap px-[2px] py-[6px]">
						View all &rsaquo;
					</button>
				</div>
			</div>

			{/* ── Table ── */}
			<div className="overflow-x-auto">
				<table className="w-full border-collapse text-[13px]">
					<thead>
						<tr className="bg-[#ECE9E4]">
							{[
								"BADGE",
								"STATUS",
								"LAST EDITED",
								"LINK CLICKS",
								"SHARES",
								"",
							].map((col, i) => (
								<th
									key={i}
									className={`text-[11px] font-semibold tracking-[0.05em] text-gray-400 text-left py-[10px] px-[16px] border-t border-b border-[#F0F0EE] whitespace-nowrap ${
										i === 0 ? "w-[36%]" : i === 5 ? "w-[40px]" : ""
									}`}
								>
									{col}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{filtered.length === 0 ? (
							<tr>
								<td
									colSpan={6}
									className="text-center py-[40px] px-[16px] text-gray-400 text-[14px]"
								>
									No badges match this filter.
								</td>
							</tr>
						) : (
							filtered.map((badge) => {
								const hasMetrics =
									badge.clicks !== null && badge.shares !== null;

								return (
									<tr
										key={badge.id}
										className="border-b border-[#F0F0EE] transition-colors hover:bg-[#FAFAF8]"
										onMouseEnter={(e) => {
											(
												e.currentTarget as HTMLTableRowElement
											).style.background = "#FAFAF8";
										}}
										onMouseLeave={(e) => {
											(
												e.currentTarget as HTMLTableRowElement
											).style.background = "transparent";
										}}
									>
										{/* Badge cell */}
										<td className="py-[14px] px-[16px]">
											<div className="flex items-center gap-3">
												{/* Icon */}
												<div className="w-[38px] h-[38px] rounded-[9px] overflow-hidden flex-shrink-0 relative">
													<Image
														src={badge.iconImg}
														alt={badge.name}
														fill
														className="object-cover"
													/>
												</div>

												<div>
													<div className="font-semibold text-[14px] text-gray-900 leading-[1.3]">
														{badge.name}
													</div>
													<div className="text-[12px] text-gray-400 mt-[2px]">
														{badge.type}
														{" · "}
														<span
															className={
																badge.url === "Not yet published"
																	? "text-gray-300"
																	: "text-gray-400"
															}
														>
															{badge.url}
														</span>
													</div>
												</div>
											</div>
										</td>

										{/* Status */}
										<td className="py-[14px] px-[16px]">
											<StatusPill status={badge.status} />
										</td>

										{/* Last edited */}
										<td className="py-[14px] px-[16px] text-gray-500 text-[13px] whitespace-nowrap">
											{badge.lastEdited}
										</td>

										{/* Link clicks */}
										<td className="py-[14px] px-[16px]">
											{!hasMetrics ? (
												<div>
													<div className="text-[15px] text-gray-700 leading-none">
														—
													</div>
													<div className="text-[11px] text-gray-300 mt-[3px]">
														Unpublished
													</div>
												</div>
											) : (
												<span className="text-[14px] font-medium text-gray-900">
													{fmt(badge.clicks!)}
												</span>
											)}
										</td>

										{/* Shares */}
										<td className="py-[14px] px-[16px]">
											{!hasMetrics ? (
												<div>
													<div className="text-[15px] text-gray-700 leading-none">
														—
													</div>
													<div className="text-[11px] text-gray-300 mt-[3px]">
														Unpublished
													</div>
												</div>
											) : (
												<span className="text-[14px] font-medium text-gray-900">
													{fmt(badge.shares!)}
												</span>
											)}
										</td>

										{/* Actions */}
										<td className="py-[14px] pl-0 pr-[12px] text-right">
											<MoreMenu />
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
