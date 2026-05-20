import Image from "next/image";
import { StepDataType } from "../../types/waitlist";

const StepCard = ({
	stepNumber,
	iconSrc,
	title,
	description,
}: StepDataType) => {
	return (
		<div className=" flex flex-col items-center p-8 bg-white rounded-[24px] border-[0.5px] border-[#D1D5DB]  max-w-[368px] text-center">
			{/* Icon Container */}

			<Image
				src={iconSrc}
				alt=""
				width={95}
				height={95}
				className="object-contain"
			/>

			{/* Step Badge */}
			<span className="px-5 py-1 mb-3  text-[10px] font-sans font-bold uppercase tracking-widest text-white bg-[#161616] rounded-full">
				Step {stepNumber}
			</span>

			{/* Text Content */}
			<h3 className="mb-2 text-xl font-bold text-[#161616]">{title}</h3>
			<p className="text-sm leading-relaxed text-[#222222] font-bold">
				{description}
			</p>
		</div>
	);
};

export default StepCard;
