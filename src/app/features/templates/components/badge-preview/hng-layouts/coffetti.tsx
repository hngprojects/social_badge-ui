import { HNG_ASSETS } from "../constants";

export function Coffetti() {
	return (
		<div className="z-1 absolute w-full h-1/2 top-0 overflow-hidden pointer-events-none">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={HNG_ASSETS.decorations.confetti}
				width={100}
				height={100}
				alt="badge logo"
				className="w-[200%] rotate-15"
			/>
		</div>
	);
}
