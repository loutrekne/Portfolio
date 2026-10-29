"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Chiffre qui "monte" quand il entre à l'écran (une seule fois).
 * Le HTML serveur contient déjà la valeur finale : sans JS, ou si l'utilisateur
 * préfère moins de mouvement, on voit directement le bon chiffre.
 * Les valeurs non numériques ("MVP", "2 → 1") sont affichées telles quelles.
 * Accessibilité : les lecteurs d'écran lisent TOUJOURS la valeur finale
 * (span sr-only) ; le chiffre qui défile est masqué pour eux (aria-hidden).
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const target = /^\d+$/.test(value) ? Number(value) : null;
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (target === null || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return; // déjà visible : pas d'animation
    setDisplay("0");
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(String(Math.round(eased * target)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
        {display}
      </span>
    </>
  );
}
