"use client";
import { useState } from "react";
import Image from "next/image";
import Qr from "../../badges/published/icons/qr";
import { Share } from "../../badges/published/icons/share-icon";
import { SocialPlatform } from "../../types/badge-published/badge";
import { Button } from "@/components/ui/button";

const SOCIAL_PLATFORMS: SocialPlatform[] = [
	{
		id: "linkedin",
		label: "LinkedIn",
		getShareUrl: (url) =>
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
		Icon: LinkedInIcon,
	},
	{
		id: "twitter",
		label: "X (Twitter)",
		getShareUrl: (url, name) =>
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Grab your ${name} badge!`)}&url=${encodeURIComponent(url)}`,
		Icon: XIcon,
	},
	{
		id: "whatsapp",
		label: "WhatsApp",
		getShareUrl: (url, name) =>
			`https://api.whatsapp.com/send?text=${encodeURIComponent(`${name} badge: ${url}`)}`,
		Icon: WhatsAppIcon,
	},
	{
		id: "email",
		label: "Email",
		getShareUrl: (url, name) =>
			`mailto:?subject=${encodeURIComponent(`Your ${name} badge`)}&body=${encodeURIComponent(`Claim your badge here: ${url}`)}`,
		Icon: EmailIcon,
	},
	{
		id: "slack",
		label: "Slack — copies link",
		getShareUrl: (url) => url,
		Icon: SlackIcon,
	},
];

//const QR_FORMATS = ["PNG", "SVG", "PDF"] as const;

interface SpreadTheWordProps {
	url: string;
	badgeName: string;
}

export default function SpreadTheWord({ url, badgeName }: SpreadTheWordProps) {
	return (
		<section className="mb-6">
			<h2 className="text-[1.375rem] font-bold text-gray-900 mb-1">
				Spread the word
			</h2>
			<p className="text-sm text-gray-500 mb-5">
				The quickest ways to get your link in front of attendees.
			</p>

			<div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
				<OneTapShare url={url} badgeName={badgeName} />
				<QRCodeCard url={url} badgeName={badgeName} />
			</div>
		</section>
	);
}

interface OneTapShareProps {
	url: string;
	badgeName: string;
}

function OneTapShare({ url, badgeName }: OneTapShareProps) {
	const handleShare = (platform: SocialPlatform) => {
		if (platform.id === "slack") {
			navigator.clipboard?.writeText(url);
			return;
		}
		const shareUrl = platform.getShareUrl(url, badgeName);
		window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=500");
	};

	return (
		<div className="bg-white border border-[#ECE9E4] rounded-[16px] p-6 flex flex-col justify-between">
			<div>
				<div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-3.5">
					<Share />
				</div>
				<h3 className="text-[0.9375rem] font-bold text-gray-900 mb-1.5">
					One-tap share
				</h3>
				<p className="text-[0.8375rem] text-gray-500 leading-relaxed mb-4">
					Open a pre-filled post on the platform you choose. Edit before
					posting.
				</p>
			</div>
			<div className="flex gap-1.5 flex-wrap">
				{SOCIAL_PLATFORMS.map((platform) => (
					<Button
						key={platform.id}
						variant="social"
						onClick={() => handleShare(platform)}
						className="w-14 h-14 md:w-18.5 md:h-18.5 rounded-lg"
						aria-label={`Share on ${platform.label}`}
						title={platform.label}
					>
						<platform.Icon />
					</Button>
				))}
			</div>
		</div>
	);
}

interface QRCodeCardProps {
	url: string;
	badgeName: string;
}

function QRCodeCard({ url, badgeName }: QRCodeCardProps) {
	const [isDownloading, setIsDownloading] = useState(false);
	const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;

	const handleDownload = async () => {
		setIsDownloading(true);
		try {
			const response = await fetch(qrUrl);
			if (!response.ok) {
				throw new Error(`QR fetch failed with status ${response.status}`);
			}
			const blob = await response.blob();
			const blobUrl = URL.createObjectURL(blob);

			const link = document.createElement("a");
			link.href = blobUrl;
			link.download = `${badgeName.toLowerCase().replace(/\s+/g, "-")}-qr-code.png`;

			document.body.appendChild(link);
			link.click();

			// Clean up
			document.body.removeChild(link);
			URL.revokeObjectURL(blobUrl);
		} catch (error) {
			console.error("Failed to download QR code:", error);
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<div className="bg-white border border-[#ECE9E4] rounded-[16px] p-6 flex flex-col justify-between">
			<div>
				<div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-[#e8511a] mb-3.5">
					<Qr />
				</div>
				<h3 className="text-[0.9375rem] font-bold text-gray-900 mb-1.5">
					QR code
				</h3>
				<p className="text-[0.8375rem] text-gray-500 leading-relaxed mb-4">
					Perfect for venue signage, slides, lanyards, name tags.
				</p>

				<div className="flex gap-3.75 items-center mb-6">
					<Image
						src={qrUrl}
						alt={`QR code for ${badgeName}`}
						width={80}
						height={80}
						unoptimized
						className="rounded-md border border-gray-200 flex-shrink-0"
					/>

					<div>
						<div className="flex gap-1.5 mb-1.5">
							<span className="text-[0.7rem] font-semibold text-gray-400 tracking-wide">
								Download QR code as PNG
							</span>
							{/* {QR_FORMATS.map((fmt, i) => (
								<span
									key={fmt}
									className="text-[0.7rem] font-semibold text-gray-400 tracking-wide"
								>
									{fmt}
									{i < QR_FORMATS.length - 1 && (
										<span className="ml-1.5">·</span>
									)}
								</span>
							))} */}
						</div>
						<p className="text-[0.78rem] text-gray-400 leading-snug">
							High-res, print-ready. Includes a version with the {badgeName}{" "}
							logo in the centre.
						</p>
					</div>
				</div>
			</div>

			{/* Centralized Action Buttons Layout */}
			<div className="flex gap-3 justify-center items-center w-full mt-auto">
				{/* Un-comment Preview if needed; the distribution is setup perfectly for both scenarios */}
				{/* <Button variant="outline" className="flex-1 max-w-[180px] h-10 rounded-full text-[0.8125rem] font-semibold">
                    Preview
                </Button> */}
				<Button
					variant="dark"
					onClick={handleDownload}
					disabled={isDownloading}
					className="flex-1 max-w-50 h-10 rounded-full text-[0.8125rem] font-semibold shadow-sm"
				>
					{isDownloading ? "Downloading..." : "Download"}
				</Button>
			</div>
		</div>
	);
}

// Icon components stay the same ...
function LinkedInIcon() {
	return (
		<svg
			width="17"
			height="17"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
			<circle cx="4" cy="4" r="2" />
		</svg>
	);
}
function XIcon() {
	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.264 5.633 5.9-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}
function WhatsAppIcon() {
	return (
		<svg
			width="17"
			height="17"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
		</svg>
	);
}
function EmailIcon() {
	return (
		<svg
			width="17"
			height="17"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<polyline
				points="22,6 12,13 2,6"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}
function SlackIcon() {
	return (
		<svg
			width="17"
			height="17"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
		</svg>
	);
}
