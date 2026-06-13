"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import ParticipantForm from "./participant-form";
import BadgeReady from "./badge-ready";
import PasscodeGate from "./passcode-gate";
import { LivePreview } from "@/app/(dashboard)/components/customize/LivePreview";
import { getPublicParticipantPage } from "@/app/features/templates/services/templates";
import { getBadgeCaptureBackground } from "@/app/features/templates/components/badge-preview/utils";
import { parseCanvasDataToEditorState } from "@/app/features/templates/lib/parse-canvas-data";

export default function ParticipantPovClient() {
	const [isBadgeReady, setIsBadgeReady] = useState(false);
	const [accessCode, setAccessCode] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);
	const [participantName, setParticipantName] = useState("");
	const [participantRole, setParticipantRole] = useState("");
	const [participantPhotoUrl, setParticipantPhotoUrl] = useState<string | null>(
		null,
	);
	const [participantCaption, setParticipantCaption] = useState("");
	const badgeRef = useRef<HTMLDivElement>(null);
	const searchParams = useSearchParams();
	const slug = searchParams.get("slug");

	const {
		data: badgeResponse,
		isLoading,
		error,
		isError,
	} = useQuery({
		queryKey: ["public-participant", slug, accessCode],
		queryFn: () => getPublicParticipantPage(slug!, accessCode),
		enabled: Boolean(slug),
		retry: (failureCount, error: any) => {
			if (error?.response?.status === 401) return false;
			return failureCount < 3;
		},
	});

	const baseEditorState = useMemo(() => {
		const d = badgeResponse?.data;
		if (!d?.canvas_data) return null;
		return parseCanvasDataToEditorState("", d.canvas_data, {
			title: d.title,
			default_caption: d.default_caption ?? "",
			hashtags: d.hashtags ?? [],
			logo_url: d.logo_url,
			access_type: d.access_type,
		});
	}, [badgeResponse]);

	const editorState = useMemo(() => {
		if (!baseEditorState) return null;
		const isHng = baseEditorState.layoutId.startsWith("hng_finalist_");
		const state = {
			...baseEditorState,
			// Pass the actual values being typed to the editor state properties
			// used by CustomTemplatePreview
			participantNamePlaceholder:
				participantName || baseEditorState.participantNamePlaceholder,
			roleTitlePlaceholder:
				!isHng ? (participantRole || baseEditorState.roleTitlePlaceholder) : baseEditorState.roleTitlePlaceholder,
			trackPlaceholder:
				isHng ? (participantRole || baseEditorState.trackPlaceholder) : baseEditorState.trackPlaceholder,
		};
		return state;
	}, [baseEditorState, participantName, participantRole]);

	const getBadgeFile = useCallback(async (): Promise<File | null> => {
		if (!badgeRef.current || !editorState) {
			console.error("Badge capture failed: Missing badgeRef or editorState");
			return null;
		}
		
		const originalStyles = new Map<HTMLElement, string>();
		const objectUrls: string[] = [];

		try {
			const { toPng } = await import("html-to-image");

			// 1. Pre-fetch all CSS background-image URLs inside the node as blobs
			// CSS backgrounds are often missed by serialization libraries, so we inline them manually.
			const elementsWithBg = Array.from(
				badgeRef.current.querySelectorAll("*"),
			).filter((el) => {
				const style = window.getComputedStyle(el);
				const bg = style.backgroundImage;
				return bg && bg !== "none" && bg.startsWith("url(");
			}) as HTMLElement[];

			for (const el of elementsWithBg) {
				const style = window.getComputedStyle(el);
				const bg = style.backgroundImage;
				const urlMatch = bg.match(/url\((['"]?)(.*?)\1\)/);
				if (urlMatch && urlMatch[2]) {
					const url = urlMatch[2];
					if (url.startsWith("data:") || url.startsWith("blob:")) continue;

					try {
						const response = await fetch(url, { cache: "no-cache" });
						if (!response.ok) throw new Error(`HTTP ${response.status}`);
						const blob = await response.blob();
						const objectUrl = URL.createObjectURL(blob);
						originalStyles.set(el, el.style.backgroundImage);
						el.style.backgroundImage = `url("${objectUrl}")`;
						objectUrls.push(objectUrl);
					} catch (err) {
						console.warn("Could not pre-fetch background image, continuing with original:", url, err);
					}
				}
			}

			// 2. Ensure all <img> (including data URLs and Cloudinary URLs) are fully decoded and pixel-ready.
			// This covers the decode lag for both base64 uploads and remote assets.
			await Promise.all(
				Array.from(badgeRef.current.querySelectorAll("img")).map((img) =>
					img.decode().catch((err) => {
						console.warn("Image decode failed for:", img.src, err);
						return Promise.resolve();
					}),
				),
			);

			// 3. Capture the badge as PNG data URL
			const dataUrl = await toPng(badgeRef.current, {
				pixelRatio: 2,
				backgroundColor: getBadgeCaptureBackground(editorState),
				cacheBust: true,
				imagePlaceholder: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
			});

			if (!dataUrl) {
				throw new Error("html-to-image returned empty dataUrl");
			}

			// 4. Convert dataUrl to Blob
			const res = await fetch(dataUrl);
			const blob = await res.blob();

			if (!blob) throw new Error("Failed to convert dataUrl to blob");

			return new File([blob], `${participantName || "badge"}.png`, {
				type: "image/png",
			});
		} catch (error) {
			const err = error as Error;
			console.error("Badge capture error detail:", {
				message: err?.message,
				name: err?.name,
				stack: err?.stack,
				error: error
			});
			return null;
		} finally {
			// 5. Cleanup: Restore original styles and revoke object URLs
			originalStyles.forEach((bg, el) => {
				el.style.backgroundImage = bg;
			});
			objectUrls.forEach((url) => URL.revokeObjectURL(url));
		}
	}, [editorState, participantName]);

	const handleDownload = useCallback(async () => {
		const file = await getBadgeFile();
		if (!file) return false;
		try {
			const url = URL.createObjectURL(file);
			const link = document.createElement("a");
			link.download = file.name;
			link.href = url;
			document.body.appendChild(link);
			link.click();
			link.remove();
			setTimeout(() => URL.revokeObjectURL(url), 100);
			return true;
		} catch (err) {
			console.error("Link download failed:", err);
			return false;
		}
	}, [getBadgeFile]);

	const isUnauthorized = (error as any)?.response?.status === 401;
	const showGate = isUnauthorized;

	if (isLoading && !badgeResponse) {
		return (
			<div className="relative min-h-screen bg-primary-50 flex flex-col items-center justify-center overflow-hidden">
				<div className="flex items-center justify-center gap-2 p-6">
					<span className="h-3 w-3 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.3s]" />
					<span className="h-3 w-3 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.15s]" />
					<span className="h-3 w-3 animate-bounce rounded-full bg-primary-500" />
				</div>
			</div>
		);
	}

	return (
		<div className="relative min-h-screen bg-primary-50 flex flex-col items-center justify-center py-28 lg:py-0 overflow-hidden">
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
			<header className="absolute top-8 left-8 z-10 w-full max-w-7xl mb-21 md:mb-24">
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
						className="w-6 h-6 transition-transform duration-200 group-hover:scale-105"
					/>
					<span className="text-xl md:text-xl font-semibold tracking-tight text-[#121217]">
						Flare Tag
					</span>
				</Link>
			</header>

			{/* Main section */}
			<div className="flex flex-col-reverse lg:flex-row w-full max-w-6xl mx-auto items-center justify-center lg:justify-between gap-10 px-4 lg:px-8 relative z-10 min-w-0">
				{showGate ? (
					<div className="w-full flex justify-center py-12">
						<PasscodeGate slug={slug!} onSuccess={(code) => setAccessCode(code)} />
					</div>
				) : (
					<>
						{isBadgeReady ? (
							<BadgeReady
								onDownload={handleDownload}
								isGenerating={isGenerating}
								defaultCaption={
									participantCaption || baseEditorState?.defaultCaption
								}
							/>
						) : (
							<ParticipantForm
								onSuccess={() => setIsBadgeReady(true)}
								onGenerating={setIsGenerating}
								onNameChange={setParticipantName}
								onRoleChange={setParticipantRole}
								onPhotoChange={setParticipantPhotoUrl}
								onCaptionChange={setParticipantCaption}
								editorState={editorState}
							/>
						)}

						{/* Badge preview */}
						<div className="w-full max-w-135 shrink-0 min-w-0">
							{!slug ? (
								<div className="flex items-center justify-center bg-primary-300 w-full h-125 lg:h-155 rounded-3xl">
									<p className="text-sm text-gray-500">No badge link provided.</p>
								</div>
							) : isLoading ? (
								<div className="bg-primary-300 w-full h-125 lg:h-155 rounded-3xl animate-pulse" />
							) : isError ? (
								<div className="flex items-center justify-center bg-primary-300 w-full h-125 lg:h-155 rounded-3xl">
									<p className="text-sm text-gray-500">
										Failed to load badge. Please try again.
									</p>
								</div>
							) : editorState ? (
								<LivePreview
									editor={editorState}
									participantPhotoUrl={participantPhotoUrl}
									badgeRef={badgeRef}
									hideExtras
									badgeClassName="w-full max-w-110 h-140"
								/>
							) : (
								<div
									aria-hidden="true"
									className="preview-section bg-primary-300 w-full max-w-135 h-125 lg:h-155 rounded-3xl"
								/>
							)}
						</div>
					) : isLoading ? (
						<div className="bg-primary-300 w-full h-125 lg:h-155 rounded-3xl animate-pulse" />
					) : isError ? (
						<div className="flex items-center justify-center bg-primary-300 w-full h-125 lg:h-155 rounded-3xl">
							<p className="text-sm text-gray-500">
								Failed to load badge. Please try again.
							</p>
						</div>
					) : editorState ? (
						<div className="relative">
							<LivePreview
								editor={editorState}
								participantPhotoUrl={participantPhotoUrl}
								badgeRef={badgeRef}
								hideExtras
								badgeClassName="w-full max-w-110 h-140"
							/>
							{isGenerating && (
								<div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] rounded-3xl flex items-center justify-center z-20">
									<div className="flex flex-col items-center gap-3">
										<div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
										<p className="text-white font-medium">
											Generating your badge...
										</p>
									</div>
								</div>
							)}
						</div>
					) : (
						<div
							aria-hidden="true"
							className="preview-section bg-primary-300 w-full max-w-135 h-125 lg:h-155 rounded-3xl"
						/>
					)}
				</div>
			</div>
		</div>
	);
}
