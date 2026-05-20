'use client'
import { useState } from "react";

interface EmbedNewsletterProps {
	embedCode: string;
}

export default function EmbedNewsletter({ embedCode }: EmbedNewsletterProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(embedCode);
		} catch {
			console.error("Copy failed");
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-10">
			<div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mb-3.5">
				<CodeIcon />
			</div>
			<h3 className="text-[0.9375rem] font-bold text-gray-900 mb-1.5">
				Embed in newsletter
			</h3>
			<p className="text-[0.8375rem] text-gray-500 leading-relaxed mb-4">
				A button that drops cleanly into Substack, Mailchimp, or your site.
			</p>

			{/* Code block */}
			<div className="bg-[#1a1a1a] rounded-xl px-5 py-4 mb-4 overflow-x-auto">
				<pre className="font-mono text-[0.8125rem] text-gray-300 leading-relaxed whitespace-pre">
					<code>{embedCode}</code>
				</pre>
			</div>

			<div className="flex justify-end">
				<button
					onClick={handleCopy}
					className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-full text-[0.8125rem] font-semibold transition-colors cursor-pointer"
					aria-label="Copy embed code"
				>
					<CopyIcon />
					{copied ? "Copied!" : "Copy code"}
				</button>
			</div>
		</div>
	);
}

function CodeIcon() {
	return (
		<svg
			width="17"
			height="17"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<polyline
				points="16 18 22 12 16 6"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<polyline
				points="8 6 2 12 8 18"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function CopyIcon() {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<rect
				x="9"
				y="9"
				width="13"
				height="13"
				rx="2"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<path
				d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
				stroke="currentColor"
				strokeWidth="2"
			/>
		</svg>
	);
}
