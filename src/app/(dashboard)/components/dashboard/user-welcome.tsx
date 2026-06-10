import { useUserStore } from "@/stores/use-user-store";

export function UserWelcome() {
	const user = useUserStore((state) => state.user);
	const userName = user?.first_name.trim() || "there";

	return (
		<div className="my-2">
			<p className="text-[28px] font-bold text-[#1A1A1A]">
				Welcome to Flare Tag,{" "}
				<span className="italic font-fraunces text-[#C54B00]">{userName}</span>
			</p>

			<p className="text-[16px] text-[#595959]">
				Let&apos;s design your first badge - your attendees will be sharing it
				before the day&apos;s out.
			</p>
		</div>
	);
}
