"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";

interface ButtonPrimaryProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  inverted?: boolean; // When placed on dark backgrounds, invert to white
  href?: string;
}

export const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonPrimaryProps>(
  ({ children, className, inverted = false, href, ...props }, ref) => {
    const classes = cn(
      "text-button-label inline-flex items-center justify-center rounded-pill px-6 py-3 transition-colors",
      inverted
        ? "bg-canvas-white text-near-black hover:bg-soft-stone"
        : "bg-near-black text-canvas-white hover:bg-cohere-black",
      className
    );

    if (href) {
      return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href={href} className={classes}>
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

ButtonPrimary.displayName = "ButtonPrimary";
