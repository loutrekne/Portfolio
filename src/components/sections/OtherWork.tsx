import { getContent } from "@/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { fr } from "@/lib/typo";

/**
 * « Aussi chez Ingeli » : projets secondaires (featured: false), sans page dédiée.
 * Chaque carte suit le même squelette :
 *   client · secteur ............ période
 *   titre
 *   résumé
 *   chiffre clé (s'il existe)
 *   tags
 * Les cartes se détachent par leur fond (pas de bordure), comme dans le design system.
 * Elles ne sont PAS cliquables (pas de page dédiée) : donc aucun effet de survol ni
 * d'appui, pour ne pas promettre une action qui n'existe pas.
 */
export function OtherWork() {
  const { others, site } = getContent();
  if (others.length === 0) return null;
  return (
    <section className="container-site section-y">
      <SectionHeader eyebrow={site.ui.otherWork} title={site.ui.otherWorkTitle} intro={site.ui.otherWorkIntro} />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {others.map((p) => {
          const outcome = p.outcomes[0];
          return (
            <li key={p.slug} className="reveal flex flex-col rounded-md bg-surface p-7 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-label">
                <span className="text-fg-muted">
                  {p.client} · {p.sector}
                </span>
                <span className="text-fg-subtle">{p.period}</span>
              </div>
              <h3 className="mt-4 text-h3 font-semibold">{p.title}</h3>
              <p className="mt-3 text-fg-muted">{fr(p.summary)}</p>
              {outcome && (
                <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-h2 font-semibold whitespace-nowrap text-accent tabular-nums">{outcome.value}</span>
                  <span className="text-small text-fg-muted">{fr(outcome.label)}</span>
                </p>
              )}
              {p.tags.length > 0 && (
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {p.tags.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
