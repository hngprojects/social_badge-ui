import { Template1 } from "@/app/(dashboard)/create-badges/customize/components/customizable-svgs";
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
			<div className="w-30 h-26.5 left-8.5 absolute top-20 rounded-full shadow-lg shadow-black/30">
				{/* 2. Inner wrapper maintains the clean circular crop */}
				<div className="w-full h-full bg-transparent rounded-full flex justify-center items-center text-white text-[10px] text-center overflow-hidden relative">
					{getSafeImageUrl(participantPhotoUrl) ? (
						<>
							{/* Background Layer: Blurs and fills the empty edges */}
							<ParticipantPhoto
								url={participantPhotoUrl}
								className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-50"
							/>
							{/* Foreground Layer: Keeps perfect proportions without cropping */}
							<ParticipantPhoto
								url={participantPhotoUrl}
								className="relative z-10 w-full h-full object-contain"
							/>
						</>
					) : (
						<span className="px-2 z-10">
							{editor.allowParticipantPhoto ? "Profile Photo" : ""}
						</span>
					)}
				</div>
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
