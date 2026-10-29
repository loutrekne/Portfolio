"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

/**
 * LE TRAIT DU HEADER — une corde fine tendue sous l'en-tête.
 * Quand la souris passe tout près, la corde se courbe vers elle et se teinte
 * de terracotta ; quand la souris s'éloigne, elle revient en vibrant
 * (ressort peu amorti), comme une corde de guitare qu'on pince.
 * Souris uniquement : rien sur écran tactile, ligne immobile si l'utilisateur
 * préfère moins d'animations.
 */
const REACH = 56; // distance (px) à laquelle la souris "attrape" la corde
const MAX_BEND = 22; // courbure maximale (px)

export function HeaderString() {
  const ref = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(500); // position horizontale de la courbe, 0 → 1000
  const bendTarget = useMotionValue(0);
  const bend = useSpring(bendTarget, { stiffness: 320, damping: 6, mass: 0.5 });
  const d = useTransform(() => `M0 0 Q ${x.get()} ${bend.get() * 2} 1000 0`);
  const accentOpacity = useTransform(bend, (b) => Math.min(1, Math.abs(b) / 10));

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const lineY = r.top + r.height / 2;
      const dist = e.clientY - lineY;
      if (Math.abs(dist) < REACH) {
        x.set(((e.clientX - r.left) / r.width) * 1000);
        bendTarget.set(Math.max(-MAX_BEND, Math.min(MAX_BEND, dist * 0.7)));
      } else {
        bendTarget.set(0);
      }
    };
    const onLeave = () => bendTarget.set(0);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, x, bendTarget]);

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 -30 1000 60"
      preserveAspectRatio="none"
      className="pointer-events-none absolute top-full left-0 h-[60px] w-full -translate-y-1/2 overflow-visible"
    >
      <motion.path
        d={d}
        fill="none"
        stroke="var(--border-strong)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
        style={{ opacity: accentOpacity }}
      />
    </svg>
  );
}
