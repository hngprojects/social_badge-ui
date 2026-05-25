"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ReturnButton({
	onClick,
	text = "Return to Page",
	className = "",
}: {
	onClick?: () => void;
	text?: string;
	className?: string;
}) {
	return (
		<button
			onClick={onClick}
			className={`w-full md:w-auto bg-[#FA5424] hover:bg-[#FA5424]/90 text-white rounded-full px-4 md:px-6 min-w-[120px] md:max-w-[163px] py-6 md:py-3 text-[16px] md:text-[16px] font-sans h-12 md:h-auto transition-all flex items-center justify-center gap-2 ${className}`}
		>
			{text}
		</button>
	);
}

export default function WaitlistSuccessPage() {
	const router = useRouter();
	return (
		<div className="relative min-h-screen w-full bg-[#F9F9F9] overflow-hidden flex flex-col justify-center items-center py-6 px-4 md:px-6">
			{/* Background Blobs */}
			<div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
				<Image
					src="/assets/waitlist/waitlist-hero-left.svg"
					alt="background blob"
					width={600}
					height={600}
					className="absolute top-0 -left-5 md:-top-20 md:-left-20 opacity-50 lg:opacity-100"
					style={{ width: "auto", height: "80%" }}
				/>
				<Image
					src="/assets/waitlist/waitlist-hero-right.svg"
					alt="background blob"
					width={400}
					height={400}
					className="absolute right-9 bottom-0 md:right-0 md:bottom-0 opacity-50 lg:opacity-100"
					style={{ width: "auto", height: "60%" }}
				/>
			</div>

			<div className="relative flex items-center justify-center w-full md:p-6">
				<div className="max-w-5xl w-full bg-white rounded-md shadow-xl overflow-hidden flex flex-col md:flex-row items-center px-8 py-14 md:p-16 gap-12 border border-gray-100">
					<div className="flex-1 space-y-6 py-6">
						<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
							<Image
								src="/assets/waitlist/check.svg"
								alt="check mark"
								width={40}
								height={40}
								className="w-8 h-8 md:w-13 md:h-13"
							/>
						</div>

						<div className="space-y-4 md:space-y-3">
							<h1 className="text-5xl md:text-5xl font-sans font-bold text-[#1E1E1E] leading-tight mb-7">
								Successful ! <br />
								You&apos;ve Joined the Waitlist!
							</h1>
							<p className="text-[#757575] text-[18px] font-semibold max-w-sm">
								We&apos;ll notify you as soon as Flare Tag Builder is ready.
							</p>
						</div>
						<ReturnButton onClick={() => router.push("/")} />
					</div>

					<Image
						src="/assets/waitlist/success-hero.svg"
						alt="Success Illustration"
						width={200}
						height={200}
						className="hidden md:block"
						style={{ width: "530px", height: "530px" }}
					/>
				</div>
			</div>
		</div>
	);
}
