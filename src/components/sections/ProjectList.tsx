import { getContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProjectRows } from "@/components/trait/ProjectRows";
import { fr } from "@/lib/typo";

/**
 * Section « Projets sélectionnés ». Les données sont lues ici (composant
 * serveur) ; l'affichage interactif (liste + sélection reçue par lien) est dans ProjectRows.
 * Liens à envoyer aux recruteurs : /?focus=<slug>#projets (voir CLAUDE.md §11).
 */
export function ProjectList() {
  const { featured, site } = getContent();
  const f = site.filters;
  const rows = featured.map(({ slug, index, client, sector, title, tagline, period, skills, sectors }) => ({
    slug,
    index,
    client,
    sector,
    title: fr(title),
    tagline: fr(tagline),
    period,
    categories: [...skills, ...sectors],
    skillLabels: skills.map((s) => f.skills[s]),
  }));
  const selection = {
    labels: { ...f.skills, ...f.sectors } as Record<string, string>,
    intro: f.selectionIntro,
    countOne: f.countOne,
    countMany: f.countMany,
    showAll: f.showAll,
  };
  return (
    <section id="projets" className="container-site section-y">
      <Eyebrow as="h2">{site.ui.selectedWork}</Eyebrow>
      <ProjectRows
        rows={rows}
        cursorLabel={site.ui.seeProject}
        ctaLabel={site.ui.readCase}
        selection={selection}
      />
    </section>
  );
}
