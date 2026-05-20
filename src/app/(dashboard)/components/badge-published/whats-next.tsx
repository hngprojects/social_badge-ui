'use client'
import { NextAction } from "../../types/badge-published/badge";

const NEXT_ACTIONS: NextAction[] = [
	{
		id: "preview",
		Icon: PreviewIcon,
		iconBg: "bg-orange-50",
		iconColor: "text-[#e8511a]",
		title: "Preview as an attendee",
		description:
			"See exactly what visitors will experience when they tap your link.",
		cta: "Open link",
		href: "#preview",
	},
	{
		id: "analytics",
		Icon: AnalyticsIcon,
		iconBg: "bg-orange-50",
		iconColor: "text-[#e8511a]",
		title: "Track engagement",
		description:
			"Claims, shares per platform, click-through to your destination — in real time.",
		cta: "Open link",
		href: "#analytics",
	},
	{
		id: "edit",
		Icon: EditIcon,
		iconBg: "bg-orange-50",
		iconColor: "text-[#e8511a]",
		title: "Edit this badge",
		description:
			"Changes go live immediately. Anyone with the link sees the updated design.",
		cta: "Open link",
		href: "#edit",
	},
];

export default function WhatsNext() {
	return (
		<section>
			<h2 className="text-[1.375rem] font-bold text-gray-900 mb-1">
				What&apos;s next
			</h2>
			<p className="text-sm text-gray-500 mb-5">
				Keep momentum going while your badge does its work.
			</p>

			<div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
				{NEXT_ACTIONS.map((action) => (
					<NextActionCard key={action.id} action={action} />
				))}
			</div>
		</section>
	);
}

function NextActionCard({ action }: { action: NextAction }) {
	return (
		<div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col">
			<div
				className={`w-9 h-9 rounded-lg ${action.iconBg} ${action.iconColor} flex items-center justify-center mb-3.5`}
			>
				<action.Icon />
			</div>
			<h3 className="text-[0.9rem] font-bold text-gray-900 mb-1.5">
				{action.title}
			</h3>
			<p className="text-[0.8125rem] text-gray-500 leading-relaxed mb-auto pb-4">
				{action.description}
			</p>
			<a
				href={action.href}
				className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-[#e8511a] hover:gap-2.5 transition-all"
				aria-label={`${action.cta} — ${action.title}`}
			>
				{action.cta}
				<ArrowIcon />
			</a>
		</div>
	);
}
// ─── Icons ────────────────────────────────────────────────────────────────────

function PreviewIcon() {
	return (
		<svg
			width="17"
			height="17"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
		</svg>
	);
}

function AnalyticsIcon() {
	return (
		<svg
			width="17"
			height="17"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<line
				x1="18"
				y1="20"
				x2="18"
				y2="10"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<line
				x1="12"
				y1="20"
				x2="12"
				y2="4"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<line
				x1="6"
				y1="20"
				x2="6"
				y2="14"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function EditIcon() {
	return (
		<svg
			width="17"
			height="17"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function ArrowIcon() {
	return (
		<svg
			width="13"
			height="13"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<line
				x1="5"
				y1="12"
				x2="19"
				y2="12"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<polyline
				points="12 5 19 12 12 19"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
