import { SharePlatform } from "../types";
import { toast } from "sonner";

const encode = (text: string) => encodeURIComponent(text);

export const shareService = {
  async share(platform: SharePlatform, caption: string) {
    const text = caption || "";
    const encodedText = encode(text);

    switch (platform) {
      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${encodedText}`,
          "_blank",
          "noopener,noreferrer",
        );
        break;

      case "telegram":
        window.open(
          `https://t.me/share/url?url=&text=${encodedText}`,
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
        try {
          await navigator.clipboard.writeText(text);
          toast.success("Caption copied to clipboard! You can paste it on Facebook.");
          
          // Delay to allow the user to see the toast before opening the new tab
          await new Promise((resolve) => setTimeout(resolve, 1500));
        } catch (err) {
          console.error("Failed to copy text: ", err);
        }
        window.open(
          `https://www.facebook.com/`,
          "_blank",
          "noopener,noreferrer",
        );
        break;

      default:
        // best universal fallback (mobile)
        if (navigator.share) {
          try {
            await navigator.share({
              title: "Share Badge",
              text,
            });
            return;
          } catch (err) {
            console.log("Native share failed:", err);
          }
        } else {
          console.warn("Unsupported platform");
        }
    }
  },
};
