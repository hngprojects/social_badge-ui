import BadgeSvg, { FivePercent } from "../shared/badge-svg";
import type { InnerBadgeLayoutProps } from "../types";
import { ParticipantPhoto } from "../shared/participant-photo";
import { getSafeImageUrl, isHngLayout } from "../utils";

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
	roleBorderColor,
}: InnerBadgeLayoutProps) {
	const isHng = isHngLayout(editor.layoutId);
	const badgeTitle = isHng ? editor.badgeTitle || "Finalist" : "Finalist";
	const trackValue = isHng
		? editor.trackVisible === true
			? editor.trackPlaceholder || "Virtual Assistant"
			: ""
		: editor.roleTitleVisible === true
			? editor.roleTitlePlaceholder || "Virtual Assistant"
			: "";

	return (
		<div className="z-10 h-[80%] w-[73%] min-w-70 min-h-99 mx-auto flex flex-col gap-[3.5%] relative">
			<div className="flex justify-center items-center h-10 w-full overflow-hidden">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={editor.logoPreviewUrl || logoUrl}
					alt="badge logo"
					className="max-h-full max-w-full object-contain"
				/>
			</div>
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

			<div className="w-full h-full flex justify-center items-center rounded-4xl overflow-hidden text-black relative">
				{getSafeImageUrl(participantPhotoUrl) ? (
					<>
						{/* 1. The Background Layer: Stretched and blurred to fill the sides */}
						<ParticipantPhoto
							url={participantPhotoUrl}
							alt=""
							className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-50"
						/>

						{/* 2. The Foreground Layer: Perfectly proportioned, showing the whole picture */}
						<ParticipantPhoto
							url={participantPhotoUrl}
							alt="Participant"
							className="relative z-10 w-full h-full object-contain"
						/>
					</>
				) : editor.allowParticipantPhoto ? (
					"Photo"
				) : (
					""
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
			</div>
		</div>
	);
}
