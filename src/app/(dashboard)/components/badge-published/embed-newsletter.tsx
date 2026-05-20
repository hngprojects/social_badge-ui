'use client'
import { useState } from "react";
import CodeIcon from "../../badges/published/icons/code";
import CopyIcon from "../../badges/published/icons/copy-icon";

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
		<div className="bg-white border border-[#ECE9E4] rounded-2xl p-6 mb-10">
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


