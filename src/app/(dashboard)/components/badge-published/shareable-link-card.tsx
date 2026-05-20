"use client";
import { useState } from "react";
import CopyIcon from "../../badges/published/icons/copy-icon";

interface ShareableLinkCardProps {
	url: string;
	fullUrl: string;
}

export default function ShareableLinkCard({
	url,
	fullUrl,
}: ShareableLinkCardProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(fullUrl);
		} catch {
			const el = document.createElement("textarea");
			el.value = fullUrl;
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="bg-[#1a1a1a] rounded-2xl px-8 py-7 mb-10">
			{/* Label pill */}
			<div className="inline-flex items-center gap-1.5 bg-[#2a2a2a] border border-[#333] rounded-full px-3 py-1 mb-3">
				<span
					className="w-[7px] h-[7px] rounded-full bg-green-400 flex-shrink-0"
					aria-hidden="true"
				/>
				<span className="text-[0.7rem] font-semibold uppercase tracking-widest text-neutral-400">
					Your shareable link
				</span>
			</div>

			{/* URL */}
			<p className="font-mono text-2xl font-semibold text-white mb-1.5 tracking-tight">
				{url}
			</p>

			{/* Meta */}
			<p className="text-[0.8125rem] text-neutral-500 mb-6">
				Works on any device · No login required · Updates instantly when you
				edit
			</p>

			{/* Actions */}
			<div className="flex gap-2.5 flex-wrap">
				<button
					onClick={handleCopy}
					className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e8511a] hover:bg-[#d44816] text-white rounded-full text-sm font-semibold transition-colors cursor-pointer"
					aria-label="Copy link to clipboard"
				>
					<CopyIcon />
					{copied ? "Copied!" : "Copy link"}
				</button>

				<a
					href={fullUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-[#404040] hover:border-[#555] text-white rounded-full text-sm font-semibold transition-colors"
					aria-label="Open badge link in new tab"
				>
					<ExternalLinkIcon />
					Open link
				</a>
			</div>
		</div>
	);
}

function ExternalLinkIcon() {
	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<polyline
				points="15 3 21 3 21 9"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<line
				x1="10"
				y1="14"
				x2="21"
				y2="3"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}
