import Image from "next/image";
export default function ContactWays() {
	return (
		<div className="w-full lg:w-2/5 text-center lg:text-left">
			<h3 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A] font-fraunces mb-4">
				Ways to reach us
			</h3>
			<p className="text-[#8A8A85] text-base leading-relaxed mb-10">
				We&apos;re a small team. No ticketing queues, no bots — just real people
				who care about making your events go viral.
			</p>

			{/* Email card */}
			<a
				href="mailto:flaretagme@gmail.com"
				className="flex items-center gap-3 bg-white border border-[#EAEAE6] rounded-[14px] px-6 py-5 transition-colors hover:border-[#FF693E] hover:bg-[#FFF8F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF693E]/40"
				aria-label="Email Flare Tag at flaretagme@gmail.com"
			>
				<div className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0">
					<Image
						width={56}
						height={56}
						alt=""
						src={`/assets/icons/mail.svg`}
						className="w-auto h-auto"
					/>
				</div>
				<div>
					<p className="text-base font-semibold text-left">Email us</p>
					<p className="text-[#8A8A85] text-sm mt-0.5">flaretagme@gmail.com</p>
				</div>
			</a>
		</div>
	);
}
