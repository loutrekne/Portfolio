import Link from "next/link";
import { cn } from "@/lib/cn";
import { DrawnUnderline } from "@/components/trait/DrawnUnderline";
import { getContent } from "@/content";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-btn text-btn-fg",
  secondary: "border border-border-strong text-fg hover:border-fg",
  ghost: "text-fg",
};

/**
 * Lien en forme de bouton (pilule). Micro-interaction `btn-spring` :
 * se soulève au survol, s'enfonce au clic, la flèche glisse vers l'avant.
 * Les liens externes / mailto / PDF utilisent <a>.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** Ajoute une flèche → animée. */
  arrow?: boolean;
  className?: string;
}) {
  const classes = cn(
    "btn-spring inline-flex items-center gap-2 rounded-pill px-6 py-3.5 font-medium",
    styles[variant],
    className,
  );
  const content = (
    <>
      {variant === "ghost" ? <DrawnUnderline>{children}</DrawnUnderline> : children}
      {arrow && (
        <span aria-hidden className="arrow">
          →
        </span>
      )}
    </>
  );
  const isPdf = href.endsWith(".pdf");
  const isInternal = href.startsWith("/") && !isPdf;
  const opensNewTab = isPdf || href.startsWith("http");
  const { ui } = getContent().site;
  return isInternal ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <a href={href} className={classes} {...(opensNewTab && { target: "_blank", rel: "noopener noreferrer" })}>
      {content}
      {/* Annonce le changement de contexte aux lecteurs d'écran */}
      {opensNewTab && <span className="sr-only"> ({isPdf ? ui.pdfNewTab : ui.newTab})</span>}
    </a>
  );
}
