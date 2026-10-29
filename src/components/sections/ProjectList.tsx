import { getContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProjectRows } from "@/components/trait/ProjectRows";
import { fr } from "@/lib/typo";

/**
 * Section « Projets sélectionnés ». Les données sont lues ici (composant
 * serveur) ; l'affichage interactif (filtres + liste) est dans ProjectRows.
 * Liens à envoyer aux recruteurs : /?focus=<slug>#projets (voir CLAUDE.md §11).
 */
export function ProjectList() {
  const { featured, site } = getContent();
  const rows = featured.map(({ slug, index, client, sector, title, tagline, period, skills, sectors }) => ({
    slug,
    index,
    client,
    sector,
    title: fr(title),
    tagline: fr(tagline),
    period,
    categories: [...skills, ...sectors],
  }));
  const f = site.filters;
  const filters = {
    groupLabel: f.groupLabel,
    showAll: f.showAll,
    countOne: f.countOne,
    countMany: f.countMany,
    groups: [
      { label: f.skillsLabel, options: Object.entries(f.skills).map(([slug, label]) => ({ slug, label })) },
      { label: f.sectorsLabel, options: Object.entries(f.sectors).map(([slug, label]) => ({ slug, label })) },
    ],
  };
  return (
    <section id="projets" className="container-site section-y">
      <Eyebrow as="h2">{site.ui.selectedWork}</Eyebrow>
      <ProjectRows
        rows={rows}
        cursorLabel={site.ui.seeProject}
        ctaLabel={site.ui.readCase}
        filters={filters}
      />
    </section>
  );
}
