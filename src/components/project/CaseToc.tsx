"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Sommaire collant (grand écran) qui suit la lecture.
 *  - La section en cours de lecture passe en couleur texte ; un petit trait
 *    terracotta GLISSE d'une entrée à l'autre (layoutId de Motion).
 *  - Clic = défilement doux vers la section (ancre + scroll-margin).
 */
export function CaseToc({ items, label }: { items: { id: string; num: string; name: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((it) => document.getElementById(it.id)).filter((el): el is HTMLElement => !!el);
    // Une section est « active » quand elle traverse la bande située vers 40 % de la hauteur d'écran
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-28">
      <p className="text-label font-medium text-fg-subtle">{label}</p>
      <ol className="mt-4 space-y-1">
        {items.map((it) => {
          const isActive = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`relative flex gap-3 py-1.5 pl-5 text-small transition-colors duration-300 ${
                  isActive ? "text-fg" : "text-fg-subtle hover:text-fg-muted"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="toc-trait"
                    aria-hidden
                    className="absolute top-1/2 left-0 h-[2px] w-3 -translate-y-1/2 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="text-accent tabular-nums">{it.num}</span>
                <span>{it.name}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
