import OrangeCheck from "../icons/orange-check";

interface LiveHeroBannerProps {
  badgeName: string;
  publishedAt?: string | null;
}

function formatPublishedDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export default function LiveHeroBanner({
  badgeName,
  publishedAt,
}: LiveHeroBannerProps) {
  const publishedLabel = publishedAt ? formatPublishedDate(publishedAt) : null;

	return (
		<div
			className="mb-4.5 flex min-h-72 w-full min-w-0 flex-col items-center justify-center rounded-2xl px-4 py-10 text-center sm:px-8 sm:py-14"
			style={{
				background:
					"linear-gradient(135deg, #FFEDE0 0%, #FED4CC 50%, #FF8D6D 100%)",
			}}
		>
			{" "}
<span className="relative flex-shrink-0 flex items-center justify-center mb-5">
  <span className="absolute w-12 h-12 rounded-full bg-white opacity-20 scale-[1.3]" />
  <span className="w-12 h-12 rounded-full bg-white flex justify-center items-center"><OrangeCheck/></span>
</span>
			<h1 className="mb-3 max-w-full text-[30px] font-[700] leading-tight text-[#6B2C1A] sm:text-[38px]">
				Your badge is{" "}
				<em className="italic text-primary-500 font-bold font-fraunces">live.</em>
			</h1>
			<p className="max-w-md text-[0.875rem] leading-relaxed text-[#6B2C1A] sm:text-[0.9375rem]">
				<strong className="font-semibold">{badgeName}</strong> is ready to share —
				registration emails, social posts, attendee Slack channels. Every claim adds
				to your reach.
				{publishedLabel ? (
					<span className="mt-2 block text-[0.8125rem] text-[#6B2C1A]/80">
						Published {publishedLabel}
					</span>
				) : null}
			</p>
		</div>
	);
}
