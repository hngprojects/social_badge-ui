"use client";

import { useState } from "react";
import Image from "next/image";
import ParticipantForm from "./components/participant-form";
import BadgeReady from "./components/badge-ready";
import Link from "next/link";

export default function ParticipantPov() {
	const [isBadgeReady, setIsBadgeReady] = useState(false);
	return (
		<div className="relative min-h-screen bg-primary-50 flex flex-col items-center justify-center py-28 lg:py-0 overflow-hidden">
			{/* Background Blobs */}
			<div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
				<Image
					src="/assets/waitlist/waitlist-hero-left.svg"
					alt="background blob"
					width={600}
					height={600}
					className="absolute -top-20 -left-20 opacity-50 lg:opacity-100"
					style={{ width: "auto", height: "80%" }}
				/>
				<Image
					src="/assets/waitlist/waitlist-hero-right.svg"
					alt="background blob"
					width={400}
					height={400}
					className="absolute right-0 bottom-0 opacity-50 lg:opacity-100"
					style={{ width: "auto", height: "60%" }}
				/>
			</div>

			{/* Header / Logo */}
			<header className="absolute top-8 left-8 z-10 w-full max-w-7xl mb-21 md:mb-24">
				<Link
					href="/"
					className="flex items-center gap-2 group w-fit"
					aria-label="Flare Tag home"
				>
					<Image
						src="/assets/logo.svg"
						alt="Flare Tag logo"
						width={32}
						height={32}
						className="w-6 h-6 transition-transform duration-200 group-hover:scale-105"
					/>
					<span className="text-xl md:text-xl font-semibold tracking-tight text-[#121217]">
						Flare Tag
					</span>
				</Link>
			</header>

			{/* main section */}
			<div className="flex flex-col-reverse lg:flex-row w-full max-w-6xl mx-auto items-center justify-center lg:justify-between gap-10 px-4 lg:px-8 relative z-10">
				{isBadgeReady ? (
					<BadgeReady />
				) : (
					<ParticipantForm onSuccess={() => setIsBadgeReady(true)} />
				)}

				<div
					aria-hidden="true"
					className="preview-section bg-primary-300 w-full max-w-135 h-125 lg:h-155 rounded-3xl shrink-0"
				></div>
			</div>
		</div>
	);
}
