import React from 'react'

export default function RoundCheck() {
  return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="116"
			height="116"
			fill="none"
			viewBox="0 0 116 116"
			className=""
		>
			<rect width="76" height="76" x="20" y="6" fill="#fff" rx="38" />
			<g filter="url(#a)">
				<rect
					width="76"
					height="76"
					x="20"
					y="6"
					fill="#fff"
					fillOpacity=".01"
					rx="38"
					shape-rendering="crispEdges"
				/>
			</g>
			<path
				stroke="#FF693E"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="4.75"
				d="M70.667 34.5 53.25 51.917 45.334 44"
			/>
			<defs>
				<filter
					id="a"
					width="116"
					height="116"
					x="0"
					y="0"
					color-interpolation-filters="sRGB"
					filterUnits="userSpaceOnUse"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						result="hardAlpha"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					/>
					<feMorphology
						in="SourceAlpha"
						operator="dilate"
						radius="6"
						result="effect1_dropShadow_9008_9731"
					/>
					<feOffset />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
					<feBlend
						in2="BackgroundImageFix"
						result="effect1_dropShadow_9008_9731"
					/>
					<feColorMatrix
						in="SourceAlpha"
						result="hardAlpha"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					/>
					<feMorphology
						in="SourceAlpha"
						radius="8"
						result="effect2_dropShadow_9008_9731"
					/>
					<feOffset dy="14" />
					<feGaussianBlur stdDeviation="14" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix values="0 0 0 0 1 0 0 0 0 0.411765 0 0 0 0 0.243137 0 0 0 0.4 0" />
					<feBlend
						in2="effect1_dropShadow_9008_9731"
						result="effect2_dropShadow_9008_9731"
					/>
					<feBlend
						in="SourceGraphic"
						in2="effect2_dropShadow_9008_9731"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	);
}
