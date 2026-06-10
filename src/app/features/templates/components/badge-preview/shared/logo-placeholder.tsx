import PlaceholderLogo from "./placeholder-logo";

export function LogoPlaceholder({
	isHidden,
	className,
	logoPreviewUrl,
}: {
	isHidden: boolean;
	className?: string;
	logoPreviewUrl?: string | null;
}) {
	return (
		<div
			className={`flex gap-2 items-center justify-center text-white  ${className}`}
		>
			<div className="w-10 h-10 flex items-center justify-center overflow-hidden relative">
				{logoPreviewUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={logoPreviewUrl}
						alt="Logo"
						className="object-contain w-full h-full"
					/>
				) : (
					<PlaceholderLogo />
				)}
			</div>
			{!logoPreviewUrl && (
				<span
					className={`text-sm flex flex-col gap-0 ${isHidden ? "hidden" : "block"}`}
				>
					<span className="leading-none">YOUR</span>{" "}
					<span className="leading-none">LOGO</span>
				</span>
			)}
		</div>
	);
}
