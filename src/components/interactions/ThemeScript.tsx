/**
 * Script inline exécuté AVANT le premier rendu : applique le thème mémorisé
 * (clair / sombre) sans flash. Voir node_modules/next/dist/docs/01-app/02-guides/
 * preventing-flash-before-hydration.md. `type` change côté client pour éviter
 * l'avertissement React sur les <script> ; suppressHydrationWarning gère l'écart.
 */
const code = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
