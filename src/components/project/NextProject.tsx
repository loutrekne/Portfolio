"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Scribble } from "@/components/trait/Scribble";

/** Lien vers le projet suivant : au survol, le titre se souligne au feutre et la flèche avance. */
export function NextProject({ href, index, title, label }: { href: string; index: string; title: string; label: string }) {
  return (
    <nav aria-label={label}>
      <motion.div initial="rest" animate="rest" whileHover="hover">
        <Link href={href} className="group block rounded-lg bg-surface p-8 sm:p-12">
          <Eyebrow index={index}>{label}</Eyebrow>
          <span className="mt-4 flex items-baseline justify-between gap-6 text-h2 font-semibold">
            <span className="relative inline-block text-balance">
              {title}
              <Scribble variant="underline" mode="parent" className="absolute -bottom-2 left-0 h-3 w-full text-accent" />
            </span>
            <span aria-hidden className="transition-transform duration-500 ease-spring group-hover:translate-x-2">
              →
            </span>
          </span>
        </Link>
      </motion.div>
    </nav>
  );
}
