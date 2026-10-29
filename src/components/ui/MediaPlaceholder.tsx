import { cn } from "@/lib/cn";

/**
 * Emplacement de visuel tant que les exports ne sont pas prêts
 * (projets au statut "visuals-pending"). Sobre, assumé, jamais "lorem".
 */
export function MediaPlaceholder({
  label,
  ratio = "aspect-[16/10]",
  className,
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid place-items-center rounded-lg bg-surface-muted", ratio, className)}>
      <span className="text-label text-fg-subtle">{label}</span>
    </div>
  );
}
