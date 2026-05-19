import { templates } from "../../mocks/explore.mock";
import TemplateCard from "./template-card";

const TemplateGrid = () => {
	return (
		<section className="py-10 max-w-360 px-4 md:px-10 lg:px-30 mx-auto">
			<div className="flex items-center justify-between mb-7">
				<h2 className="text-[18px] md:text-[28px] font-fraunces text-[#0A0A0A]">
					All Templates
				</h2>
				<span className="text-[11px] uppercase tracking-[1px] text-[#8A8A85]">
					{templates.length} Templates
				</span>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
				{templates.map((template, index) => (
					<TemplateCard key={template.id} template={template} index={index} />
				))}
			</div>

			<div className="flex justify-center mt-12">
				<button
					type="button"
					className="bg-[#0A0A0A] text-background text-[12px] md:text-[13px] tracking-[0.5px] font-semiBold px-8 py-3 rounded-full hover:opacity-80 transition-opacity"
				>
					LOAD MORE TEMPLATES ↓
				</button>
			</div>
		</section>
	);
};

export default TemplateGrid;
