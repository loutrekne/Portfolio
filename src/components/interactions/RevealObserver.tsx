"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Apparition douce des blocs `.reveal` quand ils entrent à l'écran.
 *
 * Règle d'or : la page est complète sans JS. Seuls les éléments situés SOUS
 * la ligne de flottaison au chargement sont masqués (data-reveal="pending"),
 * puis révélés une fois visibles. Les blocs déjà à l'écran ne bougent pas.
 * Désactivé si l'utilisateur préfère moins de mouvement, et tout est révélé
 * avant une impression.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not([data-reveal])"));
    const below = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // Petit décalage entre voisins pour un effet "en cascade"
          const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
          const i = Math.max(0, siblings.indexOf(el));
          el.style.transitionDelay = `${Math.min(i, 4) * 60}ms`;
          el.dataset.reveal = "shown";
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    below.forEach((el) => {
      el.dataset.reveal = "pending";
      io.observe(el);
    });

    const showAll = () => below.forEach((el) => (el.dataset.reveal = "shown"));
    window.addEventListener("beforeprint", showAll);
    return () => {
      io.disconnect();
      window.removeEventListener("beforeprint", showAll);
    };
  }, [pathname]);

  return null;
}
