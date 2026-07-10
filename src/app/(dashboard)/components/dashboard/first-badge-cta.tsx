import Image from "next/image";
import Link from "next/link";

export default function FirstBadgeCta() {
	return (
		<section className="grid min-h-[295px] items-center gap-8 overflow-hidden rounded-[24px] border border-[#E8E8E8] bg-[linear-gradient(120deg,#FFEDE0_15%,#FED4CC_60%,#FF8D6D_100%)] px-4 py-8 md:pt-10 md:px-10 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)] lg:px-[56px] lg:py-[48px]">
			<div className="max-w-[620px]">
				<div className="flex w-fit items-center gap-[6px] rounded-full bg-white px-[11px] py-[4.5px]">
					<div className="h-[5px] w-[5px] rounded-full bg-[#E86038]" />

					<p className="text-[10px] font-bold uppercase tracking-[0.04em] text-[#E86038] md:text-[12px]">
						Get started in 2 minutes
					</p>
				</div>

				<h1 className=" py-6 font-jakarta text-[28px] font-bold leading-[34px] tracking-[-0.9px] text-[#6B2C1A] text-balance md:text-[34px] md:max-w-[400px] md:leading-[36px]">
					Turn every attendee into{" "}
					<span className="font-[Fraunces] italic text-[#FF693E]">
						a marketing channel
					</span>
				</h1>

				<p className="text-[14px] leading-[22px] text-[#6B2C1A]">
					Create a branded badge once, share one link, and let your attendees
					promote your event on LinkedIn, X, and WhatsApp - automatically.
				</p>

				<div className="flex flex-col  items-center gap-3 pt-6 min-[430px]:flex-row min-[430px]:items-center">
					<Link
						href="/create-badges"
						className="rounded-full bg-[#6B2C1A] px-6 py-[14px] text-center text-[clamp(12px,1.5vw,14px)] font-semibold text-white whitespace-nowrap"
					>
						Create your first badge
					</Link>

					<Link
						href="/templates"
						className="rounded-full bg-white px-6 py-[14px] text-center text-[clamp(12px,1.5vw,14px)] font-semibold text-[#333333] whitespace-nowrap"
					>
						Browse templates
					</Link>
				</div>
			</div>

			<div className="flex w-full justify-center lg:justify-end items-end">
				<Image
					className="hidden h-auto w-full max-w-[420px] object-contain md:block"
					width={478}
					height={280}
					alt="Badge preview"
					src="/assets/dashboard/dashboard-card.svg"
				/>

				<Image
					className="block h-auto w-full max-w-[250px] object-contain md:hidden"
					width={250}
					height={260}
					alt="Badge preview"
					src="/assets/dashboard/dashboard-mobile.svg"
				/>
			</div>
		</section>
	);
}
