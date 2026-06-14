import {
	Template4,
	Template4Left,
	Template4Right
} from "@/app/(dashboard)/create-badges/customize/components/customizable-svgs";
import { LogoPlaceholder } from "../shared/logo-placeholder";
import { ParticipantPhoto } from "../shared/participant-photo";
import type { TemplateLayoutProps } from "../types";
import { getSafeImageUrl } from "../utils";

export function Layout4({
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
			className="relative h-full w-full overflow-hidden rounded-[18px] border"
		>
			<Template4
				className="absolute inset-0 w-full h-full"
				editor={editor}
				baseColor={baseColor}
			/>
			<div className="absolute top-[22%] left-0 w-full h-[60%] flex">
				<Template4Left/>
				<Template4Right/>
			</div>

			<div className="h-[77%] w-full absolute top-0">
				<LogoPlaceholder
					isHidden={!editor.logo}
					className="mt-12 mb-6 w-full"
					logoPreviewUrl={editor.logoPreviewUrl}
				/>
				<div className="w-40 h-40 rounded-full bg-white mx-auto flex items-center justify-center text-black text-[10px] overflow-hidden">
					{getSafeImageUrl(participantPhotoUrl) ? (
						<ParticipantPhoto
							url={participantPhotoUrl}
							className="w-full h-full object-contain"
						/>
					) : editor.allowParticipantPhoto ? (
						"PHOTO"
					) : (
						""
					)}
				</div>
			</div>

			<div className="absolute bottom-0 h-[23%] w-full pl-12 text-black">
				<h2
					style={{ ...fontStyle, ...textStyle }}
					className="text-xl mt-4 font-bold uppercase"
				>
					{editor.participantNameVisible
						? editor.participantNamePlaceholder || "Your full name"
						: ""}
				</h2>
				<p style={textStyle} className="text-sm opacity-80">
					{editor.roleTitleVisible
						? editor.roleTitlePlaceholder || "Product designer"
						: ""}
				</p>
			</div>
		</div>
	);
}
