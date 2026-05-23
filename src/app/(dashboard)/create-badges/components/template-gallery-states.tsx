interface TemplateLoadingStateProps {
  className?: string;
}

export function TemplateLoadingState({ className }: TemplateLoadingStateProps) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-[24px] border border-[#E5E5E5] border-dashed py-16 ${className ?? ""}`}
    >
      <p className="text-sm text-[#737373]">Loading templates…</p>
    </div>
  );
}

interface TemplateEmptyStateProps {
  activeFilter: string;
  onViewAll: () => void;
}

export function TemplateEmptyState({ activeFilter, onViewAll }: TemplateEmptyStateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-[24px] border border-[#E5E5E5] border-dashed py-16">
      <h3 className="text-base font-bold text-[#262626]">No templates found</h3>
      <p className="text-xs text-[#737373] mt-1 max-w-sm leading-relaxed">
        We don&apos;t have any base structures under &quot;{activeFilter}&quot; just yet. Try selecting another filter track or upload your custom layout below.
      </p>
      <button
        type="button"
        onClick={onViewAll}
        className="mt-4 px-4 py-1.5 bg-[#1A1A1A] text-white text-xs font-semibold rounded-full hover:bg-black transition-colors"
      >
        View all layouts
      </button>
    </div>
  );
}
