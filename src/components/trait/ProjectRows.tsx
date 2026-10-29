"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
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
  /** Slugs de catégories (compétences + secteurs), pour les liens ?focus=. */
  categories: string[];
  /** Compétences affichées sous le titre (« Design system · Recherche »). */
  skillLabels: string[];
}

/** Textes et libellés de la sélection reçue par lien (?focus=…). */
export interface SelectionConfig {
  /** slug → libellé, pour toutes les catégories. */
  labels: Record<string, string>;
  intro: string;
  /** « 1 projet sur {total} » / « {n} projets sur {total} ». */
  countOne: string;
  countMany: string;
  /** « Voir les {total} projets ». */
  showAll: string;
}

/**
 * Le filtre actif VIT DANS L'URL (?focus=…) : c'est la source de vérité.
 * On s'y abonne comme à un état externe (retour arrière, lien reçu).
 */
const FOCUS_EVENT = "projects-focus";
function subscribeFocus(cb: () => void) {
  window.addEventListener("popstate", cb);
  window.addEventListener(FOCUS_EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(FOCUS_EVENT, cb);
  };
}
const readFocusParam = () => new URLSearchParams(window.location.search).get("focus");

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
 *  - Pas de filtres visibles : pour 6 projets, filtrer coûte plus que lire.
 *    Chaque rangée affiche ses compétences sous le titre (pertinence d'un coup d'œil).
 *  - Lien sur mesure : /?focus=<slug>#projets n'affiche que les projets de cette
 *    catégorie, avec une phrase « Sélection pour vous : … · 4 projets sur 6 » et
 *    un lien pour tout voir. Les rangées rentrent avec un fondu (layout de Motion).
 *  - Lien « étiré » : le lien est sur le titre, mais toute la carte est cliquable.
 *    Le nom accessible est donc le titre seul (liste de liens courte au lecteur
 *    d'écran) et il correspond au texte visible du lien (WCAG 2.5.3).
 */
export function ProjectRows({
  rows,
  cursorLabel,
  ctaLabel,
  selection,
}: {
  rows: ProjectRow[];
  cursorLabel: string;
  /** Appel à l'action visible au repos (« Lire l'étude de cas »). */
  ctaLabel: string;
  selection: SelectionConfig;
}) {
  const fine = usePointerFine();

  // ── Sélection reçue par lien ───────────────────────────────────────────
  // Seules les catégories qui ont au moins un projet sont acceptées
  const valid = useMemo(
    () =>
      new Set(Object.keys(selection.labels).filter((slug) => rows.some((r) => r.categories.includes(slug)))),
    [selection.labels, rows],
  );
  const param = useSyncExternalStore(subscribeFocus, readFocusParam, () => null);
  const focus = param && valid.has(param) ? param : null;

  function changeFocus(next: string | null) {
    const url = new URL(window.location.href);
    if (next) url.searchParams.set("focus", next);
    else url.searchParams.delete("focus");
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(FOCUS_EVENT));
  }

  const visible = focus ? rows.filter((r) => r.categories.includes(focus)) : rows;
  const total = String(rows.length);
  const countLabel = (visible.length === 1 ? selection.countOne : selection.countMany)
    .replace("{n}", String(visible.length))
    .replace("{total}", total);

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
      {/* Arrivée par un lien sur mesure : on dit clairement que c'est une sélection */}
      {focus && (
        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 rounded-md bg-surface px-5 py-4 sm:px-6">
          <p>
            <span className="text-fg-muted">{selection.intro}&nbsp;: </span>
            <span className="font-semibold">{selection.labels[focus]}</span>
            <span className="text-fg-muted"> · {countLabel}</span>
          </p>
          <button
            type="button"
            onClick={() => changeFocus(null)}
            className="text-label font-medium text-accent underline underline-offset-4"
          >
            {selection.showAll.replace("{total}", total)}
          </button>
        </div>
      )}

      <ol
        className="mt-6 border-t border-border"
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
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                layout: { type: "spring", stiffness: 380, damping: 36 },
                opacity: { duration: 0.2 },
              }}
              className="reveal border-b border-border"
            >
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
                  {/* Compétences démontrées : le recruteur repère ce qui le concerne sans cliquer */}
                  {p.skillLabels.length > 0 && (
                    <p className="mt-3 text-label text-fg-subtle">{p.skillLabels.join(" · ")}</p>
                  )}
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
            </motion.li>
          ))}
        </AnimatePresence>
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
