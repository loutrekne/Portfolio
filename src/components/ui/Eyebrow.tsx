import { cn } from "@/lib/cn";

/**
 * Petit label au-dessus d'un titre, en casse normale (plus humain que des
 * capitales espacées). L'index optionnel prend la couleur d'accent.
 * Ex. <Eyebrow index="01">Ingeli · IoT industriel</Eyebrow>
 */
export function Eyebrow({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <p className={cn("text-label font-medium text-fg-muted", className)}>
      {index && <span className="mr-2 text-accent tabular-nums">{index}</span>}
      {children}
    </p>
  );
}
