import { Template1 } from "@/app/features/customize/components/customizable-svgs";
import { ParticipantPhoto } from "../shared/participant-photo";
import type { TemplateLayoutProps } from "../types";
import { getSafeImageUrl } from "../utils";

export function Layout1({
	editor,
	participantPhotoUrl,
	baseColor,
	fontStyle,
	textColor,
	badgeRef,
}: TemplateLayoutProps) {
	const textStyle = textColor ? { color: textColor } : {};

	return (
		<div
			ref={badgeRef}
			data-badge-root
			className="relative h-full w-full overflow-hidden rounded-[18px]"
		>
			<Template1
				className="absolute inset-0 w-full h-full"
				editor={editor}
				baseColor={baseColor}
			/>
			<div className="w-32 h-27 left-6.5 bg-rose-600 absolute top-19 rounded-full flex justify-center items-center text-white text-[10px] text-center overflow-hidden">
				{getSafeImageUrl(participantPhotoUrl) ? (
					<ParticipantPhoto
						url={participantPhotoUrl}
						className="w-full h-full object-cover"
					/>
				) : (
					<span className="px-2">
						{editor.allowParticipantPhoto ? "Profile Photo" : ""}
					</span>
				)}
			</div>
			<div className="absolute top-52 px-8 w-full">
				<h2
					style={textStyle}
					className="text-6xl font-normal uppercase text-black tracking-tight font-league-gothic leading-[0.85]"
				>
					{editor.participantNameVisible
						? editor.participantNamePlaceholder || "Your full name"
						: ""}
				</h2>
				<p style={textStyle} className="text-md text-black/80 mt-2">
					{editor.roleTitleVisible
						? editor.roleTitlePlaceholder || "Product Designer"
						: ""}
				</p>
			</div>
			<div className="absolute bottom-8 w-full text-right px-6">
				<p
					style={fontStyle}
					className="text-xl font-normal text-stone-300 font-league-gothic"
				>
					{editor.eventName || "#DesignWeekLagos"}
				</p>
			</div>
		</div>
	);
}
