/**
 * Soulignement au feutre qui se dessine au survol de son lien parent.
 * 100 % CSS (voir globals.css > .drawn-ul) : utilisable dans n'importe quel
 * composant serveur. Le parent doit être un <a>, un <button> ou un `.group`
 * en position relative (ou laisser le span `relative` ci-dessous faire le travail).
 */
export function DrawnUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none" className="drawn-ul">
        <path pathLength={1} d="M2 6 C 20 2, 40 9, 60 5 S 90 3, 98 6" />
      </svg>
    </span>
  );
}
