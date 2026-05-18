import { forwardRef } from "react";
import Image from "next/image";
import type { Props } from "./types/BadgePreview";
import {
	TRANSITION_LAYER,
	DECORATIVE_DOT_PATTERN,
	BADGE_CONTENT_FRAME,
	BADGE_LAYOUT,
} from "./constants/BadgePreview";

function DecorativeBottomSquare({ className }: { className: string }) {
	return (
		<div
			className={`pointer-events-none ${TRANSITION_LAYER} ${className}`}
			aria-hidden
		>
			<div className="inline-flex h-7 w-7 rounded-md bg-white/10 p-1">
				<div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-px">
					{DECORATIVE_DOT_PATTERN.flatMap((row, ri) =>
						row.map((cell, ci) => (
							<div
								key={`${ri}-${ci}`}
								className={
									cell === 1
										? "min-h-0 min-w-0 rounded-xs bg-white/60"
										: "min-h-0 min-w-0 rounded-xs bg-transparent"
								}
							/>
						)),
					)}
				</div>
			</div>
		</div>
	);
}

function buildEventLine(event: string, hashtag: string) {
	const tag = hashtag
		? hashtag.startsWith("#")
			? hashtag
			: `#${hashtag}`
		: "";
	const parts = [event.trim(), tag].filter(Boolean).join(" / ");
	return parts || "BADGE.BUILD / DEVCON 2026";
}

const BadgePreview = forwardRef<HTMLDivElement, Props>(({ badge }, ref) => {
	const {
		photoPreview,
		name,
		role,
		event,
		hashtag,
		style,
		badgeColor,
		textColor,
	} = badge;

	const layout = BADGE_LAYOUT[style];

	const initials =
		name
			.split(" ")
			.map((w) => w[0])
			.join("")
			.toUpperCase()
			.slice(0, 2) || "?";

	const eventLabel = buildEventLine(event, hashtag);

	const avatarShell = [
		"flex items-center justify-center overflow-hidden rounded-full font-bold backdrop-blur-[1px]",
		"shadow-[inset_0_0_0_2px_rgba(255,255,255,0.38)]",
		TRANSITION_LAYER,
	].join(" ");

	const avatarInner =
		photoPreview !== "" ? (
			<Image
				src={photoPreview}
				alt="Profile"
				width={48}
				height={48}
				className="h-full w-full object-cover"
			/>
		) : (
			<span className="tabular-nums">{initials}</span>
		);

	return (
		<div
			ref={ref}
			style={{
				backgroundColor: badgeColor,
				color: textColor,
			}}
			className={[
				layout.root,
				"relative h-36 w-72 shrink-0 overflow-hidden rounded-2xl shadow-xl select-none",
				"motion-reduce:transition-none motion-reduce:duration-0",
			].join(" ")}
		>
			<div className={`${BADGE_CONTENT_FRAME} min-h-0 min-w-0`}>
				<div className="relative h-full w-full min-h-0 min-w-0">
					<div className={layout.decorativeCircle} aria-hidden />

					<div className={layout.topBand.wrapper}>
						<div
							className={`${avatarShell} ${layout.topBand.avatarOuter}`}
							style={{
								backgroundColor: "rgba(255,255,255,0.18)",
								color: textColor,
							}}
						>
							{avatarInner}
						</div>
						<div className={layout.topBand.eventOuter}>
							<p
								className={layout.topBand.eventText}
								title={eventLabel}
								style={{ opacity: style === "banner" ? 0.95 : 0.92 }}
							>
								{eventLabel}
							</p>
						</div>
					</div>

					<div className={layout.identity.wrapper}>
						<p className={layout.identity.name} style={{ opacity: 1 }}>
							{name.trim() ? name : "Your Name"}
						</p>
						<p
							className={layout.identity.role}
							style={{ opacity: 0.9 }}
							title={(role.trim() ? role : "Your Role / Title") || ""}
						>
							{role.trim() ? role : "Your Role / Title"}
						</p>
					</div>

					<DecorativeBottomSquare className={layout.decorativeSquarePosition} />
				</div>
			</div>
		</div>
	);
});

BadgePreview.displayName = "BadgePreview";

export default BadgePreview;
