import { getSafeImageUrl } from "../utils";

interface ParticipantPhotoProps {
	url?: string | null;
	alt?: string;
	className?: string;
}

/** Native img is required for html-to-image badge export compatibility. */
export function ParticipantPhoto({
	url,
	alt = "Participant",
	className,
}: ParticipantPhotoProps) {
	const safeUrl = getSafeImageUrl(url);
	if (!safeUrl) return null;

	return (
		// eslint-disable-next-line @next/next/no-img-element -- html-to-image requires native <img>
		<img src={safeUrl} alt={alt} className={className} />
	);
}
