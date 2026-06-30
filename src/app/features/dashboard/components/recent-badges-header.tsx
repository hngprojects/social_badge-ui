// import { FILTERS, TemplateFilter } from "./recent-badges-types";

// import { FILTERS } from "../constants";
import { FILTERS } from "../constants";
import { TemplateFilter } from "../types";

export function RecentBadgesHeader({
	activeFilter,
	onFilterChange,
}: {
	activeFilter: TemplateFilter;
	onFilterChange: (filter: TemplateFilter) => void;
}) {
	return (
		<div className="flex flex-col gap-3 p-4 sm:p-[20px_24px_16px]">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				{/* Title block */}
				<div className="min-w-0">
					<h2 className="m-0 text-[17px] font-bold leading-[1.4] text-[#1A1A1A]">
						Recent badges
					</h2>
					<p className="mt-0.5 text-[12.5px] leading-[1.5] text-[#595959]">
						Your latest events and their performance.
					</p>
				</div>

				{/* Filter pills — scrollable on xs so they never wrap or clip */}
				<div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
					<div className="flex w-max gap-2 rounded-[10px] border border-gray-200 bg-[#FBF9F6] p-1 sm:w-auto">
						{FILTERS.map((filter) => (
							<button
								key={filter}
								type="button"
								onClick={() => onFilterChange(filter)}
								className={`cursor-pointer whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-semibold transition-colors hover:bg-white/90 ${
									activeFilter === filter
										? "bg-white text-[#3A3A3A] shadow-[inset_0_0_0_1px_#E5E7EB]"
										: "bg-transparent text-[#595959]"
								}`}
							>
								{filter}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
