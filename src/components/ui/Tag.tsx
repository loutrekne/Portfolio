/** Tag discret, en pilule (secteur, compétence, outil). */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-pill bg-surface-muted px-3 py-1 text-label text-fg-muted">
      {children}
    </span>
  );
}
