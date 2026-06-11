"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import ParticipantForm from "./participant-form";
import BadgeReady from "./badge-ready";
import { LivePreview } from "@/app/(dashboard)/components/customize/LivePreview";
import { getPublicParticipantPage } from "@/app/features/templates/services/templates";
import { getBadgeCaptureBackground } from "@/app/features/templates/components/badge-preview/utils";
import { parseCanvasDataToEditorState } from "@/app/features/templates/lib/parse-canvas-data";

export default function ParticipantPovClient() {
	const [isBadgeReady, setIsBadgeReady] = useState(false);
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
		isError,
	} = useQuery({
		queryKey: ["public-participant", slug],
		queryFn: () => getPublicParticipantPage(slug!),
		enabled: Boolean(slug),
	});

	const baseEditorState = useMemo(() => {
		const d = badgeResponse?.data;
		if (!d?.canvas_data) return null;
		return parseCanvasDataToEditorState("", d.canvas_data, {
			title: d.title,
			default_caption: d.default_caption ?? "",
			hashtags: d.hashtags ?? [],
			logo_url: d.logo_url,
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
		if (!badgeRef.current || !editorState) return null;
		try {
			const { toBlob } = await import("html-to-image");
			const blob = await toBlob(badgeRef.current, {
				pixelRatio: 2,
				backgroundColor: getBadgeCaptureBackground(editorState),
			});
			if (!blob) return null;
			return new File([blob], `${participantName || "badge"}.png`, {
				type: "image/png",
			});
		} catch {
			return null;
		}
	}, [editorState, participantName]);

	const handleDownload = useCallback(async () => {
		const file = await getBadgeFile();
		if (!file) return;
		const url = URL.createObjectURL(file);
		const link = document.createElement("a");
		link.download = file.name;
		link.href = url;
		document.body.appendChild(link);
		link.click();
		link.remove();
		setTimeout(() => URL.revokeObjectURL(url), 0);
	}, [getBadgeFile]);

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
				{isBadgeReady ? (
					<BadgeReady
						onDownload={handleDownload}
						defaultCaption={
							participantCaption || baseEditorState?.defaultCaption
						}
					/>
				) : (
					<ParticipantForm
						onSuccess={() => setIsBadgeReady(true)}
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
			</div>
		</div>
	);
}
