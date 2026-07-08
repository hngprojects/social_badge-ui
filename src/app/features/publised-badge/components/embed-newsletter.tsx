'use client'
import { useState } from "react";
import CodeIcon from "../icons/code";
import CopyIcon from "../icons/copy-icon";

interface EmbedNewsletterProps {
	fullUrl: string;
	imageUrl: string;
}

export default function EmbedNewsletter({ fullUrl, imageUrl }: EmbedNewsletterProps) {
	const [copied, setCopied] = useState(false);

	const rawEmbedCode = `<a href="${fullUrl}">\n  <img src="${imageUrl}"/>\n</a>`;

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(rawEmbedCode);
		} catch {
			console.error("Copy failed");
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="mb-10 min-w-0 rounded-2xl border border-[#ECE9E4] bg-white p-4 sm:p-6">
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
			<div className="mb-4 flex h-20 max-w-full items-center overflow-x-auto rounded-xl bg-[#1a1a1a] p-3">
				<pre className="font-mono text-[0.8125rem] leading-relaxed whitespace-pre">
					<span className="text-[#FF8B5C]">{`<a`}</span>
					<span className="text-[#C2EAD3]">{` href="`}</span>
					<span className="text-[#FFD89B]">{fullUrl}</span>
					<span className="text-[#FF8B5C]">{`">`}</span>
					{`\n  `}
					<span className="text-[#FF8B5C]">{`<img`}</span>
					<span className="text-[#C2EAD3]">{` src="`}</span>
					<span className="text-[#FFD89B]">{imageUrl}</span>
					<span className="text-[#FF8B5C]">{`"/>`}</span>
					{`\n`}
					<span className="text-[#FF8B5C]">{`</a>`}</span>
				</pre>
			</div>

			<div className="flex justify-stretch sm:justify-end">
				<button
					onClick={handleCopy}
					className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1a1a1a] px-4 py-2 text-[0.8125rem] font-semibold text-white transition-colors hover:bg-[#2a2a2a] sm:w-auto"
					aria-label="Copy embed code"
				>
					<CopyIcon />
					{copied ? "Copied!" : "Copy code"}
				</button>
			</div>
		</div>
	);
}
