import React from 'react'

export default function GreenDot() {
  return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="11"
			height="11"
			fill="none"
			viewBox="0 0 11 11"
		>
			<g filter="url(#a)">
				<rect
					width="5"
					height="5"
					x="3"
					y="3"
					fill="#fff"
					fillOpacity=".01"
					rx="2.5"
					shape-rendering="crispEdges"
				/>
			</g>
			<defs>
				<filter
					id="a"
					width="11"
					height="11"
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
						radius="3"
						result="effect1_dropShadow_9008_9744"
					/>
					<feOffset />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix values="0 0 0 0 0.290196 0 0 0 0 0.870588 0 0 0 0 0.501961 0 0 0 0.2 0" />
					<feBlend
						in2="BackgroundImageFix"
						result="effect1_dropShadow_9008_9744"
					/>
					<feBlend
						in="SourceGraphic"
						in2="effect1_dropShadow_9008_9744"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	);
}
