"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

// ── Shared easing ──────────────────────────────────────────────────────────────
const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

// ── Header: stagger children in from the left (contact-hero pattern) ───────────
const headerContainerVariants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.13, delayChildren: 0.05 },
	},
};

const headerItemVariants = {
	hidden: { opacity: 0, x: -60 },
	show: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.85, ease: EASE },
	},
};

// ── TOC: stagger children up from bottom on scroll (FAQ pattern) ───────────────
const tocContainerVariants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.1, delayChildren: 0.05 },
	},
};

const tocItemVariants = {
	hidden: { opacity: 0, y: 28 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: EASE },
	},
};

interface LegalLayoutProps {
	title: string;
	titleHighlight: string;
	date: string;
	dateLabel?: string;
	summary: React.ReactNode;
	toc?: Array<{ id: string; title: string }>;
	children: React.ReactNode;
}

export default function LegalLayout({
	title,
	titleHighlight,
	date,
	dateLabel = "Effective",
	summary,
	toc,
	children,
}: LegalLayoutProps) {
	const shouldReduceMotion = useReducedMotion();

	function handleTocClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
		const el = document.getElementById(id);
		if (el) {
			// Element found — take over navigation for smooth scroll + hash update
			e.preventDefault();
			el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
			// Update URL hash so browser history and bookmarks work correctly
			history.pushState(null, "", `#${id}`);
		}
		// Element not found — let native anchor navigation proceed as fallback
	}

	return (
		<div className="bg-background">
			{/* ── Hero Header ── */}
			<section className="bg-[#F9F9F9] dark:bg-background">
				<div className="max-w-360 mx-auto px-4 md:px-10 lg:px-30 overflow-hidden relative md:py-18">
					<Image
						src="/assets/landing-page/logo-float-low-bg.svg"
						alt=""
						width={400}
						height={400}
						priority
						className="absolute w-auto h-auto -my-4 scale-[1.1] top-8 -left-10.5 lg:-top-2.5 lg:-left-9.5 opacity-60 pointer-events-none select-none"
					/>
					<Image
						src="/assets/landing-page/landing-logo-bgg.svg"
						alt=""
						width={400}
						height={400}
						priority
						className="absolute -right-45 w-auto h-auto bottom-10 rotate-13 scale-[1.1] lg:rotate-[-15deg] lg:-bottom-57.5 lg:-right-35 opacity-60 pointer-events-none select-none"
					/>

					{/* Title + date stagger from left — fires on mount (above the fold) */}
					<motion.div
						className="relative pt-10 pb-16 md:pt-0 md:pb-0 flex flex-col items-center md:items-start text-center md:text-left"
						variants={headerContainerVariants}
						initial={shouldReduceMotion ? "show" : "hidden"}
						animate="show"
					>
						<motion.h1
							variants={headerItemVariants}
							className="text-[clamp(32px,6vw,75px)] font-semibold tracking-[-0.65px] leading-tight text-foreground flex flex-col"
						>
							<span>{title}</span>
							<span className="font-fraunces text-primary italic">
								{titleHighlight}
							</span>
						</motion.h1>

						<motion.p
							variants={headerItemVariants}
							className="mt-4 text-sm md:text-[15px] font-medium text-muted-foreground"
						>
							{dateLabel}: {date}
						</motion.p>
					</motion.div>
				</div>
			</section>

			{/* ── Main Content ── */}
			<section className="mx-auto max-w-360 px-4 md:px-10 lg:px-30 py-12 lg:py-20">
				<div className={`flex flex-col gap-12 lg:gap-24 ${toc && toc.length > 0 ? 'lg:flex-row' : 'justify-center'}`}>
					{/* ── Table of Contents — slide up on scroll, stagger per item (FAQ style) ── */}
					{toc && toc.length > 0 && (
						<aside className="hidden lg:block w-64 shrink-0">
							<motion.div
								className="sticky top-32 flex flex-col gap-6"
								variants={tocContainerVariants}
								initial={shouldReduceMotion ? "show" : "hidden"}
								whileInView="show"
								viewport={{ once: true, amount: 0.3 }}
							>
								<motion.h3
									variants={tocItemVariants}
									className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
								>
									CONTENTS
								</motion.h3>

								<ul className="flex flex-col gap-4 text-sm text-muted-foreground">
									{toc.map((item) => (
										<motion.li key={item.id} variants={tocItemVariants}>
											<a
												href={`#${item.id}`}
												onClick={(e) => handleTocClick(e, item.id)}
												className="hover:text-foreground transition-colors duration-200"
											>
												{item.title}
											</a>
										</motion.li>
									))}
								</ul>
							</motion.div>
						</aside>
					)}

					{/* ── Content Area ── */}
					<div className={`flex-1 max-w-3xl flex flex-col gap-12 ${!toc || toc.length === 0 ? 'mx-auto' : ''}`}>
						{/* Summary box */}
						<div className="rounded-r-lg border-l-4 border-primary bg-secondary p-6 text-sm text-secondary-foreground">
							{summary}
						</div>

						{/* Policy sections */}
						<div className="text-sm md:text-[15px] leading-relaxed text-muted-foreground flex flex-col gap-4 pb-12 [&>section:not(:first-child)]:border-t [&>section:not(:first-child)]:border-border [&>section:not(:first-child)]:pt-7">
							{children}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
