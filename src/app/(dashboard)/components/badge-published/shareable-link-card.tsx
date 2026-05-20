"use client";
import { useState } from "react";
import CopyIcon from "../../badges/published/icons/copy-icon";
import Link from "next/link";
import ArrowUp from "../../badges/published/icons/arrow-up";
import GradientBgSm, { GradientBgLg } from "../../badges/published/icons/gradient-bg";

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
		<div className="bg-[#1a1a1a] relative overflow-hidden rounded-2xl p-6 md:pt-[38px] md:pb-7 md:px-8 mb-9 md:h-[163px] flex justify-between flex-col md:flex-row">

			<div className="absolute inset-0 pointer-events-none">
								<div className="absolute top-0 right-0 hidden md:block">
					<GradientBgLg />
				</div>
				<div className="absolute top-0 right-0 md:hidden">
					<GradientBgSm />
				</div>


			</div>			<div>
				<div className="inline-flex h-5 items-center gap-1.5 bg-[#2a2a2a] border border-[#333] rounded-full px-2.5 py-2 mb-3">
					<span className="relative w-[5px] h-[5px] flex-shrink-0" aria-hidden="true">
						<span className="absolute inset-0 rounded-full bg-[#4ADE80] opacity-40 scale-[2.2]" />
						<span className="absolute inset-0 rounded-full bg-[#4ADE80]" />
					</span>
					<span className="text-[0.7rem] font-semibold uppercase tracking-widest text-neutral-400">
						Your shareable link
					</span>
				</div>

				{/* URL */}
				<p className="font-mono text-2xl font-semibold mb-1.5 tracking-tight">
					<span className="text-white/70">{url.substring(0, url.lastIndexOf('/') + 1)}</span>
					<span className="text-white">{url.substring(url.lastIndexOf('/') + 1)}</span>
				</p>

				{/* Meta */}
				<p className="text-[0.8125rem] text-neutral-500 mb-6">
					Works on any device · No login required · Updates instantly when you
					edit
				</p>
			</div>

			{/* Actions */}
			<div className="flex flex-col gap-2.5 md:w-[130px] md:items-center md:justify-center">
				<button
					onClick={handleCopy}
					className="w-full flex justify-center md:inline-flex items-center gap-2 h-10 bg-[#e8511a] hover:bg-[#d44816] text-white rounded-full text-sm font-semibold transition-colors cursor-pointer"
					aria-label="Copy link to clipboard"
				>
					<CopyIcon />
					{copied ? "Copied!" : "Copy link"}
				</button>

				<Link
					href={fullUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="w-full flex justify-center md:inline-flex items-center gap-2 h-10 bg-transparent border border-[#404040] hover:border-[#555] text-white rounded-full text-sm font-semibold transition-colors"
					aria-label="Open badge link in new tab"
				>
					<ArrowUp />
					Open link
				</Link>

			</div>
		</div>
	);
}

