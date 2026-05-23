import { Suspense } from "react";
import { CustomizeBadgePageClient } from "./components/customize-badge-page-client";

export default function CustomizeBadgePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[50vh] items-center justify-center bg-[#F5F5F5]">
          <p className="text-sm text-gray-500">Loading template...</p>
        </main>
      }
    >
      <CustomizeBadgePageClient />
    </Suspense>
  );
}
