"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface AnnouncementBarProps {
  message: string;
  linkText?: string;
  linkHref?: string;
}

export function AnnouncementBar({ message, linkText = "Learn more", linkHref = "#" }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "36px", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-cohere-black text-canvas-white flex items-center justify-center relative overflow-hidden"
        >
          <div className="text-micro flex items-center gap-2">
            <span>{message}</span>
            <Link href={linkHref} className="underline hover:text-soft-stone transition-colors">
              {linkText}
            </Link>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-slate hover:text-canvas-white transition-colors"
            aria-label="Close announcement"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
