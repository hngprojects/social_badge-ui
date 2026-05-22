import Image from "next/image";
import { StepDataType } from "../../types/waitlist";

const StepCard = ({
	stepNumber,
	iconSrc,
	title,
	description,
}: StepDataType) => {
	return (
		<div className=" flex flex-col items-center p-8 bg-white rounded-[24px] border-[0.5px] border-[#D1D5DB]  max-w-[368px] md:max-w-[368px] text-center font-sans">
			{/* Icon Container */}
			<div className="flex items-center justify-center w-16 h-16 mb-6 bg-[#9CA3AF] rounded-full ring-1 ring-[#D1D5DB] ring-offset-14">

				<Image
					src={iconSrc}
					alt=""
					width={27.5}
					height={27.5}
					className="object-contain"
				/>
			</div>


			{/* Step Badge */}
			<span className="px-5 py-2 mb-3 text-xs  font-semibold uppercase tracking-widest text-white bg-[#161616] rounded-full">
				Step {stepNumber}
			</span>

			{/* Text Content */}
			<h3 className="mb-2 text-xl font-bold text-[#161616]">{title}</h3>
			<p className="text-[16px] leading-relaxed text-[#222222] font-normal">
				{description}
			</p>
		</div>
	);
};

export default StepCard;
