import { CustomizeEditorState } from "@/app/features/templates/types/canvas-data";

function GradientDefs({ id, editor }: { id: string; editor?: CustomizeEditorState }) {
	if (!editor || editor.bgMode !== "gradient") return null;
	return (
		<defs>
			<linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor={editor.gradientColors[0]} />
				<stop offset="100%" stopColor={editor.gradientColors[1]} />
			</linearGradient>
		</defs>
	);
}

export function Template9({ className, editor, baseColor }: { className?: string; editor?: CustomizeEditorState; baseColor?: string }) {
	const fill = editor?.bgMode === "gradient" ? "url(#grad9)" : (editor?.solidColor || baseColor || "#6543A1");
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="480"
			height="640"
			fill="none"
			viewBox="0 0 480 640"
			className={className}
		>
			<GradientDefs id="grad9" editor={editor} />
			<g clipPath="url(#a)">
				<rect width="480" height="640" fill={fill} rx="32" />
				<path
					fill="#68C4B9"
					d="M-34 356c76.785 30.411 128.146 28.639 231.25 0L176 438c99.575-74.292 98.5-82 254-103l78 103v159c-118.468-22.568-197.188-5.004-350 57H-34V356Z"
				/>
				<path
					fill="#fff"
					d="M57 449.436c10.484 3.527 17.496 3.322 31.573 0l-2.901 9.511C99.267 450.33 99.12 449.436 120.35 447L131 458.947v18.442c-16.175-2.618-26.922-.581-47.786 6.611H57v-34.564Z"
				/>
				<path
					fill="#FF693E"
					d="M20 548.436c10.483 3.527 17.496 3.322 31.573 0l-2.901 9.511C62.267 549.33 62.12 548.436 83.35 546L94 557.947v18.442c-16.174-2.618-26.922-.581-47.786 6.611H20v-34.564Z"
				/>
			</g>
			<defs>
				<clipPath id="a">
					<rect width="480" height="640" fill="#fff" rx="32" />
				</clipPath>
			</defs>
		</svg>
	);
}

export function Template7({ className, editor, baseColor }: { className?: string; editor?: CustomizeEditorState; baseColor?: string }) {
	const fill = editor?.bgMode === "gradient" ? "url(#grad7)" : (editor?.solidColor || baseColor || "#1E1E1E");
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="480"
			height="640"
			fill="none"
			viewBox="0 0 480 640"
			className={className}
		>
			<GradientDefs id="grad7" editor={editor} />
			<rect width="480" height="640" fill={fill} rx="32" />
		</svg>
	);
}

export function Template1({ className, editor, baseColor }: { className?: string; editor?: CustomizeEditorState; baseColor?: string }) {
	const fill = editor?.bgMode === "gradient" ? "url(#grad1)" : (editor?.solidColor || baseColor || "#E8CAD4");
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="480"
			height="640"
			fill="none"
			viewBox="0 0 480 640"
			className={className}
		>
			<GradientDefs id="grad1" editor={editor} />
			<g clipPath="url(#a)">
				<rect width="480" height="640" fill={fill} rx="32" />
				<path
					stroke="#E61B62"
					strokeLinecap="round"
					strokeWidth="59"
					d="M479.941 16c-4.377 0-16.634 2.5-33.041 7.071-8.904 3.633-14.294 7.431-18.869 11.84-1.762 2.222-2.387 4.41-3.031 6.665m19.999 79c4.376 0 16.634-2.501 33.04-7.071 8.904-3.633 14.294-7.431 18.869-11.841 1.762-2.221 2.387-4.41 3.031-6.664"
				/>
				<path
					stroke="#000"
					strokeLinecap="round"
					strokeWidth="5"
					d="M211.201 83.312c-8.267 0-13.936-.701-21.713 0-10.892.981-23.506 1.971-32.988 4.188-17.367 4.06-47.5 11.5-64 23-41.583 28.98-49.794 47.534-40.258 99.395 4.55 24.739 35.537 40.583 45 46.105 5.46 3.186 11.248 9.982 39.248 9.982 10.718 0 40.011-1.865 69.951-21.941C246.351 217.279 253.363 166.711 218 128"
				/>
				<path
					fill="#000"
					d="M211.201 88.312a4.833 4.833 0 0 0 3.535-1.413 5.071 5.071 0 0 0 1.465-3.587c0-1.355-.527-2.65-1.465-3.588a4.833 4.833 0 0 0-3.535-1.412c-3.864.091-7.776-.027-11.906-.034-3.338-.006-6.799.123-10.215.504-11.001 1.26-22.168 2.2-33.457 4.965-22.042 5.88-44.799 11.455-64.514 24.758-14.012 10.389-28.59 21.574-36.848 37.696-8.295 16.211-6.924 34.822-4.212 51.859.648 4.002 1.377 7.85 2.193 11.835a285.497 285.497 0 0 1-1.698-11.904c-2.025-17.124-2.456-35.523 6.088-50.537 8.455-14.979 22.987-25.288 37.258-34.959 18.749-11.599 41.497-16.393 63.487-21.242 10.379-2.1 21.451-2.622 32.519-3.412 3.044-.21 6.067-.2 9.207-.065 3.87.166 7.957.46 12.098.536Z"
				/>
				<g clipPath="url(#b)">
					<path fill="#E0074E" d="M0 527h480v124H0z" />
					<path
						stroke="#E8CAD4"
						strokeLinecap="round"
						strokeWidth="59"
						d="M-27.001 616.576c4.376 0 16.634-2.501 33.04-7.071 8.904-3.633 14.294-7.431 18.87-11.841 1.761-2.221 2.386-4.409 3.03-6.664"
					/>
				</g>
			</g>
			<defs>
				<clipPath id="a">
					<rect width="480" height="640" fill="#fff" rx="32" />
				</clipPath>
				<clipPath id="b">
                    
					<path fill="#fff" d="M0 527h480v124H0z" />
				</clipPath>
			</defs>
		</svg>
	);
}

export function Template5({ className, editor, baseColor }: { className?: string; editor?: CustomizeEditorState; baseColor?: string }) {
	const fill = editor?.bgMode === "gradient" ? "url(#grad5)" : (editor?.solidColor || baseColor || "#8454E8");
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="480"
			height="640"
			fill="none"
			viewBox="0 0 480 640"
			className={className}
		>
			<GradientDefs id="grad5" editor={editor} />
			<rect width="480" height="640" fill={fill} rx="32" />
		</svg>
	);
}

export function Template4({ className, editor, baseColor }: { className?: string; editor?: CustomizeEditorState; baseColor?: string }) {
	const fill = editor?.bgMode === "gradient" ? "url(#grad4)" : (editor?.solidColor || baseColor || "#222");
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="480"
			height="640"
			fill="none"
			viewBox="0 0 480 640"
			className={className}
		>
			<GradientDefs id="grad4" editor={editor} />
			<rect width="480" height="640" fill={fill} rx="32" />
			<path fill="#CAC9C7" d="M0 492h480v148H0z" />
		</svg>
	);
}

export function Template3({ className, editor, baseColor }: { className?: string; editor?: CustomizeEditorState; baseColor?: string }) {
	const fill = editor?.bgMode === "gradient" ? "url(#grad3)" : (editor?.solidColor || baseColor || "#fff");
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="480"
			height="640"
			fill="none"
			viewBox="0 0 480 640"
			className={className}
		>
			<GradientDefs id="grad3" editor={editor} />
			<rect width="480" height="640" fill={fill} rx="32" />
		</svg>
	);
}

export function Template4Left({ className }: { className?: string }) {
	return <svg width="200" height="230" viewBox="0 0 200 339" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} />;
}

export function Template4Right({ className }: { className?: string }) {
	return <svg width="196" height="230" viewBox="0 0 196 339" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} />;
}
