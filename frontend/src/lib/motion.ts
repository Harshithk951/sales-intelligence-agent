import type { Variants, Transition } from "framer-motion";

// Premium easing — feels expensive and restrained
export const premiumEase = [0.16, 1, 0.3, 1] as const;

export const defaultTransition: Transition = {
  duration: 0.7,
  ease: premiumEase,
};

export const quickTransition: Transition = {
  duration: 0.4,
  ease: premiumEase,
};

// --- Variants ---

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: premiumEase,
    },
  },
};

// Glow pulse for active workflow nodes
export const glowPulse: Variants = {
  idle: {
    boxShadow: "0 0 0 0 rgba(24, 99, 220, 0)",
  },
  active: {
    boxShadow: [
      "0 0 0 0 rgba(24, 99, 220, 0.4)",
      "0 0 20px 4px rgba(24, 99, 220, 0.15)",
      "0 0 0 0 rgba(24, 99, 220, 0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
