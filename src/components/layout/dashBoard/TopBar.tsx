import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TopBar() {
	return (
		<section className="flex items-center w-full justify-between gap-6">
			<div className="flex w-full max-w-[70%] items-center gap-[4.35px] rounded-[10.41px] bg-[#F8F8F8] py-2.5 pl-[12.5px] text-[14px] font-medium">
				<Image
					src="/assets/dashboard/icons/search-icon.svg"
					height={24}
					width={24}
					alt="search icon"
				/>

				<label htmlFor="dashboard-search" className="sr-only">
					Search for events, badges, attendees
				</label>
				<input
					id="dashboard-search"
					aria-label="Search for events, badges, attendees"
					className="w-full bg-transparent outline-none"
					type="text"
					placeholder="Search for Events, Badges, Attendees..."
				/>
			</div>

			<div className="flex shrink-0 gap-5 items-center">
				{/* <button
          type="button"
          aria-label="Open notifications"
          className="grid h-11 w-11 place-content-center rounded-full bg-[#F7F7F8] cursor-pointer"
        >
          <div className="relative w-[22px] h-[22px] ]">
            <Image
              src="/assets/dashboard/icons/notification.svg"
              alt="notification icon"
              width={22}
              height={22}
            />
          </div>
        </button> */}
				<Button
					asChild
					className="cursor-pointer h-auto! px-6 py-3.5! text-[14px] font-semibold"
				>
					<Link href="/create-badges">Create new badge</Link>
				</Button>
			</div>
		</section>
	);
}
