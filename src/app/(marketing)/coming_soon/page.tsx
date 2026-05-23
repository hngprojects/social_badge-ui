import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'This feature is on its way. Stay tuned.',
};

export default function ComingSoonPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="max-w-md flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center">
          <span className="text-3xl">🚀</span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-[36px] font-semibold font-fraunces text-foreground">
            Coming soon
          </h1>
          <p className="text-[#6C6C89] text-sm leading-6">
            Paid plans are on their way — we&apos;re still building this out.
            In the meantime, you can get started for free and create your first
            badge campaign today.
          </p>
        </div>

        <Link
          href="/signup"
          className="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold text-center hover:bg-primary-600 transition-colors"
        >
          Start for free
        </Link>
      </div>
    </section>
  );
}
