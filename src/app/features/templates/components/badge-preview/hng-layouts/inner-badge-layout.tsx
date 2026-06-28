import BadgeSvg, { FivePercent } from "../shared/badge-svg";
import { isHngLayout } from "../utils";
import type { InnerBadgeLayoutProps } from "../types";
import { Watermark } from "@/app/features/templates/components/badge-preview/watermark";

export function InnerBadgeLayout({
	editor,
	nameTextColor,
	roleTextColor,
	headingTextColor,
	roleBgColor,
	svgFill,
	percentIConFill,
	participantPhotoUrl,
	logoUrl,
	roleBorderColor,watermarkLogo,
	watermarkBrandName,
	watermarkColor
}: InnerBadgeLayoutProps) {
	const isHng = isHngLayout(editor.layoutId);
	const badgeTitle = isHng ? editor.badgeTitle || "Finalist" : "Finalist";
	const showBadgeMarker = badgeTitle !== "Mentor";
	const trackValue = isHng
		? editor.trackVisible === true
			? editor.trackPlaceholder || "Virtual Assistant"
			: ""
		: editor.roleTitleVisible === true
			? editor.roleTitlePlaceholder || "Virtual Assistant"
			: "";

	return (
		<div className="z-10  h-[80%] w-[73%] min-w-70 min-h-105 mx-auto flex flex-col gap-[2.5%] relative">
			{/* Logo display container */}
			<div className="flex justify-center items-center h-10 w-full overflow-hidden">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={editor.logoPreviewUrl || logoUrl}
					alt="badge logo"
					className="max-h-full max-w-full object-contain"
				/>
			</div>

			{/* Participant role and track container */}
			<div className="flex flex-col justify-center text-center w-60 mx-auto">
				<span
					className="font-bricolage text-[53px] leading-none font-bold -mb-2.5 tracking-tighter"
					style={{ color: headingTextColor }}
				>
					{badgeTitle}
				</span>

				{trackValue && (
					<span
						className="w-full border-4 border-white mx-auto rounded-full py-1.5 px-2 font-semibold"
						style={{
							backgroundColor: roleBgColor,
							color: roleTextColor,
							borderColor: roleBorderColor,
						}}
					>
						{trackValue}
					</span>
				)}
			</div>

			<div className="relative border-5 rounded-4xl min-h-53 flex justify-center items-center w-60 h-[40%] mx-auto bg-[#ECF5D6] border-white">
				<div className="w-full h-full flex justify-center items-center rounded-4xl overflow-hidden text-black">
					{participantPhotoUrl ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={participantPhotoUrl}
							alt="Participant"
							className="w-full h-full object-cover"
						/>
					) : editor.allowParticipantPhoto ? (
						"Photo"
					) : (
						""
					)}
				</div>
				{showBadgeMarker && (
					<div className="absolute -bottom-6 -right-7 w-20 h-20 flex justify-center items-center">
						<BadgeSvg className={svgFill} />
						<span className="absolute flex flex-col justify-center items-center font-semibold">
							<FivePercent className={percentIConFill} />
						</span>
					</div>
				)}
			</div>

			<div className="text-center -mt-2">
				<span
					className="font-bricolage text-[24px] font-semibold"
					style={{ color: nameTextColor }}
				>
					{editor.participantNameVisible
						? editor.participantNamePlaceholder || "John Jane Josh Doe"
						: ""}
				</span>

				{/* How can we set a proper color for our brand text that sits on the BG? */}
				<Watermark watermarkColor={watermarkColor} watermarkBrandName={watermarkBrandName} watermarkLogo={watermarkLogo}  />
			</div>
		</div>
	);
}
