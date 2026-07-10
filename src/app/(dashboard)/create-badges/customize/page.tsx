import { CustomizeBadgePageClient } from "../../components/customize/customize-badge-page-client";
import { Suspense } from "react";

export default function CustomizeBadgePage() {
  return( 
    <Suspense fallback={
    <div className="flex min-h-screen items-center justify-center bg-primary-50">
      <p className="text-sm text-gray-500">Loading…</p>
    </div>
  }>
     <CustomizeBadgePageClient />
    </Suspense>
  )
}
