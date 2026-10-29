"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { usePointerFine } from "@/lib/usePointerFine";
import { Scribble } from "./Scribble";
import { PortraitDrawing } from "./PortraitDrawing";

/**
 * Portrait dessiné de Louise, version hero : ENCRE + PASSAGE TERRACOTTA décalé,
 *    comme une risographie mal calée (exprès).
 *  - Thème clair : pas d'arche, le dessin est posé à même la page pour se
 *    mêler au texte plutôt que d'être « collé » à côté.
 *  - Thème sombre : le dessin reste à l'encre, sur une arche craie
 *    (--portrait-sheet), comme une feuille posée sur un bureau sombre.
 *  - Le dessin se trace tout seul, puis le passage terracotta glisse de sous
 *    l'encre ; il bouge ensuite avec la souris (PortraitDrawing `wash`).
 *  - À la souris, on peut le TIRER : il s'étire comme un élastique et
 *    revient à sa place avec un ressort quand on le lâche.
 *  - Une note manuscrite (« c'est moi ! ») et sa flèche se dessinent à l'arrivée.
 *  - Un clic le redessine.
 */
export function PortraitSticker({ alt, note, className }: { alt: string; note: string; className?: string }) {
  const fine = usePointerFine();
  const [replay, setReplay] = useState(0);

  return (
    <div className={`relative aspect-[1871/1946] ${className ?? ""}`}>
      {/* Note manuscrite + flèche */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-2 z-20 flex rotate-6 flex-col items-end xl:-top-6 xl:-right-10"
      >
        <motion.span
          className="font-hand text-2xl leading-none font-semibold text-accent lg:text-3xl"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {note}
        </motion.span>
        <Scribble
          variant="arrow"
          delay={0.9}
          className="mt-1 h-14 w-16 -scale-x-100 text-accent"
        />
      </div>

      <motion.div
        className={`absolute inset-0 ${fine ? "cursor-grab active:cursor-grabbing" : ""}`}
        whileHover={{ y: -4 }}
        whileDrag={{ rotate: 3, scale: 1.03 }}
        drag={fine}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.35}
        dragTransition={{ bounceStiffness: 260, bounceDamping: 10 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        // Un clic (sans glisser) redessine le portrait
        onTap={() => setReplay((n) => n + 1)}
      >
        {/* Arche « feuille de papier » : invisible en thème clair, craie en thème sombre */}
        <div className="absolute inset-x-0 top-[8%] bottom-0 rounded-t-full rounded-b-[18px] bg-[var(--portrait-sheet)]" />
        <PortraitDrawing alt={alt} replayKey={replay} wash />
      </motion.div>
    </div>
  );
}
