"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

export interface FilterGroup {
  label: string;
  options: { slug: string; label: string }[];
}

/**
 * Pastilles de filtre au-dessus de la liste des projets.
 *  - Un seul filtre actif à la fois : chaque filtre a donc UN lien à envoyer
 *    (/?focus=<slug>#projets), et la sélection se lit d'un coup d'œil.
 *  - La pastille active se remplit d'accent ; recliquer dessus la désactive.
 *  - Boutons à bascule (aria-pressed), nombre de projets annoncé (aria-live).
 */
export function ProjectFilters({
  groups,
  focus,
  onChange,
  groupLabel,
  showAllLabel,
  countLabel,
}: {
  groups: FilterGroup[];
  focus: string | null;
  onChange: (slug: string | null) => void;
  /** Nom du groupe pour les lecteurs d'écran (« Filtrer les projets »). */
  groupLabel: string;
  showAllLabel: string;
  /** « 3 projets » : déjà formaté par le parent. */
  countLabel: string;
}) {
  return (
    <div role="group" aria-label={groupLabel} className="mt-8 space-y-3">
      {groups.map((g) => (
        <div key={g.label} className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:items-baseline sm:gap-4">
          <p className="text-label text-fg-subtle">{g.label}</p>
          <ul className="flex flex-wrap gap-2">
            {g.options.map((o) => {
              const on = focus === o.slug;
              return (
                <li key={o.slug}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => onChange(on ? null : o.slug)}
                    className={cn(
                      "relative isolate rounded-pill border px-3.5 py-1.5 text-small transition-[color,border-color,transform] duration-300 ease-spring active:scale-[0.96]",
                      on
                        ? "border-btn text-btn-fg"
                        : "border-border-strong text-fg-muted hover:border-fg hover:text-fg",
                    )}
                  >
                    {/* Le fond actif glisse d'une pastille à l'autre (layoutId) */}
                    {on && (
                      <motion.span
                        layoutId="filter-active"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-pill bg-btn"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {o.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <div className="flex min-h-8 items-center gap-4 pt-1 sm:pl-[8.5rem]">
        <p aria-live="polite" className="text-label text-fg-subtle">
          {countLabel}
        </p>
        {focus && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-label font-medium text-accent underline-offset-4 hover:underline active:underline"
          >
            {showAllLabel}
          </button>
        )}
      </div>
    </div>
  );
}
