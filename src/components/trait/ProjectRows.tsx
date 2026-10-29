"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { usePointerFine } from "@/lib/usePointerFine";
import { Scribble } from "./Scribble";

export interface ProjectRow {
  slug: string;
  index: string;
  client: string;
  sector: string;
  title: string;
  tagline: string;
  period: string;
}

/**
 * Liste des études de cas.
 *  - Au repos, chaque rangée DIT qu'elle est cliquable : pastille flèche à droite
 *    (grand écran) ou « Lire l'étude de cas → » en accent (mobile, sans survol).
 *    Rangées séparées par des filets.
 *  - Au survol d'une rangée, le titre se souligne d'un trait de feutre qui se dessine.
 *  - À la souris, une pastille « Voir le projet → » suit le curseur avec un ressort,
 *    uniquement au-dessus de la liste. Le curseur normal reste visible : on ajoute
 *    une indication, on ne retire rien. Rien sur écran tactile.
 *    Échap la ferme (WCAG 1.4.13) jusqu'à ce que la souris quitte puis retrouve la liste.
 *  - Lien « étiré » : le lien est sur le titre, mais toute la carte est cliquable.
 *    Le nom accessible est donc le titre seul (liste de liens courte au lecteur
 *    d'écran) et il correspond au texte visible du lien (WCAG 2.5.3).
 */
export function ProjectRows({
  rows,
  cursorLabel,
  ctaLabel,
}: {
  rows: ProjectRow[];
  cursorLabel: string;
  /** Appel à l'action visible au repos (« Lire l'étude de cas »). */
  ctaLabel: string;
}) {
  const fine = usePointerFine();
  const [active, setActive] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDismissed(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 38, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 38, mass: 0.6 });

  return (
    <>
      <ol
        className="mt-8 border-t border-border"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          x.set(e.clientX);
          y.set(e.clientY);
        }}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          x.jump(e.clientX);
          y.jump(e.clientY);
          setActive(true);
        }}
        onPointerLeave={() => {
          setActive(false);
          setDismissed(false);
        }}
      >
        {rows.map((p) => (
          <li key={p.slug} className="reveal border-b border-border">
            {/* tabIndex -1 : sinon Motion rend cette enveloppe focusable (whileTap) → arrêt clavier vide */}
            {/* Carte entière cliquable par « lien étiré » : le vrai lien est sur le titre,
                son ::after couvre toute la carte. Nom accessible = le titre (court, et
                identique au texte visible du lien). */}
            <motion.div
              tabIndex={-1}
              initial="rest"
              animate="rest"
              whileHover="hover"
              whileTap="hover"
              className="group relative -mx-4 my-2 grid gap-3 rounded-md px-4 py-7 transition-colors duration-300 hover:bg-surface active:bg-surface sm:-mx-6 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-6 sm:px-6"
            >
              <span className="flex items-baseline justify-between text-label">
                <span className="font-medium text-accent tabular-nums transition-transform duration-500 ease-spring group-hover:translate-x-1 group-active:translate-x-1">
                  {p.index}
                </span>
                {/* Mobile : la période remonte sur la ligne du numéro */}
                <span className="text-fg-subtle sm:hidden">{p.period}</span>
              </span>
              <div>
                <p className="text-label text-fg-muted">
                  {p.client} · {p.sector}
                </p>
                <h3 className="mt-2 text-h2 font-semibold">
                  <Link
                    href={`/projets/${p.slug}`}
                    className="after:absolute after:inset-0 after:rounded-md after:content-['']"
                  >
                    <span className="relative inline-block">
                      {p.title}
                      <Scribble
                        variant="underline"
                        mode="parent"
                        className="absolute -bottom-2 left-0 h-3 w-full text-accent"
                      />
                    </span>
                  </Link>
                </h3>
                <p className="mt-3 measure text-fg-muted">{p.tagline}</p>
                {/* Mobile : appel à l'action visible au repos (pas de survol sur écran tactile) */}
                <span className="mt-5 inline-flex items-center gap-2 font-medium text-accent sm:hidden">
                  {ctaLabel}
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-spring group-hover:translate-x-1.5 group-active:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </div>
              {/* Grand écran : période + pastille flèche, qui se remplit d'accent au survol / à l'appui */}
              <div className="hidden flex-col items-end justify-between gap-6 sm:flex">
                <span className="pt-1 text-label text-fg-subtle">{p.period}</span>
                <span
                  aria-hidden
                  className="grid size-12 place-items-center rounded-full border border-border-strong text-fg transition-colors duration-300 group-hover:border-btn group-hover:bg-btn group-hover:text-btn-fg group-active:border-btn group-active:bg-btn group-active:text-btn-fg"
                >
                  <span className="transition-transform duration-500 ease-spring group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </motion.div>
          </li>
        ))}
      </ol>

      <AnimatePresence>
        {fine && active && !dismissed && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed top-0 left-0 z-50 mt-5 ml-5 rounded-pill bg-btn px-4 py-2 text-small font-medium whitespace-nowrap text-btn-fg shadow-sticker"
            style={{ x: sx, y: sy }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            {cursorLabel} →
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
