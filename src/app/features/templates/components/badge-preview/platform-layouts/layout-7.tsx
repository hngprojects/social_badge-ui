import { Template7 } from "@/app/(dashboard)/create-badges/customize/components/customizable-svgs";
import { LogoPlaceholder } from "../shared/logo-placeholder";
import { ParticipantPhoto } from "../shared/participant-photo";
import type { TemplateLayoutProps } from "../types";
import { getSafeImageUrl } from "../utils";

export function Layout7({
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
			className="relative h-full w-full overflow-hidden rounded-[18px] text-white"
		>
			<Template7
				className="w-full h-full"
				editor={editor}
				baseColor={baseColor}
			/>
			<div className="absolute w-full h-full top-0 py-8">
				<div className="flex border-white  justify-between items-start px-8">
					<LogoPlaceholder
						isHidden={!editor.logo}
						logoPreviewUrl={editor.logoPreviewUrl}
					/>
					<div
						style={fontStyle}
						className="text-xs font-bold uppercase tracking-widest text-right"
					>
						{editor.eventName || "Event Name"}
					</div>
				</div>

				<div className="px-8 my-6 min-h-20">
					<h2 style={textStyle} className="text-3xl font-bold uppercase">
						{editor.participantNameVisible
							? editor.participantNamePlaceholder || "Your full name"
							: ""}
					</h2>
					<p style={textStyle} className="text-base opacity-90">
						{editor.roleTitleVisible
							? editor.roleTitlePlaceholder || "Product designer"
							: ""}
					</p>
				</div>
				<div className="bg-white w-[80%] h-45 rounded-t-sm rounded-b-2xl mx-auto flex items-center justify-center text-black text-[10px] overflow-hidden">
					{getSafeImageUrl(participantPhotoUrl) ? (
						<ParticipantPhoto
							url={participantPhotoUrl}
							className="w-full h-full object-cover"
						/>
					) : editor.allowParticipantPhoto ? (
						"PHOTO"
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}
