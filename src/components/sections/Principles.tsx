import { getContent } from "@/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * « Comment je travaille ».
 *  - Grand écran : l'en-tête reste collé à gauche (sticky) pendant qu'on lit
 *    les principes à droite ; la colonne de gauche n'est jamais vide.
 *  - Les principes forment une liste numérotée séparée par des filets,
 *    plutôt que des cartes : plus éditorial, plus lisible d'un coup d'œil.
 */
export function Principles() {
  const { about, site } = getContent();
  return (
    <section className="container-site section-y">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <SectionHeader
          eyebrow={site.ui.howIWork}
          title={site.ui.howIWorkTitle}
          intro={site.ui.howIWorkIntro}
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <ol className="border-t border-border">
          {about.principles.map((pr, i) => (
            <li
              key={pr.title}
              className="reveal grid gap-2 border-b border-border py-8 sm:grid-cols-[4rem_1fr] sm:gap-6"
            >
              <span className="text-h3 font-semibold text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h3 font-semibold">{pr.title}</h3>
                <p className="mt-2 measure text-fg-muted">{pr.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
