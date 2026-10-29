"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { usePointerFine } from "@/lib/usePointerFine";
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
 *  - Un clic le redessine.
 */
export function PortraitSticker({ alt, className }: { alt: string; className?: string }) {
  const fine = usePointerFine();
  const [replay, setReplay] = useState(0);

  return (
    <div className={`relative aspect-[1871/1946] ${className ?? ""}`}>
      <motion.div
        className={`absolute inset-0 ${fine ? "cursor-grab active:cursor-grabbing" : ""}`}
        whileHover={{ y: -4 }}
        // Tactile : le dessin s'enfonce sous le doigt, puis se redessine
        whileTap={{ scale: 0.97 }}
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
