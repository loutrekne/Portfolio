import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

/**
 * En-tête de section : petit label + vrai titre + phrase d'intro.
 * Donne à chaque section le même squelette (et une hiérarchie lisible :
 * on sait de quoi parle la section avant d'en lire le contenu).
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[36rem]", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-h2 font-semibold text-balance">{title}</h2>
      {intro && <p className="mt-4 text-lead text-fg-muted">{intro}</p>}
    </div>
  );
}
