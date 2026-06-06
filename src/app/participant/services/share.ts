import { toast } from "sonner";
import { SharePlatform } from "../types";
const encode = (text: string) => encodeURIComponent(text);

export const shareService = {
  async share(platform: SharePlatform, caption: string) {
    const text = caption || "";
    const encodedText = encode(text);
    const resolvedUrl = window.location.href;
    const encodedUrl = encode(resolvedUrl);

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
        window.open(
          `https://wa.me/?text=${encodedText}`,
          "_blank",
          "noopener,noreferrer",
        );
        break;

      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
          "_blank",
          "noopener,noreferrer",
        );
        break;

      case "x":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodedText}`,
          "_blank",
          "noopener,noreferrer",
        );
        break;

      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "_blank",
          "noopener,noreferrer",
        );
        break;

      default:
        console.warn("Unsupported platform");
    }
  },
};
