"use client";

import { motion } from "motion/react";

/**
 * Séparateur de section tracé à la main. Il se dessine quand il arrive à
 * l'écran : d'abord en terracotta, puis la couleur s'efface et il reste
 * un trait neutre.
 */
const D = "M2 7 C 120 3, 240 10, 380 6 S 640 3, 780 7 S 940 9, 998 5";
const ease = [0.22, 1, 0.36, 1] as const;

export function DrawnRule() {
  return (
    <svg aria-hidden viewBox="0 0 1000 12" preserveAspectRatio="none" className="h-3 w-full overflow-visible">
      <motion.path
        d={D}
        fill="none"
        stroke="var(--border-strong)"
        strokeWidth={1.5}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1 1"
        initial={{ strokeDashoffset: 1 }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.2, ease }}
      />
      <motion.path
        d={D}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={2}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1 1"
        initial={{ strokeDashoffset: 1, opacity: 1 }}
        whileInView={{ strokeDashoffset: 0, opacity: [1, 1, 0] }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{
          strokeDashoffset: { duration: 1.2, ease },
          opacity: { duration: 2.4, times: [0, 0.6, 1] },
        }}
      />
    </svg>
  );
}
