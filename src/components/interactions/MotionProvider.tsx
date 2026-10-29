"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";

/**
 * Réglages globaux de Motion : si le visiteur a demandé à réduire les
 * animations dans son système, les mouvements (translations, rotations,
 * échelles) sont coupés automatiquement.
 *
 * Correctif iOS Safari : sans écouteur « touchstart » sur la page, Safari
 * n'applique pas l'état CSS :active au tap. Or c'est :active qui donne le
 * retour visuel à l'appui sur mobile (boutons, cartes, soulignements).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
