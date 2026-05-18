import Image from "next/image";
import Link from "next/link";

import { templates } from "./constants/browse-templates";

export default function BrowseTemplate() {
	return (
		<section className=" rounded-[12px] border border-[#E8E8E8] ">
			<div className="flex justify-between items-center py-[18px] px-5 border-b-[1px]">
				<h1 className="text-[clamp(18px,2.5vw,20px)] font-semibold text-[#242424]">
					Browse templates
				</h1>
				<Link
					href="/templates"
					className="text-primary text-[clamp(13px,2vw,14px)] cursor-pointer hover:opacity-90"
				>
					View all
				</Link>
			</div>

			<div className="p-5 grid place-content-center w-full gap-[18px] grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
				{templates.map((template) => (
					<article
						key={template.id}
						className="relative flex flex-col overflow-hidden rounded-[12px] border border-[#EAEAE6] transition-transform duration-300 hover:scale-[1.005] hover:shadow-lg"
					>
						{template.tag && (
							<span className="absolute left-4 top-4 z-10 rounded-full bg-[#FF4F1F] px-[9px] py-[3.6px] font-mono text-[8px] uppercase tracking-[1px] text-white">
								{template.tag}
							</span>
						)}

						<div
							className="relative h-[200px] w-full shrink-0 overflow-hidden"
							style={{ backgroundColor: template.bg }}
						>
							<Image
								src={template.image}
								alt={template.title}
								fill
								className={`object-contain ${template.hasShadow ? "p-0 pt-2" : "p-4"}`}
							/>
						</div>

						<div className="flex flex-1 flex-col justify-between bg-[#F4F4F2]">
							<div className="flex flex-col gap-1 p-4">
								<span className="text-[9px] uppercase tracking-[1.2px] text-primary">
									{template.type}
								</span>

								<span className="font-fraunces text-[18px] font-semibold uppercase text-[#0A0A0A]">
									{template.title}
								</span>

								<span className="text-[11px] text-[#8A8A85]">
									by {template.creator} · {template.location}
								</span>
							</div>

							<div className="flex items-center justify-between border-t border-[#DCDCD7] p-4">
								<div className="flex items-center gap-2 text-[10px] uppercase tracking-[1px] text-[#8A8A85]">
									<span className="inline-block h-2 w-2 rounded-full bg-primary" />
									<span>{template.badgeCount} badges made</span>
								</div>

								<span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
									<Image
										src="/assets/landing-page/icons/Vector.svg"
										alt="Arrow"
										width={8}
										height={8}
									/>
								</span>
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
