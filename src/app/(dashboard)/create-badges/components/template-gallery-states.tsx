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

interface TemplateErrorStateProps {
  onRetry: () => void;
  isRetrying: boolean;
}

export function TemplateErrorState({ onRetry, isRetrying }: TemplateErrorStateProps) {
  return (
    <div
      role="alert"
      className="w-full flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-red-50 rounded-[24px] border border-red-200 border-dashed py-16"
    >
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-base font-bold text-red-900">Failed to load templates</h3>
      <p className="text-xs text-red-600 mt-1 max-w-sm leading-relaxed">
        We encountered an error while fetching the badge templates. Please check your internet connection or try again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        aria-label="Retry loading templates"
        aria-busy={isRetrying}
        className="mt-4 px-4 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-full hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isRetrying ? "Retrying…" : "Retry"}
      </button>
    </div>
  );
}
