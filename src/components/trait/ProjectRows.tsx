"use client";

import Link from "next/link";
import { useState } from "react";
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
 *  - Au survol d'une rangée, le titre se souligne d'un trait de feutre qui se dessine.
 *  - À la souris, une pastille « Voir le projet → » suit le curseur avec un ressort,
 *    uniquement au-dessus de la liste. Le curseur normal reste visible : on ajoute
 *    une indication, on ne retire rien. Rien sur écran tactile.
 */
export function ProjectRows({ rows, cursorLabel }: { rows: ProjectRow[]; cursorLabel: string }) {
  const fine = usePointerFine();
  const [active, setActive] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 38, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 38, mass: 0.6 });

  return (
    <>
      <ol
        className="-mx-4 mt-8 sm:-mx-6"
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
        onPointerLeave={() => setActive(false)}
      >
        {rows.map((p) => (
          <li key={p.slug} className="reveal">
            <motion.div initial="rest" animate="rest" whileHover="hover">
              <Link
                href={`/projets/${p.slug}`}
                className="group grid gap-3 rounded-md px-4 py-8 transition-colors duration-300 hover:bg-surface sm:grid-cols-[3.5rem_1fr_auto] sm:gap-6 sm:px-6"
              >
                <span className="text-label font-medium text-accent tabular-nums transition-transform duration-500 ease-spring group-hover:translate-x-1">
                  {p.index}
                </span>
                <div>
                  <p className="text-label text-fg-muted">
                    {p.client} · {p.sector}
                  </p>
                  <h2 className="mt-2 text-h2 font-semibold">
                    <span className="relative inline-block">
                      {p.title}
                      <Scribble
                        variant="underline"
                        mode="parent"
                        className="absolute -bottom-2 left-0 h-3 w-full text-accent"
                      />
                    </span>
                  </h2>
                  <p className="mt-3 measure text-fg-muted">{p.tagline}</p>
                </div>
                <span className="self-start text-label text-fg-subtle sm:pt-1">{p.period}</span>
              </Link>
            </motion.div>
          </li>
        ))}
      </ol>

      <AnimatePresence>
        {fine && active && (
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
