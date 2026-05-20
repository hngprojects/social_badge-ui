import Analytics from "./components/analytics";
import BrowseTemplate from "./components/browse-templates";
import Steps from "./components/steps";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecentBadges from "./components/recent-badges";

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function Dashboard() {
	return (
		<section className="flex flex-col gap-6 pt-[32px] p-7">
			<header>
				<h1 className="capitalize text-[#AFAFAF] text-[14px]">Dashboard</h1>

				<div className="my-[16px]">
					<p className="text-[28px] font-bold text-[#1A1A1A]">
						Welcome to Social Badge,{" "}
						<span className="italic text-[#FF693E]">Joe</span>
					</p>
					<p className="text-[14px] text-[#9B9B9B]">
						Let&apos;s create amazing badge experiences.
					</p>
				</div>
			</header>

			<Analytics />

			{/* <section className="flex min-h-75 flex-col items-center justify-center rounded-[12px] border border-[#E8E8E8]">
				<div className="flex max-w-[443px] flex-col items-center justify-center px-[4px] md:px-[0]">
					<h1 className="text-[clamp(20px,3vw,24px)] text-center font-semibold text-[#040404]">
						You haven&apos;t created any badges yet
					</h1>

					<p className="">
						Create a branded badge once, share one link, and let your attendees
						promote your event on LinkedIn, X, and WhatsApp — automatically.
					</p>
					<div className="pt-[24px]">
						<Button className="py-[14px] px-[16px]">
							Create your first badge
						</Button>
						<Button>Browse templates</Button>
					</div>
				</div>
				<div className="flex-1 align-end">
					<Image
						className="h-auto w-full"
						width={478}
						height={280}
						alt="dashboard card"
						src="/assets/dashboard/dashboard-card.png"
					/>
				</div>
			</section> */}
			<RecentBadges />

			<Steps />

			<BrowseTemplate />
		</section>
	);
}
