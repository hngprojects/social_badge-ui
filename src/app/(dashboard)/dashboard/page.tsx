import Analytics from "./components/analytics";
import BrowseTemplate from "./components/browse-templates";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
	return (
		<section className="flex flex-col gap-6 pt-[32px]">
			<header>
				<h1 className="capitalize text-[#242424]">Dashboard</h1>

				<div className="my-[16px]">
					<p className="text-[24px] font-medium text-[#242424]">Welcome, Joe</p>
					<p className="text-[14px] text-[#9B9B9B]">
						Let&apos;s create amazing badge experiences.
					</p>
				</div>
			</header>

			<Analytics />

			<section className="flex min-h-75 flex-col items-center justify-center rounded-[12px] border border-[#E8E8E8]">
				<div className="flex max-w-[443px] flex-col items-center justify-center px-[4px] md:px-[0]">
					<h1 className="text-[clamp(20px,3vw,24px)] text-center font-semibold text-[#040404]">
						You haven&apos;t created any badges yet
					</h1>

					<p className="mb-6 mt-2 text-center text-[clamp(13px,2vw,14px)] text-[#9B9B9B]">
						Create your first badge to get started. You can customize it, share
						it, and track engagement.
					</p>

					<Button className="h-auto! w-full bg-[#FA5424] px-6 py-3.5! text-[clamp(13px,2vw,14px)]! font-semibold cursor-pointer">
						<Link href="/create-badges">Create your first badge</Link>
					</Button>
				</div>
			</section>

			<BrowseTemplate />
		</section>
	);
}
