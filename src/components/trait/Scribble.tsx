"use client";

import { motion, type Transition } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Trait dessiné à la main (SVG) qui se trace tout seul.
 *
 * variant :
 *  - "circle"    : ellipse au feutre autour d'un mot (hero)
 *  - "underline" : soulignement ondulé (titres de projets)
 *  - "arrow"     : flèche courbe
 * mode :
 *  - "mount"  : se dessine à l'affichage
 *  - "inView" : se dessine quand il entre à l'écran
 *  - "parent" : piloté par un parent Motion qui passe de "rest" à "hover"
 */
const PATHS = {
  circle: {
    viewBox: "0 0 200 60",
    d: [
      "M18 40 C 6 22, 60 8, 110 8 C 168 8, 196 20, 192 34 C 188 50, 120 56, 70 54 C 30 52, 8 44, 14 30 C 18 20, 44 12, 72 10",
    ],
  },
  underline: { viewBox: "0 0 100 10", d: ["M2 6 C 20 2, 40 9, 60 5 S 90 3, 98 6"] },
  arrow: { viewBox: "0 0 74 64", d: ["M4 4 C 30 6, 56 18, 60 50", "M48 42 L 60 54 L 68 38"] },
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function Scribble({
  variant,
  mode = "mount",
  delay = 0,
  className,
}: {
  variant: keyof typeof PATHS;
  mode?: "mount" | "inView" | "parent";
  delay?: number;
  className?: string;
}) {
  const { viewBox, d } = PATHS[variant];
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden
      className={cn("pointer-events-none overflow-visible", className)}
    >
      {d.map((path, i) => {
        // Tracé par stroke-dashoffset (1 → 0) sur un chemin normalisé (pathLength=1).
        // Pas de vector-effect="non-scaling-stroke" : combiné à pathLength, Chrome
        // découpe le trait en pointillés.
        const transition: Transition = { duration: i === 0 ? 0.9 : 0.4, delay: delay + i * 0.8, ease };
        const drawn = { strokeDashoffset: 0, opacity: 1, transition };
        const hidden = { strokeDashoffset: 1, opacity: 0 };
        return (
          <motion.path
            key={path}
            d={path}
            pathLength={1}
            strokeDasharray="1 1"
            fill="none"
            stroke="currentColor"
            strokeWidth={variant === "underline" ? 2 : variant === "circle" ? 1.8 : 2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...(mode === "parent"
              ? {
                  variants: {
                    rest: { ...hidden, transition: { duration: 0.2 } },
                    hover: { ...drawn, transition: { duration: 0.5, ease } },
                  },
                }
              : mode === "inView"
                ? { initial: hidden, whileInView: drawn, viewport: { once: true, margin: "-10% 0px" } }
                : { initial: hidden, animate: drawn })}
          />
        );
      })}
    </svg>
  );
}
