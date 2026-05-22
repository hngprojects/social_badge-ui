import { SearchX } from "lucide-react";
import { templates } from "../../constants/explore";
import TemplateCard from "./template-card";

type Props = {
	activeFilter: string;
};

const TemplateGrid = ({ activeFilter }: Props) => {
	const filteredTemplates =
		activeFilter === "All"
			? templates
			: templates.filter(
					(template) =>
						template.type === activeFilter || template.tag === activeFilter,
				);

	return (
		<section className="py-10 max-w-360 px-4 md:px-10 lg:px-30 mx-auto">
			<div className="flex items-center justify-between mb-7">
				<h2 className="text-[18px] md:text-[28px] font-fraunces text-[#0A0A0A]">
					All Templates
				</h2>
				<span className="text-[11px] uppercase tracking-[1px] text-[#8A8A85]">
					{filteredTemplates.length} Templates
				</span>
			</div>

			{filteredTemplates.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
					{filteredTemplates.map((template, index) => (
						<TemplateCard key={template.id} template={template} index={index} />
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-[#0A0A0A]/20 rounded-[24px] bg-[#F9F9F8]/50 mt-4">
					<div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-5">
						<SearchX className="w-7 h-7 text-[#0A0A0A]/40" strokeWidth={1.5} />
					</div>
					<h3 className="text-[20px] md:text-[24px] font-fraunces text-[#0A0A0A] mb-2 text-center">
						No templates found
					</h3>
					<p className="text-[14px] text-[#8A8A85] text-center max-w-sm">
						We couldn&apos;t find any templates matching &quot;{activeFilter}
						&quot;. Try selecting a different filter or explore all templates.
					</p>
				</div>
			)}

			<div className="flex justify-center mt-12">
				{/* <button
					type="button"
					className="bg-[#0A0A0A] text-background text-[12px] md:text-[13px] tracking-[0.5px] font-semiBold px-8 py-3 rounded-full hover:opacity-80 transition-opacity"
				>
					LOAD MORE TEMPLATES ↓
				</button> */}
			</div>
		</section>
	);
};

export default TemplateGrid;
