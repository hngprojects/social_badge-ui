export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[60vh] items-center justify-center gap-2 p-6"
    >
      <span className="h-3 w-3 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.3s]" />
      <span className="h-3 w-3 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.15s]" />
      <span className="h-3 w-3 animate-bounce rounded-full bg-primary-500" />
    </div>
  );
}
