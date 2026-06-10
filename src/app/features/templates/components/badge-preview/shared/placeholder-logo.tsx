import React from "react";

export default function PlaceholderLogo({ className = "" }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="64"
			height="64"
			viewBox="0 0 64 64"
			className={className}
			fill="currentColor"
		>
			<path d="m58.835 34.82-4.89 4.888a1 1 0 0 1-.695.292H42.83l-8-8 8-8h10.42a1 1 0 0 1 .705.293l4.89 4.887a4 4 0 0 1-.01 5.64ZM16.762 20H22a2 2 0 0 1 1.413.585L32 29.17l8.587-8.585A2 2 0 0 1 42 20h5.25a1 1 0 0 0 .708-1.707L34.833 5.165a4 4 0 0 0-5.64 0L16.054 18.293A1 1 0 0 0 16.762 20ZM47.25 44H42a2 2 0 0 1-1.413-.585L32 34.828l-8.587 8.587A2 2 0 0 1 22 44h-5.25a1 1 0 0 0-.707 1.708l13.125 13.127a4 4 0 0 0 5.64 0l13.124-13.127A1 1 0 0 0 47.25 44ZM29.185 32l-8-8H10.75a1 1 0 0 0-.705.293l-4.88 4.887a4 4 0 0 0 0 5.64l4.89 4.888a1 1 0 0 0 .695.292h10.42l8.015-8Z" />
		</svg>
	);
}
