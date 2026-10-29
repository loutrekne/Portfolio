"use client";

import { MotionConfig } from "motion/react";

/**
 * Réglages globaux de Motion : si le visiteur a demandé à réduire les
 * animations dans son système, les mouvements (translations, rotations,
 * échelles) sont coupés automatiquement.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
