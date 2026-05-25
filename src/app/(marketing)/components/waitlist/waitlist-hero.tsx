"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { items } from "@/app/(marketing)/constants/waitlist";

import { useSubscribe } from "@/app/(marketing)/hooks/newsletter";

export default function WaitlistHero() {
	const [email, setEmail] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const router = useRouter();
	const { subscribeToNewsletter, isLoading: isSubmitting } = useSubscribe();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return;

		subscribeToNewsletter(
			{ email },
			{
				onSuccess: () => {
					setEmail("");
					router.push("/waitlist/success?from=waitlist");
				},
			},
		);
	};

	return (
		<div className="relative min-h-screen w-full bg-[#F9F9F9] overflow-hidden flex flex-col items-center pt-3  md:pt-8 ">
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
			<header className="relative top-8 left-8 z-10 w-full max-w-7xl mb-21 md:mb-24">
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
						className="w-8 h-8 transition-transform duration-200 group-hover:scale-105"
					/>
					<span className="text-xl md:text-2xl font-semibold tracking-tight text-[#121217]">
						Flare Tag
					</span>
				</Link>
			</header>
			<div className="px-4">
				{/* Main Content */}
				<main className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full">
					<h1 className="text-[36px] sm:px-5 md:text-3xl md:text-[55px] lg:text-[55px] font-sans text-[#121217] leading-[1.2] md:leading-[1.1] tracking-tight mb-6">
						Create{" "}
						<span className="text-[#FA5424] underline decoration-2 underline-offset-4 md:underline-offset-8">
							Badges
						</span>{" "}
						People want to share,
						<br className="hidden md:block" /> Be the first to hear when we go{" "}
						<span className="text-[#FA5424] underline decoration-2 underline-offset-4 md:underline-offset-8">
							Live
						</span>
					</h1>

					<p className="text-base md:text-[18px] text-[#121217] max-w-[340px] md:max-w-xl mb-8 leading-relaxed px-4">
						Turn your attendees into promoters with personalized badges they can
						generate and post in seconds, Let your community do the marketing
						for you.
					</p>

					{/* Waitlist Form */}
					<form
						onSubmit={handleSubmit}
						className="flex flex-col md:flex-row w-full max-w-[372px] items-center gap-4 md:gap-1 bg-transparent md:bg-white md:border md:border-[#E5E5E5] md:rounded-full md:p-1 md:shadow-sm mb-16 md:focus-within:ring-2 md:focus-within:ring-[#FA5424]/20 transition-all mx-auto"
					>
						<label htmlFor="waitlist-email" className="sr-only">
							Email address
						</label>
						<Input
							type="email"
							id="waitlist-email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							placeholder={isFocused || email ? "" : "Enter your email"}
							required
							disabled={isSubmitting}
							className="w-full md:flex-1 border border-[#E5E5E5] md:border-none bg-white md:bg-transparent rounded-full focus-visible:ring-1 md:focus-visible:ring-0 px-4 md:px-6 py-6 md:py-2 text-sm md:text-[16px] text-[#0a0a0a] shadow-none h-12 md:h-auto"
						/>
						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full md:w-auto bg-[#FA5424] hover:bg-[#FA5424]/90 text-white rounded-full px-4 md:px-6 min-w-[120px] md:max-w-[163px] py-6 md:py-3 text-sm md:text-[16px] font-sans h-12 md:h-auto transition-all flex items-center justify-center gap-2"
						>
							{isSubmitting ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin" />
									<span>joining...</span>
								</>
							) : (
								"Join The Waitlist"
							)}
						</Button>
					</form>

					{/* Hero Demo Image */}
					<div className="w-full max-w-5xl mt-4 px-2 md:px-0">
						<Image
							src="/assets/waitlist/waitlist-hero-demo.svg"
							alt="Flare Tag Application Interface"
							width={1200}
							height={800}
							className="w-full h-auto drop-shadow-2xl rounded-lg md:rounded-none"
							priority
						/>
					</div>
				</main>
			</div>
			{/* Bottom strip */}
			<div className="w-full max-h-[121px] bg-[#2B2A2A] border-b border-gray-400 flex items-center justify-center px-2 py-8 md:px-10">
				<div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center text-center md:text-left">
					{items.map((item, index) => (
						<Fragment key={index}>
							<div
								className={cn(
									"flex flex-row lg:flex-col md:flex-row items-center gap-3 md:gap-4 px-4 md:px-8",
									index !== 0 && "hidden md:flex",
								)}
							>
								<Image
									src={item.icon}
									alt={item.title}
									width={40}
									height={40}
									className="md:w-[50px] md:h-[50px]"
								/>
								<h2 className="text-[#E5E7EB] text-base md:text-lg font-semibold">
									{item.title}
								</h2>
							</div>

							{/* divider - hidden on mobile */}
							{index !== items.length - 1 && (
								<div className="hidden md:block w-px h-12 bg-gray-400" />
							)}
						</Fragment>
					))}
				</div>
			</div>
		</div>
	);
}
