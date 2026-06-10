import { Template9 } from "@/app/(dashboard)/create-badges/customize/components/customizable-svgs";
import { LogoPlaceholder } from "../shared/logo-placeholder";
import type { TemplateLayoutProps } from "../types";

export function Layout9({
	editor,
	participantPhotoUrl,
	baseColor,
	fontStyle,
	textColor,
}: TemplateLayoutProps) {
	const textStyle = textColor ? { color: textColor } : {};
	return (
		<div className="relative w-full h-full overflow-hidden rounded-[18px] text-white">
			<Template9
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

				<div className="px-8 my-6">
					<h2 style={textStyle} className="text-3xl font-bold uppercase">
						{editor.participantNameVisible
							? editor.participantNamePlaceholder || "Your full name"
							: ""}
					</h2>
					<p style={textStyle}>
						{editor.roleTitleVisible
							? editor.roleTitlePlaceholder || "Product designer"
							: ""}
					</p>
				</div>
				<div className="bg-zinc-300 absolute bottom-8 w-35 h-35 right-10 rotate-10 flex items-center justify-center text-black text-[10px] overflow-hidden">
					{participantPhotoUrl ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={participantPhotoUrl}
							alt="Participant"
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
