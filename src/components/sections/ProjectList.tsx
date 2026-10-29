import { getContent } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProjectRows } from "@/components/trait/ProjectRows";

/**
 * Section « Projets sélectionnés ». Les données sont lues ici (composant
 * serveur) ; l'affichage interactif est dans ProjectRows (composant client).
 */
export function ProjectList() {
  const { featured, site } = getContent();
  const rows = featured.map(({ slug, index, client, sector, title, tagline, period }) => ({
    slug,
    index,
    client,
    sector,
    title,
    tagline,
    period,
  }));
  return (
    <section id="projets" className="container-site section-y">
      <Eyebrow>{site.ui.selectedWork}</Eyebrow>
      <ProjectRows rows={rows} cursorLabel={site.ui.seeProject} ctaLabel={site.ui.readCase} />
    </section>
  );
}
