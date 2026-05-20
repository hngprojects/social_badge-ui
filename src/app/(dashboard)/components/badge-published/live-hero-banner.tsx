import RoundCheck from "../../badges/published/icons/round-check";

interface LiveHeroBannerProps {
  badgeName: string;
}

export default function LiveHeroBanner({ badgeName }: LiveHeroBannerProps) {
  return (
		<div
			className="flex flex-col items-center border text-center h-72 rounded-2xl px-8 py-14 mb-5"
			style={{
				background:
					"linear-gradient(135deg, #FFEDE0 0%, #FED4CC 50%, #FF8D6D 100%)",
			}}
		>
			{" "}

				<RoundCheck/>
			<h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
				Your badge is{" "}
				<em className="not-italic italic text-[#e8511a] font-bold">live.</em>
			</h1>
			<p className="text-[0.9375rem] text-gray-600 max-w-md leading-relaxed">
				Share the link below anywhere — registration emails, social posts,
				attendee Slack channels. Every claim adds to your reach.
			</p>
		</div>
	);
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}