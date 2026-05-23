import { Suspense } from "react";
import { PublishedBadgePageClient } from "./components/published-badge-page-client";

export default function PublishedBadgePage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto mt-16 flex min-h-[40vh] w-[90%] max-w-227 items-center justify-center">
          <p className="text-sm text-gray-500">Loading your published badge…</p>
        </main>
      }
    >
      <PublishedBadgePageClient />
    </Suspense>
  );
}
