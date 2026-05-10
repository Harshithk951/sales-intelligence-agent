"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonSecondaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
  href?: string;
}

export const ButtonSecondary = forwardRef<HTMLButtonElement, ButtonSecondaryProps>(
  ({ children, className, inverted = false, href, ...props }, ref) => {
    const classes = cn(
      "text-button-label inline-flex items-center justify-center transition-all border-b border-transparent hover:border-current pb-0.5",
      inverted ? "text-canvas-white" : "text-near-black hover:text-cohere-black",
      className
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonSecondary.displayName = "ButtonSecondary";
