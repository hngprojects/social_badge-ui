import StepCard from "./steps-card";
import Image from "next/image";
import { stepsData } from "../../constants/waitlist";

const ThreeStepSection = () => {
	return (
		<section className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-12 py-16 px-5 max-w-7xl mx-auto overflow-hidden">
			{/* THE HEADING (Mobile Only - appears at top) */}
			<div className="lg:hidden w-full text-right mb-4">
				<h2 className="text-3xl md:text-4xl font-bold text-[#525252] leading-tight">
					Three steps to Make <br />
					<span className="italic font-Fraunces text-orange-500">
						your Event Reach Viral
					</span>
				</h2>
			</div>

			{/* LEFT COLUMN: The Step Cards */}
			<div className="flex flex-col justify-center items-center gap-6 w-full mx-auto md:max-w-md lg:mx-0 lg:w-[368px] lg:mt-32">
				{stepsData.map((step) => (
					<StepCard key={step.stepNumber} {...step} />
				))}
			</div>

			{/* RIGHT COLUMN: Visuals & Desktop Heading */}
			<div className="relative flex-1 w-full flex flex-col items-center lg:items-end">
				{/* Desktop Heading (Hidden on mobile) */}
				<div className="hidden lg:block ml-auto text-right mb-12 lg:mb-0  lg:pt-[10%] max-w-[569px]">
					<h2 className="text-[54px] font-bold text-[#525252] leading-[1.1]">
						Three steps to Make <br />
						<span className="italic font-Fraunces text-[#FF5722] font-semibold">
							your Event Reach Viral
						</span>
					</h2>
				</div>

				{/* Visual Composition Container */}
				<div className="w-full overflow-x-hidden scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
					<div className="relative overflow-y-visible lg:overflow-visible w-full min-h-[750px] md:aspect-square max-w-[500px] lg:max-w-full mt-8 lg:mt-0 mx-auto lg:mx-0 ">
						{/* Card 1*/}
						<div className="absolute top-[15%] sm:top-0 lg:top-[13%] -left-[70px] sm:left-0 md:-left-[10%] lg:left-0 w-[55%] w-[250px] lg:w-[288px] z-20 transform -rotate-12 md:rotate-0">
							<div className="absolute top-[15%] sm:top-0 lg:top-[13%] -left-17.5 sm:left-0 md:left-[-10%] lg:left-0 w-[55%] max-w-62.5 lg:w-[288px] z-20 transform -rotate-12 md:rotate-0"></div>
							<Image
								src="/assets/waitlist/card1.png"
								alt="Settings UI"
								width={288}
								height={375}
								className="w-full h-auto object-contain"
							/>
						</div>
						{/* Card 2 */}
						<div className="absolute top-[10%] left-[5%] md:left-[15%] w-92 lg:w-121.5 z-10 drop-shadow-2xl">
							<Image
								src="/assets/waitlist/card2.png"
								alt="Hack the Future Badge"
								width={486}
								height={598}
								className="w-full h-auto object-contain"
								loading="eager"
							/>
						</div>
						{/* Card 3 */}
						<div className="absolute bottom-[-3%] sm:bottom-0 right-[10%] md:-right-25 lg:right-0 lg:bottom-[19%] w-[70%] md:w-71.75 z-30 drop-shadow-2xl transform rotate-3">
							<Image
								src="/assets/waitlist/card3.png"
								alt="Attendee Badge"
								width={287}
								height={363}
								className="w-full h-auto object-contain"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ThreeStepSection;
