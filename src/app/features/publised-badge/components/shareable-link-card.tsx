"use client";
import { useState } from "react";
import CopyIcon from "../icons/copy-icon";
import Link from "next/link";
import ArrowUp from "../icons/arrow-up";
import GradientBgSm, { GradientBgLg } from "../icons/gradient-bg";
import { Lock } from "lucide-react";

interface ShareableLinkCardProps {
	url: string;
	fullUrl: string;
	access_code?: string | null;
}

export default function ShareableLinkCard({
	url,
	fullUrl,
	access_code,
}: ShareableLinkCardProps) {
	const [copied, setCopied] = useState(false);
	const [codeCopied, setCodeCopied] = useState(false);

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

	const handleCopyCode = async () => {
		if (!access_code) return;
		try {
			await navigator.clipboard.writeText(access_code);
		} catch {
			const el = document.createElement("textarea");
			el.value = access_code;
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);
		}
		setCodeCopied(true);
		setTimeout(() => setCodeCopied(false), 2000);
	};

	return (
		<div className="bg-[#1a1a1a] relative overflow-hidden rounded-2xl p-4 sm:p-6 md:pt-[38px] md:pb-7 md:px-8 mb-9 md:min-h-[163px] flex justify-between flex-col md:flex-row max-w-full min-w-0">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 right-0 hidden md:block h-full">
					<GradientBgLg />
				</div>
				<div className="absolute top-0 right-0 md:hidden">
					<GradientBgSm />
				</div>
			</div>

			<div className="relative min-w-0 flex-1">
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
				<p className="font-mono text-lg sm:text-2xl font-semibold mb-1.5 tracking-tight break-all max-w-full">
					<span className="text-white/70">{url.substring(0, url.lastIndexOf('/') + 1)}</span>
					<span className="text-white">{url.substring(url.lastIndexOf('/') + 1)}</span>
				</p>

				{/* Meta */}
				<p className="text-[0.8125rem] text-neutral-500 mb-6">
					Works on any device · No login required · Updates instantly when you
					edit
				</p>

				{/* Access Code Section */}
				{access_code && (
					<div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-4">
						<div className="flex items-center gap-2 text-neutral-400">
							<Lock size={14} className="shrink-0" />
							<span className="text-xs font-semibold uppercase tracking-wider">Access code:</span>
						</div>
						<button 
							onClick={handleCopyCode}
							className="group flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
						>
							<span className="font-mono text-white text-sm font-bold tracking-widest">{access_code}</span>
							<div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
								<CopyIcon 
									className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300" 
									stroke="currentColor"
								/>
								<span className="text-[10px] text-neutral-500 group-hover:text-neutral-300 font-bold uppercase">
									{codeCopied ? "Copied!" : "Copy"}
								</span>
							</div>
						</button>
					</div>
				)}
			</div>

			{/* Actions */}
			<div className="relative flex flex-col gap-2.5 md:w-[130px] md:shrink-0 md:items-center md:justify-center">
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
