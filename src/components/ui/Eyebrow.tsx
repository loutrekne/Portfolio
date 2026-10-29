import { cn } from "@/lib/cn";

/**
 * Petit label au-dessus d'un titre, en casse normale (plus humain que des
 * capitales espacées). L'index optionnel prend la couleur d'accent.
 * Ex. <Eyebrow index="01">Ingeli · IoT industriel</Eyebrow>
 * `as="h2"` quand le label NOMME une section (Parcours, Formation…) : même
 * apparence, mais il entre dans le plan de titres des lecteurs d'écran.
 */
export function Eyebrow({
  children,
  index,
  as: Tag = "p",
  className,
}: {
  children: React.ReactNode;
  index?: string;
  as?: "p" | "h2";
  className?: string;
}) {
  return (
    <Tag className={cn("text-label font-medium text-fg-muted", className)}>
      {index && (
        <>
          <span className="mr-1 text-accent tabular-nums">{index}</span>{" "}
        </>
      )}
      {children}
    </Tag>
  );
}
