import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getActionButtonClass } from "./action-button";
import { PublishedBarProps } from "@/app/features/dashboardLayout/types";

export function PublishedBar({ title, status, editHref }: PublishedBarProps) {
	return (
		<>
			<div className="flex min-w-0 items-center gap-6">
				<Link
					href="/dashboard"
					className="inline-flex shrink-0 items-center gap-2 leading-[16px] rounded-full border border-[#E5E7EB] bg-white px-3 py-2 text-[12px] font-medium text-[#3A3A3A] transition-colors hover:bg-[#F8F8F8]"
				>
					<Image
						src="/assets/dashboard/icons/arrow-left.svg"
						alt=""
						width={12}
						height={12}
					/>
					<span>Dashboard</span>
				</Link>
				<div className="min-w-0">
					<p className="truncate text-[14px] font-bold leading-[17px] tracking-[-0.14px] text-[#3A3A3A]">
						{title}
					</p>
					<p className="mt-1 truncate text-[11px] font-semibold uppercase leading-[13px] tracking-[0.84px] text-[#AFAFAF]">
						{status}
					</p>
				</div>
			</div>

			<div className="flex shrink-0 items-center leading-[20px] gap-2">
				<Button asChild className={getActionButtonClass(false)}>
					<Link href={editHref} className="flex items-center gap-2">
						<Image
							src="/assets/dashboard/icons/edit-icon.svg"
							alt=""
							width={16}
							height={16}
						/>
						<span>Edit badge</span>
					</Link>
				</Button>
				{/* <Button asChild className={getActionButtonClass(false)}>
          <Link href="#analytics" className="flex items-center gap-2">
            <Image
              src="/assets/dashboard/icons/analytics-bars.svg"
              alt=""
              width={16}
              height={16}
            />
            <span>View analytics</span>
          </Link>
        </Button> */}
			</div>
		</>
	);
}
