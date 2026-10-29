"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { PORTRAIT_CURVES, PORTRAIT_EYES, PORTRAIT_SIZE } from "./portrait-paths";

/**
 * Le portrait dessiné de Louise, qui SE DESSINE.
 *
 * 1. Les contours se tracent au trait fin, de haut en bas, comme à la main.
 * 2. L'encre remplit ensuite le dessin.
 * 3. Une fois dessiné, il vit : les yeux clignent de temps en temps et
 *    suivent discrètement la souris.
 *
 * `replayKey` : changer cette valeur relance le dessin (ex. au clic sur le portrait).
 * Si le visiteur préfère moins d'animations : dessin complet, immobile.
 */
const { width: W, height: H } = PORTRAIT_SIZE;
const FILL_D = PORTRAIT_CURVES.map((c) => c.d).join("");
const ease = [0.22, 1, 0.36, 1] as const;
const DRAW_SPAN = 1.6; // s : décalage entre le haut et le bas du dessin
const DRAW_DURATION = 0.9; // s : durée du tracé de chaque contour
const FILL_DELAY = DRAW_SPAN + 0.5;
/** Décalage de repos du passage terracotta, en unités du dessin (≈ 12 px à 600 px de large). */
const WASH_OFFSET = { x: 38, y: 30 };

export function PortraitDrawing({
  alt,
  replayKey = 0,
  wash = false,
}: {
  alt: string;
  replayKey?: number;
  /** Ajoute un « second passage d'encre » terracotta, décalé comme en risographie. */
  wash?: boolean;
}) {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);

  // Regard : décalage des yeux vers la souris (en unités du dessin)
  const lookX = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  const lookY = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  // Clignement
  const blink = useMotionValue(1);
  // Décalage du passage terracotta (risographie) : glisse depuis sous le dessin,
  // puis bouge un peu avec la souris, à l'opposé du regard (effet de profondeur).
  const washX = useSpring(0, { stiffness: 90, damping: 16 });
  const washY = useSpring(0, { stiffness: 90, damping: 16 });

  const [drawn, setDrawn] = useState(false);

  // Fin du dessin → on autorise les yeux à vivre
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setDrawn(true), (FILL_DELAY + 0.6) * 1000);
    washX.jump(0);
    washY.jump(0);
    return () => {
      clearTimeout(t);
      setDrawn(false);
    };
  }, [replayKey, reduce, washX, washY]);

  // Le passage terracotta sort de sous le dessin une fois l'encre posée
  useEffect(() => {
    if (!wash) return;
    if (reduce || drawn) {
      washX.set(WASH_OFFSET.x);
      washY.set(WASH_OFFSET.y);
    }
  }, [wash, reduce, drawn, washX, washY]);

  // Clignements à intervalle irrégulier
  useEffect(() => {
    if (reduce || !drawn) return;
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      timer = setTimeout(
        () => {
          animate(blink, [1, 0.08, 1], { duration: 0.22, ease: "easeInOut" });
          loop();
        },
        2800 + Math.random() * 3500,
      );
    };
    loop();
    return () => clearTimeout(timer);
  }, [drawn, reduce, blink]);

  // Les yeux suivent la souris
  useEffect(() => {
    if (reduce || !drawn) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !svgRef.current) return;
      const r = svgRef.current.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height * 0.35)) / window.innerHeight;
      const nx = Math.max(-1, Math.min(1, dx * 2));
      const ny = Math.max(-1, Math.min(1, dy * 2));
      lookX.set(nx * 18);
      lookY.set(ny * 10);
      if (wash) {
        washX.set(WASH_OFFSET.x - nx * 30);
        washY.set(WASH_OFFSET.y - ny * 22);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [drawn, reduce, wash, lookX, lookY, washX, washY]);

  const strokeProps = {
    fill: "none",
    stroke: "var(--portrait-ink)",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    pathLength: 1,
    strokeDasharray: "1 1",
  };

  return (
    <svg
      ref={svgRef}
      key={replayKey}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={alt}
      className="relative block size-full overflow-visible"
    >
      {/* 0 · Passage terracotta, sous l'encre (risographie mal calée, exprès) */}
      {wash && (
        <motion.path
          d={FILL_D}
          fillRule="evenodd"
          fill="var(--portrait-wash)"
          style={{ x: washX, y: washY }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: FILL_DELAY, ease }}
        />
      )}

      {/* 1 · Les contours qui se tracent */}
      {!reduce &&
        PORTRAIT_CURVES.map((c, i) => (
          <motion.path
            key={i}
            d={c.d}
            {...strokeProps}
            initial={{ strokeDashoffset: 1 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: DRAW_DURATION, delay: (c.y / H) * DRAW_SPAN, ease }}
          />
        ))}

      {/* 2 · L'encre qui remplit */}
      <motion.path
        d={FILL_D}
        fillRule="evenodd"
        fill="var(--portrait-ink)"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: FILL_DELAY, ease }}
      />

      {/* 3 · Les yeux : se dessinent, puis clignent et regardent */}
      {PORTRAIT_EYES.map((eye, i) => (
        <motion.g
          key={`eye-${i}`}
          style={{ x: lookX, y: lookY, scaleY: blink, transformBox: "fill-box", transformOrigin: "center" }}
        >
          {!reduce && (
            <motion.path
              d={eye.d}
              {...strokeProps}
              initial={{ strokeDashoffset: 1 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: DRAW_DURATION, delay: (eye.y / H) * DRAW_SPAN, ease }}
            />
          )}
          <motion.path
            d={eye.d}
            fill="var(--portrait-ink)"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: FILL_DELAY - 0.2, ease }}
          />
        </motion.g>
      ))}
    </svg>
  );
}
