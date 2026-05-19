"use client";

import React, { useState } from "react";


export default function TemplatesMarketplacePage() {
 
  const [activeTemplate, setActiveTemplate] = useState<null>(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);

  return (
    /* SEMANTIC MAIN CONTAINER */
    <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 py-6 max-w-360 mx-auto w-full items-start">

      {/* LEFT SECTION: DYNAMIC TEMPLATE GALLERY CONTAINER */}
      <section className="lg:col-span-7 w-full space-y-6">
       
        {/* GALLERY BADGE WRAPPER CELL */}
        <div className="w-full min-h-[500px] bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-sm text-gray-400 text-center py-20 font-medium">
            Gallery Grid Matrix Coming in Step 2...
          </p>
        </div>
      </section>

      {/* =========================================================================
          RIGHT SECTION: DESKTOP STICKY LIVE PREVIEW
          - hidden lg:block: Completely dropped on mobile to respect the viewport.
          - lg:sticky & lg:top-6: Pins the panel beautifully when scrolling the gallery.
          - Spans 5 columns to lock down the layout proportions from Figma.
          ========================================================================= */}
      <section className="hidden lg:block lg:col-span-5 w-full lg:sticky lg:top-6 bg-[#FFF0EC] rounded-3xl p-6 border border-orange-100/50 min-h-[600px] flex flex-col items-center justify-center">
        <p className="text-sm text-orange-800/60 font-semibold uppercase tracking-wider">
          Desktop Live Preview Coming in Step 3...
        </p>
      </section>

      {/* =========================================================================
          MOBILE MODAL SHEET OVERLAY CONTAINER
          - Conditional render driven by the state pipeline.
          - Perfectly mimics the viewport intercept design from frame 53.jpg.
          ========================================================================= */}
      {isMobileModalOpen && (
        <dialog
          open
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm w-full h-full flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300"
        >
          <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <p className="text-center text-sm font-medium text-gray-500 py-12">
              Mobile Overlay Panel Coming in Step 4...
            </p>
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="w-full h-12 bg-gray-100 text-gray-700 font-semibold rounded-xl text-sm"
            >
              Close Preview
            </button>
          </div>
        </dialog>
      )}

    </main>
  );
}