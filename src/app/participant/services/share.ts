export type SharePlatform =
	| "x"
	| "whatsapp"
	| "telegram"
	| "facebook"
	| "linkedin"
	| "instagram";

const encode = (text: string) => encodeURIComponent(text);

export const shareService = {
	async share(platform: SharePlatform, caption: string) {
		const text = caption || "";
		const encodedText = encode(text);

		// best universal fallback (mobile)
		if (navigator.share) {
			try {
				await navigator.share({
					text,
				});
				return;
			} catch (err) {
				console.log("Native share failed:", err);
			}
		}

		switch (platform) {
			case "whatsapp":
				window.open(`https://wa.me/?text=${encodedText}`, "_blank");
				break;

			case "telegram":
				window.open(`https://t.me/share/url?text=${encodedText}`, "_blank");
				break;

			case "x":
				window.open(
					`https://twitter.com/intent/tweet?text=${encodedText}`,
					"_blank",
				);
				break;

			case "facebook":
				window.open(
					`https://www.facebook.com/sharer/sharer.php?quote=${encodedText}`,
					"_blank",
				);
				break;

			case "linkedin":
				window.open(
					`https://www.linkedin.com/sharing/share-offsite/`,
					"_blank",
				);
				break;

			case "instagram":
				if (navigator.share) {
					await navigator.share({ text });
				} else {
					navigator.clipboard.writeText(text);
					alert("Caption copied. Paste it into Instagram.");
				}
				break;

			default:
				console.warn("Unsupported platform");
		}
	},
};
