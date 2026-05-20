import Image from "next/image";
import { benefits } from "../../constants/waitlist";

export default function CommunityBenefits() {
	return (
		<section className="py-20 px-6 max-w-360 mx-auto">
			{/* Header Area */}
			<header className="text-center mb-16">
				<p className="text-base font-medium text-[#271813] mb-2 font-heading">
					Perfect for any community
				</p>
				<h2 className="text-4xl md:text-5xl font-bold text-[#525252] font-sans">
					Be the First to try it.{" "}
					<span className="italic font-serif text-[#FF4F1F] font-fraunces">
						right now.
					</span>
				</h2>
			</header>

			{/* Bento Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{benefits.map((item, index) => (
					<div
						key={index}
						className={`${item.bgColor} ${item.isWide ? "lg:col-span-2" : "lg:col-span-1"} 
              p-[32px] rounded-[32px] border border-[#FDD5CA] flex flex-col justify-between overflow-hidden
            `}
					>
						<div
							className={`flex flex-col gap-6 ${
								item.isWide
									? item.reverse
										? "lg:flex-row-reverse lg:gap-8 items-center"
										: "lg:flex-row lg:gap-8 items-center"
									: ""
							}`}
						>
							{/* Text Content */}
							<div className="flex-1">
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FDD5CA] text-[#AD380F] text-xs font-medium mb-6 font-sans">
									<Image
										src={item.tagImg}
										alt=""
										aria-hidden="true"
										width={16}
										height={16}
										className="object-contain"
									/>
									{item.tag}
								</div>
								<h3 className="text-2xl font-bold text-[#481303] mb-4 leading-tight font-sans">
									{item.title}
								</h3>
								<p className="text-[#481303] leading-relaxed font-sans">
									{item.description}
								</p>
							</div>

							{/* Image Content */}
							<div
								className={`relative w-full ${item.isWide ? "lg:w-[45%]" : "mt-8"}`}
							>
								{item.img && (
									<Image
										src={item.img}
										alt={item.title}
										width={500}
										height={300}
										className="w-full h-auto object-contain"
									/>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
