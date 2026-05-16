type StatusIconProps = {
  type: 'check' | 'cross';
  className?: string;
};

export default function StatusIcon({ type, className }: StatusIconProps) {
  const isCheck = type === 'check';

  const defaultBg = isCheck ? 'bg-[#e8501a]' : 'bg-[#e55]';

  return (
    <span
      className={`inline-flex items-center justify-center w-4.5 h-4.5 rounded-full shrink-0 ${className ?? defaultBg}`}
    >
      {isCheck ? (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path
            d="M1 4l2.5 2.5L9 1"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1 1l6 6M7 1L1 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}