import { HngBackgroundImage } from "../shared/hng-background-image";
import type { HngCardThemeKey, TemplateLayoutProps } from "../types";
import { buildBgStyle } from "../utils";
import { Confetti } from "./coffetti";
import { HNG_CARD_THEMES } from "./hng-card-config";
import { HNG_ASSETS } from "../constants";
import { InnerBadgeLayout } from "./inner-badge-layout";

interface HngLayoutCardProps extends TemplateLayoutProps {
	themeKey: HngCardThemeKey;
}

export function HngLayoutCard({
	editor,
	textColor,
	participantPhotoUrl,
	themeKey,
	badgeRef,
}: HngLayoutCardProps) {
	const theme = HNG_CARD_THEMES[themeKey];
	const bgStyle = buildBgStyle(editor);
	const contentClassName = theme.centerContent
		? "relative z-10 w-full h-full flex flex-col items-center justify-center text-white font-bricolage"
		: "relative z-10 w-full h-full flex flex-col justify-center text-white font-bricolage";

	return (
		<div
			ref={badgeRef}
			data-badge-root
			className="relative h-full w-full overflow-hidden rounded-[18px]"
		>
			{/* BACKGROUND IMAGE */}
			{editor.bgMode === "image" && (
				<HngBackgroundImage
					key={theme.background}
					src={theme.background}
					editor={editor}
				/>
			)}
			{/* CONTAINER WITH THE EDITABLE CONTENT ON IT */}
			<div className={contentClassName} style={bgStyle}>
				<Confetti />
				<InnerBadgeLayout
				watermarkLogo={HNG_ASSETS.watermark.logo}
				watermarkURL={HNG_ASSETS.watermark.url}
				watermarkBrandName= {HNG_ASSETS.watermark.brandName}
					editor={editor}
					participantPhotoUrl={participantPhotoUrl}
					{...theme.resolveInnerProps(textColor)}
				/>
			</div>
		</div>
	);
}

export function LayoutCard1(props: TemplateLayoutProps) {
	return <HngLayoutCard {...props} themeKey="dev" />;
}

export function LayoutCard2(props: TemplateLayoutProps) {
	return <HngLayoutCard {...props} themeKey="pm" />;
}

export function LayoutCard3(props: TemplateLayoutProps) {
	return <HngLayoutCard {...props} themeKey="default" />;
}

export function LayoutCard4(props: TemplateLayoutProps) {
	return <HngLayoutCard {...props} themeKey="design" />;
}

export function LayoutCard5(props: TemplateLayoutProps) {
	return <HngLayoutCard {...props} themeKey="flaretag" />;
}
