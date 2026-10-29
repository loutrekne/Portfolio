"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Apparition douce des blocs `.reveal` quand ils entrent à l'écran.
 *
 * Utilise la Web Animations API (`element.animate`) : aucun attribut ni
 * classe n'est modifié sur le DOM rendu par React, donc aucune erreur
 * d'hydratation, et la page reste complète sans JS (rien n'est masqué
 * à l'avance). Les blocs déjà visibles au chargement ne bougent pas.
 * Désactivé si l'utilisateur préfère moins de mouvement.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof Element.prototype.animate !== "function") return;

    // Seulement les blocs SOUS la ligne de flottaison au chargement.
    const below = Array.from(document.querySelectorAll<HTMLElement>(".reveal")).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        // Petit décalage entre voisins pour un effet "en cascade" (max 240 ms)
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        const delay = Math.min(Math.max(0, siblings.indexOf(el)), 4) * 60;
        el.animate(
          [
            { opacity: 0, transform: "translateY(18px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 700, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
        );
      });
    });

    below.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}