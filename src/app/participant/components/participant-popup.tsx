import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ParticipantPopupProps } from "../types";
import { EASE } from "../constants";

export default function ParticipantPopup({
  isOpen,
  onClose,
}: ParticipantPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative w-full max-w-124.25 h-82 bg-white rounded-3xl p-3 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* Image*/}
            <div className="relative flex-1 w-full rounded-2xl overflow-hidden mb-7 bg-gray-100">
              <Image
                src="/assets/participant/download-success.svg"
                alt="Popup image"
                fill
                className="object-cover"
              />
            </div>

            {/* Two buttons at the bottom */}
            <div className="flex items-center gap-4 mt-auto">
              <Button
                className="flex-1 h-9 rounded-4xl bg-[#f3f4fe] text-[#131010] text-[14px]"
                asChild
              >
                <Link href="/signup">Explore Flare Tag</Link>
              </Button>
              <Button
                className="flex-1 h-9 rounded-4xl bg-primary-500 font-medium text-[14px]"
                asChild
              >
                <Link href="/explore">Explore templates</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
