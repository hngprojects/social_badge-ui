"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CaptionBox from "./caption-box";
import { DEFAULT_CAPTION, SOCIAL_PLATFORMS } from "../constants";
import { useState, useEffect, useRef } from "react";
import ParticipantPopup from "./participant-popup";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "../constants";
import { SharePlatform } from "../types";
import { useSearchParams } from "next/navigation";
import { useIncrementBadgeShare } from "../hooks/useIncrementBadgeShare";
import { useIncrementBadgeCreation } from "../hooks/useIncrementBadgeCreation";

interface BadgeReadyProps {
	onDownload?: () => Promise<void>;
	defaultCaption?: string;
	shareUrl?: string;
}

export default function BadgeReady({
	onDownload,
	defaultCaption,
	shareUrl,
}: BadgeReadyProps) {
	const searchParams = useSearchParams();
	const slug = searchParams.get("slug");
	const { incrementShare } = useIncrementBadgeShare();
	const { incrementCreationAsync } = useIncrementBadgeCreation();

	const [captionText, setCaptionText] = useState(
		defaultCaption || DEFAULT_CAPTION,
	);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const incrementedSlugs = useRef(new Set<string>());

	useEffect(() => {
		if (slug && !incrementedSlugs.current.has(slug)) {
			incrementedSlugs.current.add(slug);

			incrementCreationAsync(slug).catch(() => {
				incrementedSlugs.current.delete(slug);
			});
		}
	}, [slug, incrementCreationAsync]);

	const handleDownload = async () => {
		if (!onDownload) return;
		setIsDownloading(true);
		try {
			await onDownload();
			if (slug) {
				incrementShare(slug);
			}
			setIsPopupOpen(true);
		} catch {
			toast.error("Failed to download badge. Please try again.");
		} finally {
			setIsDownloading(false);
		}
	};

	const handleSocialShare = async (platformId: SharePlatform) => {
		const url = shareUrl || window.location.href;

		if (navigator.share) {
			try {
				await navigator.share({ text: captionText, url });
				if (slug) {
					incrementShare(slug);
				}
				return;
			} catch {
				// user cancelled or API unavailable — fall through to platform URLs
			}
		}

		const encodedCaption = encodeURIComponent(captionText);
		const encodedUrl = encodeURIComponent(url);

		const shareUrls: Record<string, string> = {
			whatsapp: `https://api.whatsapp.com/send?text=${encodedCaption}%20${encodedUrl}`,
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedCaption}`,
			x: `https://twitter.com/intent/tweet?text=${encodedCaption}&url=${encodedUrl}`,
telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedCaption}`,
		};

		const target = shareUrls[platformId];
		if (target) {
			window.open(target, "_blank", "noopener,noreferrer,width=600,height=500");
			if (slug) {
				incrementShare(slug);
			}
		}
	};

	return (
		<motion.div
			className="space-y-6 rounded-3xl border py-8 px-5 w-full max-w-147 bg-white"
			variants={containerVariants}
			initial="hidden"
			animate="show"
		>
			<motion.div className="flex flex-col gap-7" variants={itemVariants}>
				<div className="flex items-center justify-center text-center gap-4">
					<div>
						<h1 className="text-[32px] text-black font-sans font-bold">
							Your badge is ready
						</h1>
						<p className="font-sans font-medium text-[14px] text-[#9b9b9b]">
							Download or share it on your social media platforms
						</p>
					</div>
					<motion.div
						initial={{ scale: 0, rotate: -20 }}
						animate={{ scale: 1, rotate: 0 }}
						transition={{
							type: "spring",
							bounce: 0.5,
							delay: 0.6,
							duration: 1.0,
						}}
					>
						<Image
							src="/assets/participant/confetti.png"
							alt="Confetti image"
							width={60}
							height={60}
							className="w-15 h-15 object-contain"
						/>
					</motion.div>
				</div>
				<Button
					type="button"
					onClick={handleDownload}
					disabled={isDownloading}
					className="w-full h-10 bg-[#020202] font-sans text-[14px]"
				>
					{isDownloading ? "Downloading…" : "Download badge"}
				</Button>
			</motion.div>
			<motion.div
				className="flex items-center gap-4 w-full my-5"
				variants={itemVariants}
			>
				<hr className="flex-1 border-t border-[#D1D5DB]" />
				<span className="text-[14px] text-black font-medium font-sans">
					or share directly to
				</span>
				<hr className="flex-1 border-t border-[#D1D5DB]" />
			</motion.div>
			<motion.div
				className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-2 w-full place-items-center sm:gap-y-8 px-10"
				variants={containerVariants}
			>
				{SOCIAL_PLATFORMS.map((platform) => (
					<motion.button
						key={platform.id}
						variants={itemVariants}
						onClick={() => handleSocialShare(platform.id as SharePlatform)}
						className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<div className="relative w-13 h-13 md:w-15 md:h-15 rounded-full overflow-hidden shrink-0">
							<Image
								src={platform.icon}
								alt={`${platform.name} icon`}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 52px, 60px"
							/>
						</div>
						<span className="text-[16px] md:text-[13px] font-medium font-sans text-[#121217] text-center">
							{platform.name}
						</span>
					</motion.button>
				))}
			</motion.div>
			<motion.div variants={itemVariants}>
				<CaptionBox
					value={captionText}
					onChange={(e) => setCaptionText(e.target.value)}
				/>
			</motion.div>
			<ParticipantPopup
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
			/>
		</motion.div>
	);
}
