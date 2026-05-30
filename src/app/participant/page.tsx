import { Suspense } from "react";
import ParticipantPovClient from "./components/participant-pov-client";

export default function ParticipantPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-primary-50">
          <p className="text-sm text-gray-500">Loading badge…</p>
        </div>
      }
    >
      <ParticipantPovClient />
    </Suspense>
  );
}
