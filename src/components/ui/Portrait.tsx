import { cn } from "@/lib/cn";

/**
 * Portrait dessiné de Louise (public/images/portrait.svg).
 *
 * Le dessin sert de MASQUE CSS : sa couleur vient des tokens, pas du fichier.
 * Toujours à l'encre : sur arche terracotta claire en thème clair, sur arche
 * craie en thème sombre (tokens --portrait-ink / --portrait-bg).
 * Micro-interaction : au survol, le portrait s'incline légèrement avec un ressort.
 */
export function Portrait({ alt, className }: { alt: string; className?: string }) {
  return (
    <div className={cn("group relative aspect-[1871/1946]", className)}>
      {/* Arche de fond */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[12%] bottom-0 rounded-t-full bg-portrait-bg transition-transform duration-500 ease-spring group-hover:scale-[1.03]"
      />
      {/* Dessin */}
      <div
        role="img"
        aria-label={alt}
        className="relative size-full bg-portrait-ink [mask-image:url(/images/portrait.svg)] [mask-size:contain] [mask-position:bottom_center] [mask-repeat:no-repeat] transition-transform duration-500 ease-spring group-hover:-rotate-2"
      />
    </div>
  );
}
