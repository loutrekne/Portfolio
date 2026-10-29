"use client";

import { useEffect, useState } from "react";

/**
 * En-tête qui s'efface quand on descend (place à la lecture) et revient dès
 * qu'on remonte. Un filet apparaît une fois la page défilée.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        // Ne se cache qu'après le hero, et seulement sur un vrai mouvement
        if (Math.abs(y - last) > 6) setHidden(y > last && y > 240);
        last = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      // Ne jamais cacher l'en-tête quand un élément y a le focus clavier
      onFocusCapture={() => setHidden(false)}
      className="sticky top-0 z-40 transition-[transform,background-color,border-color] duration-500 ease-spring"
      style={{
        transform: hidden ? "translateY(-100%)" : "none",
        backgroundColor: scrolled ? "color-mix(in srgb, var(--bg) 82%, transparent)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      {children}
    </header>
  );
}
