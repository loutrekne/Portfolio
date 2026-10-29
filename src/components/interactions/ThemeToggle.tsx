"use client";

import { useState, useSyncExternalStore } from "react";

/**
 * Bouton clair / sombre. Le soleil se couche, la lune se lève : les deux
 * icônes pivotent et se croisent avec un ressort. Choix mémorisé (localStorage).
 * Accessibilité : le nom du bouton dit l'action disponible ; le thème obtenu est
 * annoncé dans une région live (uniquement après un clic, jamais au chargement).
 */
type Theme = "light" | "dark";

function readTheme(): Theme {
  const forced = document.documentElement.dataset.theme;
  if (forced === "light" || forced === "dark") return forced;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => {
    listeners.delete(cb);
    mq.removeEventListener("change", cb);
  };
}

export function ThemeToggle({
  labelLight,
  labelDark,
  nowLight,
  nowDark,
}: {
  labelLight: string;
  labelDark: string;
  /** Annonces après bascule : « Mode clair activé » / « Mode sombre activé ». */
  nowLight: string;
  nowDark: string;
}) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);
  const isDark = theme === "dark";
  const [announce, setAnnounce] = useState("");

  function toggle() {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* stockage indisponible : le choix vaut pour la session */
    }
    listeners.forEach((l) => l());
    setAnnounce(next === "dark" ? nowDark : nowLight);
  }

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={isDark ? labelLight : labelDark}
        title={isDark ? labelLight : labelDark}
        className="relative btn-spring grid size-9 place-items-center overflow-hidden rounded-pill text-fg-muted hover:bg-surface-muted hover:text-fg"
      >
        {/* Soleil */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="absolute size-[18px] transition-all duration-500 ease-spring"
          style={{ transform: isDark ? "rotate(-90deg) scale(0.4)" : "none", opacity: isDark ? 0 : 1 }}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
        </svg>
        {/* Lune */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="absolute size-[18px] transition-all duration-500 ease-spring"
          style={{ transform: isDark ? "none" : "rotate(90deg) scale(0.4)", opacity: isDark ? 1 : 0 }}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
      </button>
      <span className="sr-only" aria-live="polite">
        {announce}
      </span>
    </>
  );
}
