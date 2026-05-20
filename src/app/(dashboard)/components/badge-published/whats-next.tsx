'use client'
import { ArrowOrange } from "../../badges/published/icons/arrow-up";
import { NextAction } from "../../types/badge-published/badge";
import { NEXT_ACTIONS } from "../../constants/badges-published/next-action";

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
		<div className="bg-white border border-[#ECE9E4] rounded-[16px] p-5 flex flex-col">
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
				<ArrowOrange />
			</a>
		</div>
	);
}

